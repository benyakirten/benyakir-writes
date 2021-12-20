import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { DraggedOverPosition } from '@Utils/enums'
import { initialState } from './drag.state'

const dragSlice = createSlice({
  name: 'drag',
  initialState,
  reducers: {
    setDraggedIndex: (state, action: PayloadAction<number>) => {
      state.draggedIndex = action.payload
    },
    resetDraggedIndex: (state) => {
      state.draggedIndex = -1
    },
  }
})

export const {
  setDraggedIndex,
  resetDraggedIndex
} = dragSlice.actions

export default dragSlice.reducer