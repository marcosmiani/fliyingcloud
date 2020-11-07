import { createSlice, combineReducers, createAsyncThunk } from '@reduxjs/toolkit'
import { fetch } from 'whatwg-fetch'
import moment from 'moment'
import set from 'lodash/set'
import URI from 'urijs'
import { checkStatus, parseJSON } from '../utils'

// SEARCH
export const createSearchFlights = ({ from = 'FRA', to = 'LON', adults = 1, children = 0 }) => {
  const DAYS_TO_STAY = 5
  const STEPOVERS = 1
  const SECTOR_STEPOVERS = 0
  const PRICE_SORT = 'price'
  const BUSINESS_CABINS = 'C'
  const ECONOMY_CABINS = 'M'
  const ROUND_FLIGHT_TYPE = 'round'
  const AIRCRAFT_VEHICLE = 'aircraft'
  const SAME_CONN_ON_DIFF_AIRPORT = 0
  const SAME_RET_FROM_DIFF_AIRPORT = 0
  const currentDate = moment().format('DD/MM/YYYY')
  const returnDate = moment().add(DAYS_TO_STAY, 'd').format('DD/MM/YYYY')

  const asyncThunk = createAsyncThunk(
    `flight/${to}/fetchByParams`,
    async (_, thunkAPI) => {
      const { tokens: { /* accuWeatherToken, */ tequilaKiwiToken } } = thunkAPI.getState()

      return fetch(
        URI('https://tequila-api.kiwi.com/v2/search')
          .search({
            fly_from: from,
            fly_to: to,
            date_from: currentDate,
            date_to: returnDate,
            return_from: returnDate,
            return_to: returnDate,
            adults,
            children,
            flight_type: ROUND_FLIGHT_TYPE,
            // partner_market: 'nl', // should be smart on the future
            // curr: EUR_CURRENCY,
            nights_in_dst_from: DAYS_TO_STAY - 1, // Maximum stay on the destination
            nights_in_dst_to: DAYS_TO_STAY - 1, // Maximum stay on the destination
            max_stopovers: STEPOVERS, // Reduce the number of steps until destination
            max_sector_stopovers: SECTOR_STEPOVERS,
            vehicle_type: AIRCRAFT_VEHICLE,
            selected_cabins: BUSINESS_CABINS, // Reasonable cheapest/confortable balance
            mix_with_cabins: ECONOMY_CABINS,
            conn_on_diff_airport: SAME_CONN_ON_DIFF_AIRPORT, // Return and depart from/to the same airports
            ret_from_diff_airport: SAME_RET_FROM_DIFF_AIRPORT,
            sort: PRICE_SORT
          }),
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
            apikey: tequilaKiwiToken
          }
        }
      )
        .then(checkStatus)
        .then(parseJSON)
    }
  )

  return {
    asyncThunk,
    slice: createSlice({
      name: `${to}_flights`,
      initialState: { items: [], loading: false, error: null },
      reducers: {
        // standard reducer logic, with auto-generated action types per reducer
      },
      extraReducers: {
      // Add reducers for additional action types here, and handle loading state as needed
        [asyncThunk.rejected]: (state, action) => {
        // Add user to the state array
          state.loading = false
          state.error = `${action.payload}`
        },
        [asyncThunk.pending]: (state, action) => {
        // Add user to the state array
          state.loading = true
          state.error = null
        },
        [asyncThunk.fulfilled]: (state, action) => {
          state.loading = false
          state.error = null
          // Add payload to the state array
          state.items = action.payload.data
        }
      }
    })
  }
}

const list = createSlice({
  name: 'locationsList',
  initialState: [],
  reducers: {
    set: (state, { payload }) => payload
  }
})

export const searchLocationsFlights = (params) => (dispatch, getState, reducerManager) => {
  const { origin, destinations, adults, children } = params
  const [originCode] = origin.value.split('/')
  const searchReducers = {}
  const locations = []

  const searchers = destinations.map(destination => {
    const [code, location] = destination.value.split('/')
    console.info(code, location)
    const searchFlight = createSearchFlights({
      from: originCode,
      to: code,
      adults,
      children
    })

    // use location to create a weather forecast query
    locations.push(code)

    set(searchReducers, code, combineReducers({
      // add weather here when the reducer is ready!
      flights: searchFlight.slice.reducer,
      name: () => destination.label.join('')
    }))

    return {
      flight: searchFlight
      // add search weather forecast
    }
  })

  // Set locations
  dispatch(list.actions.set(locations))

  reducerManager.add('data', combineReducers(searchReducers))

  searchers.forEach(searcher => {
    dispatch(searcher.flight.asyncThunk())
    // Dispatch weather too!
  })
}

export default list.reducer
