import { createSlice, combineReducers } from '@reduxjs/toolkit'

export const searchFlights = createSlice({
  name: 'searchFlights',
  initialState: false,
  reducers: {
    close: () => false,
    open: () => true
  }
})

export default combineReducers({
  searchFlights: searchFlights.reducer
})
