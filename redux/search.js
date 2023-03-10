import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    name: '' ,
    showSearch: false
  },
  reducers: {
    changeText: (state, action) => {
      state.name = action.payload
    },
    toggleChange: (state) => {
      state.showSearch = !state.showSearch
    },
  },
})

export const { changeText, toggleChange } = searchSlice.actions;
export default searchSlice.reducer;

// export const showSearchSlice = createSlice({
//     name: 'showSearch',
//     initialState: {
//       showSearch: false 
//     },
//     reducers: {
//       toggleChange: (state) => {
//         state.showSearch = !state.showSearch
//       },
//     },
//   })

// export const { toggleChange } = showSearchSlice.actions;
