import { createSlice, combineReducers, createAsyncThunk } from '@reduxjs/toolkit'
import { fetch } from 'whatwg-fetch'
import URI from 'urijs'
import { checkStatus, parseJSON } from '../utils'

// SEARCH LOCATION
export const createSearchLocation = (id) => {
  const asyncThunk = createAsyncThunk(
    `location/${id}/fetchByParams`,
    async ({ term = 'fra' }, thunkAPI) => {
      const { tokens: { /* accuWeatherToken, */ tequilaKiwiToken } } = thunkAPI.getState()
      const EN_LOCALE = 'en-US'
      const AIRPORT_LOCATION_TYPE = 'airport'
      const SMALL_LIMIT = 5
      const ACTIVE_STATUS = true

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
  })
})
