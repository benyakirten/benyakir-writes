import * as React from "react";

import { render, screen, cleanup } from "@TestUtils";
import { IconGrid } from "@Gen";
import { allIcons } from "@TestProps";

describe("IconGrid component", () => {
  afterEach(cleanup);

  it("should render properly", () => {
    expect(() => render(<IconGrid icons={allIcons} />)).not.toThrow();
  });

  it("should render an icon for every item in the icons array", async () => {
    render(<IconGrid icons={allIcons} />);
    const icons = await screen.findAllByRole("img");
    expect(icons.length).toEqual(allIcons.length + 1);
  });
});
