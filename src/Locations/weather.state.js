import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetch } from 'whatwg-fetch'
import URI from 'urijs'
import { checkStatus, parseJSON } from '../utils'

export const createSearchWeather = ({ code, location }) => {
  const LANGUAGE_EN = 'en-us'

  const asyncThunk = createAsyncThunk(
    `weather/${code}/fetchByParams`,
    async (_, thunkAPI) => {
      const { tokens: { accuWeatherToken } } = thunkAPI.getState()

      return fetch( // Get city code
        URI('http://dataservice.accuweather.com/locations/v1/cities/geoposition/search')
          .search({
            apikey: accuWeatherToken,
            q: location,
            language: LANGUAGE_EN,
            details: false,
            toplevel: true
          }),
        {
          method: 'GET',
          headers: {
            accept: 'application/json'
          }
        }
      )
        .then(checkStatus)
        .then(parseJSON)
        .then(data => {
          return fetch( // Get forecast
            URI(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${data.Key}`)
              .search({
                apikey: accuWeatherToken,
                language: LANGUAGE_EN,
                details: false,
                metric: true
              }),
            {
              method: 'GET',
              headers: {
                accept: 'application/json'
              }
            }
          )
            .then(checkStatus)
            .then(parseJSON)
        })
    }
  )

  return {
    asyncThunk,
    slice: createSlice({
      name: `${code}_weather_city`,
      initialState: { data: null, loading: false, error: null },
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
          state.data = action.payload.Headline
        }
      }
    })
  }
}
