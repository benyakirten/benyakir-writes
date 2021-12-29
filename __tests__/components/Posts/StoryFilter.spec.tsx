import React from "react";

import { cleanup, render, screen, fireEvent, act } from "@TestUtils";
import { StoryFilter } from "@Posts";

import { cover } from "../../props";
import { createLookupMeta } from "@Utils/posts";

import { FlattenedStoryCard } from "@Types/posts";

describe("StoryFilter component", () => {
  const testStories = [
    {
      title: "story A",
      content: "story A content",
      slug: "story-a",
      published: {
        date: new Date("09/15/2020"),
        short: "SEP",
        full: "September",
        month: 9,
        year: 2020,
      },
      book: null,
      meta: createLookupMeta(
        "2020 sep september story A content a story A title"
      ),
    },
    {
      title: "story B",
      content: "story B content",
      slug: "story-b",
      published: {
        date: new Date("10/15/2020"),
        short: "OCT",
        full: "October",
        month: 10,
        year: 2020,
      },
      book: {
        title: "Test book A",
        slug: "book-a",
        content: "book A content",
        relationship: "Preamble",
        cover: null,
      },
      meta: createLookupMeta(
        "test story b test project desc b test project name b 2020 oct october test book content b test book title b"
      ),
    },
    {
      title: "story C",
      content: "story C",
      slug: "story-c",
      published: {
        date: new Date("11/15/2020"),
        short: "NOV",
        full: "November",
        month: 11,
        year: 2020,
      },
      book: {
        title: "Test book B",
        slug: "book-b",
        content: "book B content",
        relationship: "Forestory",
        cover,
      },
      meta: createLookupMeta(
        "test story b test project desc b test project name b 2020 nov november test book content b test book title b"
      ),
    },
  ].sort(
    (a, b) => b.published.date.getTime() - a.published.date.getTime()
  ) as FlattenedStoryCard[];

  const filterSpy = jest.fn();

  const props = {
    stories: testStories,
    onFilter: filterSpy,
  };

  beforeEach(() => {
    jest.useFakeTimers();
    filterSpy.mockClear();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    cleanup();
  });

  it("should render correctly", () => {
    expect(() => render(<StoryFilter {...props} />)).not.toThrow();
  });

  it("should render a text element and one foldout that contain means of filtering the elements", async () => {
    render(<StoryFilter {...props} />);
    const text = await screen.findByRole("textbox");
    expect(text).toBeTruthy();

    const buttons = await screen.findAllByRole("button");
    expect(buttons.length).toEqual(2);

    fireEvent.click(buttons[1]);
    const datePickerOne = (await screen.findByText("Published before"))
      .nextElementSibling! as HTMLInputElement;
    expect(datePickerOne).toBeTruthy();
    expect(datePickerOne.value).toEqual("2020-11-15");
    const datePickerTwo = (await screen.findByText("Published after"))
      .nextElementSibling! as HTMLInputElement;
    expect(datePickerTwo).toBeTruthy();
    expect(datePickerTwo.value).toEqual("2020-09-15");
  });

  it("should filter the elements based on their meta values if the text input has its value changed", async () => {
    render(<StoryFilter {...props} />);
    const text = await screen.findByRole("textbox");

    await act(async () => {
      fireEvent.change(text, { target: { value: "september" } });
      jest.runAllTimers();

      expect(filterSpy).toHaveBeenCalledTimes(2);
      const itemsFiltered = filterSpy.mock.calls[1][0];
      expect(itemsFiltered.length).toEqual(1);
      expect(itemsFiltered[0]).toEqual(testStories[2]);
    });

    await act(async () => {
      fireEvent.change(text, { target: { value: "october" } });
      jest.runAllTimers();

      expect(filterSpy).toHaveBeenCalledTimes(3);
      const itemsFiltered = filterSpy.mock.calls[2][0];
      expect(itemsFiltered.length).toEqual(1);
      expect(itemsFiltered[0]).toEqual(testStories[1]);
    });
  });

  it("should filter the elements based on their date of publication if the date pickers have their values changed", async () => {
    render(<StoryFilter {...props} />);
    const datePickerBefore = (await screen.findByText("Published before"))
      .nextElementSibling! as HTMLInputElement;
    const datePickerAfter = (await screen.findByText("Published after"))
      .nextElementSibling! as HTMLInputElement;

    await act(async () => {
      fireEvent.change(datePickerAfter, {
        target: { value: "2020-09-30" },
      });
      jest.runAllTimers();

      expect(filterSpy).toHaveBeenCalledTimes(2);
      const itemsFiltered = filterSpy.mock.calls[1][0];
      expect(itemsFiltered.length).toEqual(2);
      expect(itemsFiltered[0]).toEqual(testStories[0]);
      expect(itemsFiltered[1]).toEqual(testStories[1]);
    });

    await act(async () => {
      fireEvent.change(datePickerBefore, {
        target: { value: "2020-11-10" },
      });
      jest.runAllTimers();

      expect(filterSpy).toHaveBeenCalledTimes(3);
      const itemsFiltered = filterSpy.mock.calls[2][0];
      expect(itemsFiltered.length).toEqual(1);
      expect(itemsFiltered[0]).toEqual(testStories[1]);
    });
  });

  it("should be able to filter the elements in multiple ways at the same time", async () => {
    render(<StoryFilter {...props} />);
    const text = await screen.findByRole("textbox");
    const datePickerAfter = (await screen.findByText("Published after"))
      .nextElementSibling! as HTMLInputElement;

    await act(async () => {
      fireEvent.change(datePickerAfter, {
        target: { value: "2020-09-30" },
      });
      jest.runAllTimers();

      expect(filterSpy).toHaveBeenCalledTimes(2);
      const itemsFiltered = filterSpy.mock.calls[1][0];
      expect(itemsFiltered.length).toEqual(2);
      expect(itemsFiltered[0]).toEqual(testStories[0]);
      expect(itemsFiltered[1]).toEqual(testStories[1]);
    });

    await act(async () => {
      fireEvent.change(text, { target: { value: "october" } });
      jest.runAllTimers();

      expect(filterSpy).toHaveBeenCalledTimes(3);
      const itemsFiltered = filterSpy.mock.calls[2][0];
      expect(itemsFiltered.length).toEqual(1);
      expect(itemsFiltered[0]).toEqual(testStories[1]);
    });
  });
});
