import { configureStore } from '@reduxjs/toolkit'
import * as Redux from 'redux'

import dragReducer from './drag/drag.slice'
import themeReducer from './theme/theme.slice'
import sidebarReducer from './sidebar/sidebar.slice'

const otherMiddleware: Redux.Middleware[] = []

if (process.env.NODE_ENV === 'development') {
  // otherMiddleware.push(logger)
}

const store = configureStore({
  reducer: {
    theme: themeReducer,
    drag: dragReducer,
    sidebar: sidebarReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(...otherMiddleware),
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
