import React from "react";
import { Provider } from "react-redux";
import { cleanup, render } from "@testing-library/react";

import store from "@/store";
import { Layout } from "@Layout";

describe("Layout component", () => {
  jest.mock("@reach/router");

  afterEach(cleanup);

  it("should render correctly", () => {
    expect(() =>
      render(
        <Provider store={store}>
          <Layout />
        </Provider>
      )
    ).not.toThrow();
  });
});
