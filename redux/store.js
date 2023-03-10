import { configureStore } from '@reduxjs/toolkit'
// import { searchSlice } from './search'
// import { showSearchSlice } from './search'

import searchReducer from './search'
import routeIdReducer from './routeId'
// import showSearchReducer from './showSearch'

export const store = configureStore({
  reducer: {
    search: searchReducer,
    routeId: routeIdReducer
    // search: searchSlice.reducer,
    // showSearch: showSearchReducer
    // showSearch: showSearchSlice.reducer
  },
})