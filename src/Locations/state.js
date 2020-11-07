import { createSlice, combineReducers } from '@reduxjs/toolkit'
import set from 'lodash/set'
import { createSearchFlights } from './flights.state'
import { createSearchWeather } from './weather.state'

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
    const searchWeather = createSearchWeather({
      code,
      location
    })

    // use location to create a weather forecast query
    locations.push(code)

    set(searchReducers, code, combineReducers({
      // add weather here when the reducer is ready!
      flights: searchFlight.slice.reducer,
      weather: searchWeather.slice.reducer,
      name: () => destination.label.join('')
    }))

    return {
      flight: searchFlight,
      weather: searchWeather
      // add search weather forecast
    }
  })

  // Set locations
  dispatch(list.actions.set(locations))

  reducerManager.add('data', combineReducers(searchReducers))

  searchers.forEach(searcher => {
    dispatch(searcher.flight.asyncThunk())
    dispatch(searcher.weather.asyncThunk())
    // Dispatch weather too!
  })
}

export default list.reducer
