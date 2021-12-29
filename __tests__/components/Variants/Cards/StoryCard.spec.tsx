import * as React from "react";
import { navigate } from "gatsby";

import { render, cleanup, screen, fireEvent } from "@TestUtils";
import { StoryCard } from "@Variants";
import { FlattenedStory } from "@Types/posts";

import { cover } from "@TestProps";

describe("StoryCard component", () => {
  jest.mock("gatsby");

  const propStories: FlattenedStory[] = [
    {
      title: "story A",
      content: `story A content`,
      slug: "story-a",
      published: {
        date: new Date("09/15/2019"),
        short: "SEP",
        full: "September",
        month: 9,
        year: 2019,
      },
      book: null,
      meta: "2019 sep september story A content a story A title",
    },
    {
      title: "story B",
      content: "story B content",
      slug: "story-b",
      published: {
        date: new Date("10/15/2019"),
        short: "OCT",
        full: "October",
        month: 10,
        year: 2019,
      },
      book: {
        title: "book A",
        slug: "book-a",
        content: "book A content",
        relationship: "Preamble",
        cover: null,
      },
      meta: "test story b test project desc b test project name b 2019 oct october test book content b test book title b",
    },
    {
      title: "story C",
      content:
        "story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content",
      slug: "story-c",
      published: {
        date: new Date("11/15/2019"),
        short: "NOV",
        full: "November",
        month: 11,
        year: 2019,
      },
      book: {
        title: "book B",
        slug: "book-b",
        content: "book B content",
        relationship: "Forestory",
        cover,
      },
      meta: "test story b test project desc b test project name b 2019 oct october test book content b test book title b",
    },
  ];

  beforeEach((navigate as any).mockClear);

  afterEach(cleanup);

  it("should render correctly", () => {
    expect(() => render(<StoryCard item={propStories[0]} />)).not.toThrow();
    cleanup();
    expect(() => render(<StoryCard item={propStories[1]} />)).not.toThrow();
    cleanup();
    expect(() => render(<StoryCard item={propStories[2]} />)).not.toThrow();
  });

  it("should render a title that's a link to the story", async () => {
    render(<StoryCard item={propStories[0]} />);
    const titleOne = await screen.getByText("story A");

    expect(titleOne).toBeTruthy();
    expect(titleOne.tagName).toEqual("A");
    expect(titleOne.getAttribute("href")).toEqual("/story/story-a");
    expect(titleOne.parentElement?.tagName).toEqual("H3");

    cleanup();

    render(<StoryCard item={propStories[1]} />);
    const titleTwo = await screen.getByText("story B");

    expect(titleTwo).toBeTruthy();
    expect(titleTwo.tagName).toEqual("A");
    expect(titleTwo.getAttribute("href")).toEqual("/story/story-b");
    expect(titleTwo.parentElement?.tagName).toEqual("H3");

    cleanup();

    render(<StoryCard item={propStories[2]} />);
    const titleThree = await screen.getByText("story C");

    expect(titleThree).toBeTruthy();
    expect(titleThree.tagName).toEqual("A");
    expect(titleThree.getAttribute("href")).toEqual("/story/story-c");
    expect(titleThree.parentElement?.tagName).toEqual("H3");
  });

  it("should render a button that navigates to the story if clicked", async () => {
    render(<StoryCard item={propStories[0]} />);
    const buttonOne = await screen.getByText("Read More");
    fireEvent.click(buttonOne);
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("/story/story-a");

    cleanup();

    render(<StoryCard item={propStories[1]} />);
    const buttonTwo = await screen.getByText("Read More");
    fireEvent.click(buttonTwo);
    expect(navigate).toHaveBeenCalledTimes(2);
    expect(navigate).toHaveBeenCalledWith("/story/story-b");

    cleanup();

    render(<StoryCard item={propStories[2]} />);
    const buttonThree = await screen.getByText("Read More");
    fireEvent.click(buttonThree);
    expect(navigate).toHaveBeenCalledTimes(3);
    expect(navigate).toHaveBeenCalledWith("/story/story-c");
  });

  it("should render a div with a 200 or 500 letters of the book's content into a div whether or not there is a book", async () => {
    render(<StoryCard item={propStories[0]} />);
    const titleOne = await screen.getByText("story A");
    const contentOne = titleOne.parentElement!.nextElementSibling;
    expect(contentOne).toBeTruthy();
    expect(contentOne?.textContent).toEqual("story A content");

    cleanup();

    render(<StoryCard item={propStories[1]} />);
    const titleTwo = await screen.getByText("story B");
    const contentTwo = titleTwo.parentElement!.nextElementSibling;
    expect(contentTwo).toBeTruthy();
    expect(contentTwo?.textContent).toEqual("story B content");
  });

  describe("related book", () => {
    it("should render a div about the related book with an image of the cover if it exists", async () => {
      render(<StoryCard item={propStories[1]} />);
      const title = await screen.getByText("Related Book");
      expect(title).toBeTruthy();
      expect(title.getAttribute("href")).toEqual("/book/book-a");
      expect(title.parentElement!.tagName).toEqual("H4");

      const bookContent = title.parentElement!.nextElementSibling!;

      expect(bookContent).toBeTruthy();
      expect(bookContent.textContent).toEqual("book A content");
    });

    it("should render a div about the related book without an image of the cover it it does not exist", async () => {
      render(<StoryCard item={propStories[2]} />);
      const title = await screen.getByText("Related Book");
      expect(title).toBeTruthy();
      expect(title.getAttribute("href")).toEqual("/book/book-b");
      expect(title.parentElement!.tagName).toEqual("H4");

      const images = await screen.findAllByRole("img");
      const image = images[1];
      expect(image.getAttribute("alt")).toEqual("book B");

      const imageLink =
        image.parentElement?.parentElement?.parentElement?.parentElement!;
      expect(imageLink?.getAttribute("href")).toEqual("/book/book-b");
    });

    it("should not render any of the above information if there is no related book or cover", async () => {
      render(<StoryCard item={propStories[0]} />);
      const images = await screen.findAllByRole("img");
      expect(images.length).toEqual(1);
      expect(images[0].getAttribute("aria-label")).toEqual("Logo");
    });
  });
});
