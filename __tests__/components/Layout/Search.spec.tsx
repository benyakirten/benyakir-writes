import React from "react";

import {
  cleanup,
  render,
  screen,
  act,
  fireEvent,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import searchData from "../../../__mocks__/searchData.json";

import {Search} from "@Layout";
import store from "@/store";

function getSlug(item: any) {
  return `/${item.type}/${item.slug}`;
}

function capitalize(item: string) {
  return `${item[0].toUpperCase()}${item.slice(1)}`;
}

const Wrapper: React.FC = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={store.getState().theme.active}>
        {children}
      </ThemeProvider>
    </Provider>
  );
};

describe("Search component", () => {
  const clickSpy = jest.fn();

  const props = {
    open: true,
    onClick: clickSpy,
  };

  beforeEach(() => {
    jest.useFakeTimers();
    clickSpy.mockClear();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    cleanup();
  });

  it("should render correctly", () => {
    expect(() =>
      render(
        <Wrapper>
          <Search {...props} />
        </Wrapper>
      )
    ).not.toThrow();
  });

  it("should render an empty textbox and four checked textboxes before a div that shows the results", async () => {
    render(
      <Wrapper>
        <Search {...props} />
      </Wrapper>
    );
    const text = (await screen.getByRole("textbox")) as HTMLInputElement;
    expect(text).toBeTruthy();
    expect(text.value).toEqual("");

    const showPostsCheckbox = (await screen.getByText("Show Posts"))
      .parentElement?.firstElementChild as HTMLInputElement;
    expect(showPostsCheckbox.tagName).toEqual("INPUT");
    expect(showPostsCheckbox.checked).toBe(true);

    const showProjectsCheckbox = (await screen.getByText("Show Projects"))
      .parentElement?.firstElementChild as HTMLInputElement;
    expect(showProjectsCheckbox.tagName).toEqual("INPUT");
    expect(showProjectsCheckbox.checked).toBe(true);

    const showBooksCheckbox = (await screen.getByText("Show Books"))
      .parentElement?.firstElementChild as HTMLInputElement;
    expect(showBooksCheckbox.tagName).toEqual("INPUT");
    expect(showBooksCheckbox.checked).toBe(true);

    const showStoriesCheckbox = (await screen.getByText("Show Stories"))
      .parentElement?.firstElementChild as HTMLInputElement;
    expect(showStoriesCheckbox.tagName).toEqual("INPUT");
    expect(showStoriesCheckbox.checked).toBe(true);

    const resultsContainer = (await screen.getByText("No results yet!"))
      .parentElement;
    expect(resultsContainer).toBeTruthy();
  });

  it("should toggle the checkbox checked property if any of the checkboxes are checked", async () => {
    render(
      <Wrapper>
        <Search {...props} />
      </Wrapper>
    );

    const showPostsCheckbox = (await screen.getByText("Show Posts"))
      .parentElement?.firstElementChild as HTMLInputElement;
    expect(showPostsCheckbox.checked).toBe(true);

    await act(async () => {
      fireEvent.click(showPostsCheckbox);
      jest.runAllTimers();
      expect(showPostsCheckbox.checked).toBe(false);
    });

    const showProjectsCheckbox = (await screen.getByText("Show Projects"))
      .parentElement?.firstElementChild as HTMLInputElement;
    expect(showProjectsCheckbox.checked).toBe(true);

    await act(async () => {
      fireEvent.click(showProjectsCheckbox);
      jest.runAllTimers();
      expect(showProjectsCheckbox.checked).toBe(false);
    });

    const showBooksCheckbox = (await screen.getByText("Show Books"))
      .parentElement?.firstElementChild as HTMLInputElement;
    expect(showBooksCheckbox.checked).toBe(true);

    await act(async () => {
      fireEvent.click(showBooksCheckbox);
      jest.runAllTimers();
      expect(showBooksCheckbox.checked).toBe(false);
    });

    const showStoriesCheckbox = (await screen.getByText("Show Stories"))
      .parentElement?.firstElementChild as HTMLInputElement;
    expect(showStoriesCheckbox.checked).toBe(true);

    await act(async () => {
      fireEvent.click(showStoriesCheckbox);
      jest.runAllTimers();
      expect(showStoriesCheckbox.checked).toBe(false);
    });
  });

  it("should create cards with links and text for every item that corresponds to the search data", async () => {
    render(
      <Wrapper>
        <Search {...props} />
      </Wrapper>
    );
    const text = (await screen.getByRole("textbox")) as HTMLInputElement;
    const resultsContainer = (await screen.getByText("No results yet!"))
      .parentElement!;

    await act(async () => {
      fireEvent.change(text, { target: { value: "september" } });
      jest.runAllTimers();

      const results = resultsContainer.children;
      expect(results.length).toEqual(4);

      expect(results[0].firstElementChild!.getAttribute("href")).toEqual(
        getSlug(searchData[0])
      );
      expect(
        results[0].firstElementChild!.firstElementChild!.children[0].textContent
      ).toEqual(searchData[0].title);
      expect(
        results[0].firstElementChild!.firstElementChild!.children[1].textContent
      ).toEqual(capitalize(searchData[0].type));

      expect(results[1].firstElementChild!.getAttribute("href")).toEqual(
        getSlug(searchData[2])
      );
      expect(
        results[1].firstElementChild!.firstElementChild!.children[0].textContent
      ).toEqual(searchData[2].title);
      expect(
        results[1].firstElementChild!.firstElementChild!.children[1].textContent
      ).toEqual(capitalize(searchData[2].type));

      expect(results[2].firstElementChild!.getAttribute("href")).toEqual(
        getSlug(searchData[4])
      );
      expect(
        results[2].firstElementChild!.firstElementChild!.children[0].textContent
      ).toEqual(searchData[4].title);
      expect(
        results[2].firstElementChild!.firstElementChild!.children[1].textContent
      ).toEqual(capitalize(searchData[4].type));

      expect(results[3].firstElementChild!.getAttribute("href")).toEqual(
        getSlug(searchData[6])
      );
      expect(
        results[3].firstElementChild!.firstElementChild!.children[0].textContent
      ).toEqual(searchData[6].title);
      expect(
        results[3].firstElementChild!.firstElementChild!.children[1].textContent
      ).toEqual(capitalize(searchData[6].type));
    });

    await act(async () => {
      fireEvent.change(text, { target: { value: "october" } });
      jest.runAllTimers();

      expect(resultsContainer.children.length).toEqual(2);
      const results = resultsContainer.children;

      expect(results[0].firstElementChild!.getAttribute("href")).toEqual(
        getSlug(searchData[1])
      );
      expect(
        results[0].firstElementChild!.firstElementChild!.children[0].textContent
      ).toEqual(searchData[1].title);
      expect(
        results[0].firstElementChild!.firstElementChild!.children[1].textContent
      ).toEqual(capitalize(searchData[1].type));

      expect(results[1].firstElementChild!.getAttribute("href")).toEqual(
        getSlug(searchData[3])
      );
      expect(
        results[1].firstElementChild!.firstElementChild!.children[0].textContent
      ).toEqual(searchData[3].title);
      expect(
        results[1].firstElementChild!.firstElementChild!.children[1].textContent
      ).toEqual(capitalize(searchData[3].type));
    });
  });

  it("should allow filters by the checkboxes and the search box", async () => {
    render(
      <Wrapper>
        <Search {...props} />
      </Wrapper>
    );
    const text = (await screen.getByRole("textbox")) as HTMLInputElement;
    const resultsContainer = (await screen.getByText("No results yet!"))
      .parentElement!;

    const showPostsCheckbox = (await screen.getByText("Show Posts"))
      .parentElement?.firstElementChild as HTMLInputElement;

    const showProjectsCheckbox = (await screen.getByText("Show Projects"))
      .parentElement?.firstElementChild as HTMLInputElement;

    const showBooksCheckbox = (await screen.getByText("Show Books"))
      .parentElement?.firstElementChild as HTMLInputElement;

    const showStoriesCheckbox = (await screen.getByText("Show Stories"))
      .parentElement?.firstElementChild as HTMLInputElement;

    await act(async () => {
      fireEvent.change(text, { target: { value: "september" } });
      jest.runAllTimers();

      const results = resultsContainer.children;
      expect(results.length).toEqual(4);

      expect(results[0].firstElementChild!.getAttribute("href")).toEqual(
        getSlug(searchData[0])
      );
      expect(
        results[0].firstElementChild!.firstElementChild!.children[0].textContent
      ).toEqual(searchData[0].title);
      expect(
        results[0].firstElementChild!.firstElementChild!.children[1].textContent
      ).toEqual(capitalize(searchData[0].type));

      expect(results[1].firstElementChild!.getAttribute("href")).toEqual(
        getSlug(searchData[2])
      );
      expect(
        results[1].firstElementChild!.firstElementChild!.children[0].textContent
      ).toEqual(searchData[2].title);
      expect(
        results[1].firstElementChild!.firstElementChild!.children[1].textContent
      ).toEqual(capitalize(searchData[2].type));

      expect(results[2].firstElementChild!.getAttribute("href")).toEqual(
        getSlug(searchData[4])
      );
      expect(
        results[2].firstElementChild!.firstElementChild!.children[0].textContent
      ).toEqual(searchData[4].title);
      expect(
        results[2].firstElementChild!.firstElementChild!.children[1].textContent
      ).toEqual(capitalize(searchData[4].type));

      expect(results[3].firstElementChild!.getAttribute("href")).toEqual(
        getSlug(searchData[6])
      );
      expect(
        results[3].firstElementChild!.firstElementChild!.children[0].textContent
      ).toEqual(searchData[6].title);
      expect(
        results[3].firstElementChild!.firstElementChild!.children[1].textContent
      ).toEqual(capitalize(searchData[6].type));
    });

    await act(async () => {
      fireEvent.click(showPostsCheckbox);
      jest.runAllTimers();

      const results = resultsContainer.children;
      expect(results.length).toEqual(3);

      expect(results[0].firstElementChild!.getAttribute("href")).toEqual(
        getSlug(searchData[0])
      );
      expect(
        results[0].firstElementChild!.firstElementChild!.children[0].textContent
      ).toEqual(searchData[0].title);
      expect(
        results[0].firstElementChild!.firstElementChild!.children[1].textContent
      ).toEqual(capitalize(searchData[0].type));

      expect(results[1].firstElementChild!.getAttribute("href")).toEqual(
        getSlug(searchData[2])
      );
      expect(
        results[1].firstElementChild!.firstElementChild!.children[0].textContent
      ).toEqual(searchData[2].title);
      expect(
        results[1].firstElementChild!.firstElementChild!.children[1].textContent
      ).toEqual(capitalize(searchData[2].type));

      expect(results[2].firstElementChild!.getAttribute("href")).toEqual(
        getSlug(searchData[4])
      );
      expect(
        results[2].firstElementChild!.firstElementChild!.children[0].textContent
      ).toEqual(searchData[4].title);
      expect(
        results[2].firstElementChild!.firstElementChild!.children[1].textContent
      ).toEqual(capitalize(searchData[4].type));
    });

    await act(async () => {
      fireEvent.click(showStoriesCheckbox);
      jest.runAllTimers();

      const results = resultsContainer.children;
      expect(results.length).toEqual(2);

      expect(results[0].firstElementChild!.getAttribute("href")).toEqual(
        getSlug(searchData[0])
      );
      expect(
        results[0].firstElementChild!.firstElementChild!.children[0].textContent
      ).toEqual(searchData[0].title);
      expect(
        results[0].firstElementChild!.firstElementChild!.children[1].textContent
      ).toEqual(capitalize(searchData[0].type));

      expect(results[1].firstElementChild!.getAttribute("href")).toEqual(
        getSlug(searchData[2])
      );
      expect(
        results[1].firstElementChild!.firstElementChild!.children[0].textContent
      ).toEqual(searchData[2].title);
      expect(
        results[1].firstElementChild!.firstElementChild!.children[1].textContent
      ).toEqual(capitalize(searchData[2].type));
    });

    await act(async () => {
      fireEvent.click(showProjectsCheckbox);
      jest.runAllTimers();

      const results = resultsContainer.children;
      expect(results.length).toEqual(1);

      expect(results[0].firstElementChild!.getAttribute("href")).toEqual(
        getSlug(searchData[0])
      );
      expect(
        results[0].firstElementChild!.firstElementChild!.children[0].textContent
      ).toEqual(searchData[0].title);
      expect(
        results[0].firstElementChild!.firstElementChild!.children[1].textContent
      ).toEqual(capitalize(searchData[0].type));
    });

    await act(async () => {
      fireEvent.click(showBooksCheckbox);
      jest.runAllTimers();

      const results = resultsContainer.children;
      expect(results.length).toEqual(1);

      expect(results[0].textContent).toEqual("No results yet!");
    });
  });
});
