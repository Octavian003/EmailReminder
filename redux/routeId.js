import { createSlice } from '@reduxjs/toolkit'

export const routeIdSlice = createSlice({
  name: 'routeId',
  initialState: {
    userId: '',
    templateId: '',
    message: ''
  },
  reducers: {
    updateUserId: (state, action) => {
        state.userId = action.payload
    },
    updateTemplateId: (state, action) => {
        state.templateId = action.payload
    },
    updateMessage: (state, action) => {
        state.message = action.payload
    },
  },
})

export const { updateUserId, updateTemplateId, updateMessage } = routeIdSlice.actions;

export default routeIdSlice.reducer;