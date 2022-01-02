import * as React from "react";
import "jest-styled-components";

import { render, cleanup, screen, fireEvent, act } from "@TestUtils";
import { Filter } from "@Input";

describe("Filter component", () => {
  const searchSpy = jest.fn();

  const testProps = {
    name: "Something",
    onSearch: searchSpy,
  };

  beforeEach(() => {
    searchSpy.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    cleanup();
  });

  it("should render correctly", () => {
    expect(() => render(<Filter {...testProps} />)).not.toThrow();
  });

  it("should render a subtitle with content related to the name prop", async () => {
    render(<Filter {...testProps} />);
    const title = await screen.getByText("Filter Something");
    expect(title).toBeTruthy();
    expect(title.tagName).toEqual("H2");
  });

  it("should call the onSearchfunction after a small delay when something is entered in the search field", async () => {
    render(<Filter {...testProps} />);
    // Because of the new useDebounce hook, the search is called once on component render
    expect(searchSpy).toHaveBeenCalledTimes(1);

    const input = await screen.getByRole("textbox");
    await act(async () => {
      fireEvent.change(input, { target: { value: "test input" } });
      jest.runAllTimers();
      expect(searchSpy).toHaveBeenCalledTimes(2);
      expect(searchSpy).toHaveBeenCalledWith("test input");
    });
  });
});
