import * as React from "react";

import { render, cleanup } from "@TestUtils";
import { Loading } from "@Gen";

describe("Loading component", () => {
  afterEach(cleanup);

  it("should render correctly", () => {
    expect(() => render(<Loading />)).not.toThrow();
  });
});
