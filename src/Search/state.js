import { createSlice, combineReducers, createAsyncThunk } from '@reduxjs/toolkit'
import { fetch } from 'whatwg-fetch'
import moment from 'moment'
import URI from 'urijs'

// UTILITY FUNCTIONS
function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON (response) {
  return response.json()
}

// ORIGIN
export const origin = createSlice({
  name: 'origin',
  initialState: false,
  reducers: {
    set: (state, { payload }) => payload || state
  }
})

// SEARCH LOCATION
export const createSearchLocation = (id) => {
  const asyncThunk = createAsyncThunk(
    `${id}/location/fetchByParams`,
    async ({ term = 'fra' }, thunkAPI) => {
      const { tokens: { /* accuWeatherToken, */ tequilaKiwiToken } } = thunkAPI.getState()
      const EN_LOCALE = 'en-US'
      const AIRPORT_LOCATION_TYPE = 'airport'
      const SMALL_LIMIT = 5
      const ACTIVE_STATUS = true
      // curl -X GET "https://tequila-api.kiwi.com/locations/query?term=Fran&locale=en-US&location_types=airport&limit=10&active_only=true" -H "accept: application/json" -H "apikey: jJ6sf5YuzyW67WKlXviCPChvdfx9dX5z"
      return fetch(
        URI('https://tequila-api.kiwi.com/locations/query')
          .search({
            term,
            locale: EN_LOCALE,
            location_types: AIRPORT_LOCATION_TYPE,
            limit: SMALL_LIMIT,
            active_only: ACTIVE_STATUS
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
    })

  return {
    asyncThunk,
    slice: createSlice({
      name: `${id}_locations`,
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
          state.items = action.payload.locations
        }
      }
    })
  }
}

// SEARCH
export const searchFlights = createAsyncThunk(
  'flight/fetchByParams',
  async ({ from = 'FRA', to = 'LON', adults = 1, children = 0 }, thunkAPI) => {
    const { tokens: { /* accuWeatherToken, */ tequilaKiwiToken } } = thunkAPI.getState()
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
          partner_market: 'nl', // use origin country
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

const flights = createSlice({
  name: 'flights',
  initialState: { items: [], loading: false, error: null },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [searchFlights.rejected]: (state, action) => {
      // Add user to the state array
      state.loading = false
      state.error = `${action.payload}`
    },
    [searchFlights.pending]: (state, action) => {
      // Add user to the state array
      state.loading = true
      state.error = null
    },
    [searchFlights.fulfilled]: (state, action) => {
      state.loading = false
      state.error = null
      // Add payload to the state array
      state.items = action.payload.data
    }
  }
})

const originLocation = createSearchLocation('origin')
const destinationLocation = createSearchLocation('destination')

export const searchLocation = {
  origins: originLocation.asyncThunk,
  destinations: destinationLocation.asyncThunk
}

export default combineReducers({
  locations: combineReducers({
    origins: originLocation.slice.reducer,
    destinations: destinationLocation.slice.reducer
  }),
  flights: flights.reducer
})