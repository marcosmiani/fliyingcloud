import { configureStore, combineReducers } from '@reduxjs/toolkit'
import unset from 'lodash/unset'
import set from 'lodash/set'
import get from 'lodash/get'
import tokens from './Tokens/state'
import search from './Search/state'
import locations from './Locations/state'

export function createReducerManager (initialReducers) {
  // Create an object which maps keys to reducers
  const reducers = { ...initialReducers }

  // Create the initial combinedReducer
  let combinedReducer = combineReducers(reducers)

  // An array which is used to delete state keys when reducers are removed
  let keysToRemove = []

  return {
    getReducerMap: () => reducers,

    // The root reducer function exposed by this object
    // This will be passed to the store
    reduce: (state, action) => {
      // If any reducers have been removed, clean up their state first
      if (keysToRemove.length > 0) {
        state = { ...state }
        for (const key of keysToRemove) {
          unset(state, key)
        }
        keysToRemove = []
      }

      // Delegate to the combined reducer
      return combinedReducer(state, action)
    },

    // Adds/Replaces a new reducer with the specified key
    add: (key, reducer) => {
      if (!key) {
        return
      }
      // Remove the key from the deleted keys
      keysToRemove = keysToRemove.filter(k => k !== key)

      // Add the reducer to the reducer mapping
      set(reducers, key, reducer)

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers)
    },

    // Removes a reducer with the specified key
    remove: key => {
      if (!key || !get(reducers, key)) {
        return
      }

      // Remove it from the reducer mapping
      unset(reducers, key)

      // Add the key to the list of keys to clean up
      keysToRemove.push(key)

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers)
    }
  }
}

export function createStore () {
  const reducerManager = createReducerManager({ tokens, search, locations })

  // Create a store with the root reducer function being the one exposed by the manager.
  const store = configureStore({
    reducer: reducerManager.reduce,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: reducerManager
        }
      })
  })

  return store
}
