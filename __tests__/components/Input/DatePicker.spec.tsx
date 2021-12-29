import * as React from "react";
import "jest-styled-components";

import { render, cleanup, screen, fireEvent } from "@TestUtils";
import { DatePicker } from "@Input";

describe("DatePicker component", () => {
  const changeSpy = jest.fn();

  const props = {
    value: new Date("09/15/2019"),
    label: "test date",
    onChange: changeSpy,
    name: "test-name",
  };

  beforeEach(changeSpy.mockClear);

  afterEach(cleanup);

  it("should render correctly", () => {
    expect(() => render(<DatePicker {...props} />)).not.toThrow();
  });

  it("should set the date picker value based on the value passed in", async () => {
    render(<DatePicker {...props} />);
    const input = (await screen.findByText("test date"))
      .nextElementSibling! as HTMLInputElement;
    expect(input.value).toBe("2019-09-15");
  });

  it("should evoke the onChange function with a new date from a value set", async () => {
    render(<DatePicker {...props} />);
    const input = (await screen.findByText("test date"))
      .nextElementSibling! as HTMLInputElement;

    fireEvent.change(input, { target: { value: "2019-10-15" } });
    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(changeSpy).toHaveBeenCalledWith(new Date("2019/10/15"));
  });
});
