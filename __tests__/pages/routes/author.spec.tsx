import * as React from "react";

import { cleanup, render, screen, act, fireEvent } from "@TestUtils";
import AuthorPage from "@/pages/author";

describe("blog page", () => {
  jest.mock("gatsby");

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    cleanup();
  });

  it("should render correctly", () => {
    expect(() => render(<AuthorPage />));
  });

  it("should render a main heading", async () => {
    render(<AuthorPage />);
    const titles = await screen.getAllByText("Author");
    expect(titles[1]).toBeTruthy();
    expect(titles[1].tagName).toEqual("H1");
  });

  it("should render a story card for every short story", async () => {
    render(<AuthorPage />);
    const cards = await screen.findAllByRole("article");
    expect(cards.length).toEqual(4);
  });

  it("should render only the filtered items if a filter is applied", async () => {
    render(<AuthorPage />);
    const input = await screen.findAllByRole("textbox");

    await act(async () => {
      fireEvent.change(input[0], { target: { value: "The Human Error" } });
      jest.runAllTimers();

      const items = await screen.findAllByRole("article");
      expect(items.length).toEqual(2);
    });

    await act(async () => {
      fireEvent.change(input[0], { target: { value: "September" } });
      jest.runAllTimers();

      const items = await screen.findAllByRole("article");
      expect(items.length).toEqual(1);
    });

    await act(async () => {
      fireEvent.change(input[0], { target: { value: "" } });

      jest.runAllTimers();

      const items = await screen.findAllByRole("article");
      expect(items.length).toEqual(4);
    });

    await act(async () => {
      fireEvent.change(input[0], { target: { value: "aug" } });

      jest.runAllTimers();

      const items = await screen.findAllByRole("article");
      expect(items.length).toEqual(1);
    });
  });
});
