import { createSlice, combineReducers } from '@reduxjs/toolkit'

export const modal = createSlice({
  name: 'tokenModal',
  initialState: false,
  reducers: {
    close: () => false,
    open: () => true
  }
})

export const accuWeatherToken = createSlice({
  name: 'accuWeatherToken',
  initialState: null,
  reducers: {
    set: (state, { payload }) => payload || state
  }
})

export const tequilaKiwiToken = createSlice({
  name: 'tequilaKiwiToken',
  initialState: null,
  reducers: {
    set: (state, { payload }) => payload || state
  }
})

export default combineReducers({
  modal: modal.reducer,
  accuWeatherToken: accuWeatherToken.reducer,
  tequilaKiwiToken: tequilaKiwiToken.reducer
})
