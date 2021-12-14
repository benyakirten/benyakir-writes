import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";

import themeReducer from "@Store/theme/theme.slice";
import Layout from "@Layout/Layout.component";

// I'm not this sophisticated - https://redux.js.org/usage/writing-tests

function render(
  ui: any,
  {
    preloadedState,
    store = configureStore({ reducer: { theme: themeReducer } }),
    ...renderOptions
  } = {} as any
) {
  const Wrapper: React.FC = ({ children }) => {
    return (
      <Provider store={store}>
        <Layout>{children}</Layout>
      </Provider>
    );
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
