import * as React from "react";
import { navigate } from "gatsby";

import { render, cleanup, screen } from "@TestUtils";
import { BlogCard } from "@Variants";
import { FlattenedBlogPost } from "@Types/posts";

describe("BlogCard component", () => {
  jest.mock("gatsby");

  const testPosts: FlattenedBlogPost[] = [
    {
      title: "blog post A",
      slug: "blog-post-a",
      content: "blog post A content",
      excerpt: "blog post A excerpt",
      published: {
        month: 9,
        year: 2019,
        full: "September",
        short: "SEP",
        date: new Date("2019/09/15"),
      },
      categories: null,
      tags: null,
      meta: "2019 sep 9 september blogpostaslug blog post a",
    },
    {
      title: "blog post B",
      slug: "blog-post-b",
      content: "blog post B content",
      excerpt: "blog post B excerpt",
      published: {
        month: 10,
        year: 2019,
        full: "October",
        short: "OCT",
        date: new Date("2019/10/15"),
      },
      categories: ["cat A", "cat B"],
      tags: ["tag A", "tag B"],
      meta: "tag b tag a cat b cat a 2019 oct 10 october blog post content b blogpostbslug blog post b",
    },
  ];

  beforeEach((navigate as any).mockClear);

  afterEach(cleanup);

  it("should render correctly", () => {
    expect(() => render(<BlogCard item={testPosts[0]} />)).not.toThrow();
    cleanup();
    expect(() => render(<BlogCard item={testPosts[1]} />)).not.toThrow();
  });

  it("should render a title with a link to the blog post", async () => {
    render(<BlogCard item={testPosts[0]} />);
    const titleOne = await screen.findByText("blog post A");
    expect(titleOne.getAttribute("href")).toEqual("/post/blog-post-a");
    expect(titleOne.parentElement?.tagName).toEqual("H4");

    cleanup();

    render(<BlogCard item={testPosts[1]} />);
    const titleTwo = await screen.findByText("blog post B");
    expect(titleTwo.getAttribute("href")).toEqual("/post/blog-post-b");
    expect(titleTwo.parentElement?.tagName).toEqual("H4");
  });

  it("should render a div with the excerpt, either 100 or 300 words long depending on if there are tags and/or categories or not", async () => {
    render(<BlogCard item={testPosts[0]} />);
    const titleOne = await screen.findByText("blog post A");
    const contentOne = titleOne.parentElement?.nextElementSibling!;
    expect(contentOne.textContent).toEqual("blog post A excerpt");

    cleanup();

    render(<BlogCard item={testPosts[1]} />);
    const titleTwo = await screen.findByText("blog post B");
    const contentTwo = titleTwo.parentElement?.nextElementSibling!;
    expect(contentTwo.textContent).toEqual("blog post B excerpt");
  });

  describe("tags or categories", () => {
    it("should render two children of the card's descendant row if there are tags and/or categories", async () => {
      render(<BlogCard item={testPosts[1]} />);
      const article = await screen.getByRole("article");
      expect(article.firstElementChild!.children.length).toEqual(2);
    });

    it("should render a list of categories with links to sort by them", async () => {
      render(<BlogCard item={testPosts[1]} />);
      const title = await screen.getByText("Categories");
      const categories = title.nextElementSibling!.children;
      expect(categories.length).toEqual(2);

      expect(categories[0].textContent).toEqual("cat A");
      expect(categories[0].getAttribute("href")).toEqual("/blog/cat-a");

      expect(categories[1].textContent).toEqual("cat B");
      expect(categories[1].getAttribute("href")).toEqual("/blog/cat-b");
    });

    it("should render a list of tags", async () => {
      render(<BlogCard item={testPosts[1]} />);
      const title = await screen.getByText("Tags");
      const tags = title.nextElementSibling!;

      expect(tags.textContent).toEqual("tag A, tag B");
    });

    it("should render only one child of the card's descendant row if there are no tags or categories", async () => {
      render(<BlogCard item={testPosts[0]} />);
      const article = await screen.getByRole("article");
      expect(article.firstElementChild!.children.length).toEqual(1);
    });
  });
});
