import * as React from "react";
import "jest-styled-components";

import { cleanup, render, screen, fireEvent } from "@TestUtils";
import { Foldout } from "@Gen";

describe("Foldout component", () => {
  const clickSpy = jest.fn();

  beforeEach(() => {
    clickSpy.mockClear();
  });

  afterEach(cleanup);

  it("should render properly", () => {
    expect(() => render(<Foldout onClick={clickSpy} topbar={<p>Hello</p>} />)).not.toThrow();
  });

  it("should set the down arrow's tabindex according to the open prop", async () => {
    render(<Foldout onClick={clickSpy} topbar={<p>Test Topbar</p>} open={false} />);
    const buttonsOne = await screen.getAllByRole("button");
    const downArrowOne = buttonsOne[1];
    expect(downArrowOne.getAttribute("tabindex")).toEqual("-1");

    cleanup();

    render(<Foldout onClick={clickSpy} topbar={<p>Test Topbar</p>} open={true} />);
    const buttonsTwo = await screen.getAllByRole("button");
    const downArrowTwo = buttonsTwo[1];
    expect(downArrowTwo.getAttribute("tabindex")).toEqual("0");
  });

  it("should adjust the aria-hidden attribute of the foldout body according to the open prop", async () => {
    let topbar, body;

    render(<Foldout onClick={clickSpy} topbar={<p>Test Topbar</p>} open={false} />);
    topbar = await screen.getByText("Test Topbar");
    body = topbar.parentElement?.nextElementSibling as HTMLElement;
    expect(body?.getAttribute("aria-hidden")).toEqual("true");

    cleanup();

    render(<Foldout onClick={clickSpy} topbar={<p>Test Topbar</p>} open={true} />);
    topbar = await screen.getByText("Test Topbar");
    body = topbar.parentElement?.nextElementSibling;
    expect(body?.getAttribute("aria-hidden")).toEqual("false");
  });

  it("should dispatch the onClick event if the foldout or any element within it is clicked unless the item or its parent has an id of no-toggle such as the body and its descendants", async () => {
    render(
      <Foldout topbar={<p>Test Topbar</p>} open={false} onClick={clickSpy}>
        <p>Some stuff</p>
      </Foldout>
    );
    const buttons = await screen.getAllByRole("button");
    fireEvent.click(buttons[1]);
    expect(clickSpy).toHaveBeenCalledTimes(1);

    const topbar = await screen.getByText("Test Topbar");
    fireEvent.click(topbar);
    expect(clickSpy).toHaveBeenCalledTimes(2);

    const body = topbar.parentElement?.nextElementSibling!;
    expect(body.getAttribute("data-navtoggle")).toEqual("no-toggle");
    fireEvent.click(body);
    expect(clickSpy).toHaveBeenCalledTimes(2);

    const stuff = await screen.getByText("Some stuff");
    fireEvent.click(stuff);
    expect(clickSpy).toHaveBeenCalledTimes(2);
  });
});
