import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { initialState } from './drag.state'

const dragSlice = createSlice({
  name: 'drag',
  initialState,
  reducers: {
    setDraggedValue: (state, action: PayloadAction<string>) => {
      state.draggedValue = action.payload
    },
    resetDraggedValue: (state) => {
      state.draggedValue = ''
    },
    setDraggedIndex: (state, action: PayloadAction<number>) => {
      state.draggedIndex = action.payload
    },
    resetDraggedIndex: (state) => {
      state.draggedIndex = -1
    },
  },
})

export const {
  setDraggedValue,
  resetDraggedValue,
  setDraggedIndex,
  resetDraggedIndex,
} = dragSlice.actions

export default dragSlice.reducer
