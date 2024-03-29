import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'

import { Layout } from '@Layout'
import themeReducer from '@Store/theme/theme.slice'
import dragReducer from '@Store/drag/drag.slice'

// I'm not this sophisticated - https://redux.js.org/usage/writing-tests

// This is my addition
export const mockDispatch = jest.fn()

function render(
  ui: any,
  {
    preloadedState,
    store = configureStore({
      reducer: { drag: dragReducer, theme: themeReducer },
    }),
    ...renderOptions
  } = {} as any
) {
  const Wrapper: React.FC = ({ children }) => {
    store.dispatch = mockDispatch
    return (
      <Provider store={store}>
        <Layout>{children}</Layout>
      </Provider>
    )
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }
