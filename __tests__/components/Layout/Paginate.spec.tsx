import React from "react";

import { cleanup, fireEvent, render, screen, act } from "@TestUtils";
import { Paginate } from "@Layout";

type TestProp = {
  item: {
    title: number;
  };
};

const PaginationTestEl: React.FC<TestProp> = ({ item }) => {
  return <article>{item.title}</article>;
};

describe("Paginate component", () => {
  const changeSpy = jest.fn();
  const El = PaginationTestEl;
  const normalArray = Array.from({ length: 10 }, (_, idx) => ({
    title: idx,
  }));
  const page = 0;

  const props = {
    onPageChange: changeSpy,
    El,
    items: normalArray,
    currentPage: page,
  };

  beforeEach(() => {
    changeSpy.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    cleanup();
  });

  it("should render correctly", () => {
    expect(() => render(<Paginate {...props} />)).not.toThrow();
  });

  it("should render four buttons of which are two disabled, two text boxes with the current items per page and four items", async () => {
    render(<Paginate {...props} />);
    const buttons = await screen.findAllByRole("button");
    expect(buttons.length).toEqual(5);
    expect(buttons[1]).toBeDisabled();
    expect(buttons[3]).toBeDisabled();

    const inputs = (await screen.findAllByRole(
      "textbox"
    )) as HTMLInputElement[];
    expect(inputs).toHaveLength(2);
    expect(inputs[0].value).toEqual("4");
    expect(inputs[0].nextElementSibling!.textContent).toEqual("Items Per Page");
    expect(inputs[1].value).toEqual("4");
    expect(inputs[1].nextElementSibling!.textContent).toEqual("Items Per Page");

    const articles = await screen.findAllByRole("article");
    expect(articles).toHaveLength(4);
    expect(articles[0].textContent).toEqual("0");
    expect(articles[1].textContent).toEqual("1");
    expect(articles[2].textContent).toEqual("2");
    expect(articles[3].textContent).toEqual("3");
  });

  it("should render as many items per page as the items per page", async () => {
    render(<Paginate {...props} />);
    const inputs = (await screen.findAllByRole(
      "textbox"
    )) as HTMLInputElement[];

    await act(async () => {
      fireEvent.change(inputs[0], { target: { value: 2 } });
      jest.runAllTimers();

      const articles = await screen.findAllByRole("article");
      expect(articles.length).toEqual(2);
    });
  });

  it("should not allow the items per page to be less than 1, more than the total item quantity, or not a number", async () => {
    render(<Paginate {...props} />);
    const inputs = (await screen.findAllByRole(
      "textbox"
    )) as HTMLInputElement[];

    await act(async () => {
      fireEvent.change(inputs[0], { target: { value: 0 } });
      jest.runAllTimers();

      const articles = await screen.findAllByRole("article");
      expect(articles.length).toEqual(4);
      expect(inputs[0].value).toEqual("4");
    });

    await act(async () => {
      fireEvent.change(inputs[0], { target: { value: 900 } });
      jest.runAllTimers();

      const articles = await screen.findAllByRole("article");
      expect(articles.length).toEqual(4);
      expect(inputs[0].value).toEqual("4");
    });

    await act(async () => {
      fireEvent.change(inputs[0], { target: { value: "hi" } });
      jest.runAllTimers();

      const articles = await screen.findAllByRole("article");
      expect(articles.length).toEqual(4);
      expect(inputs[0].value).toEqual("4");
    });
  });

  it("should call the onPageChange function when the buttons are clicked", async () => {
    const paginate = render(<Paginate {...props} />);

    await act(async () => {
      const buttons = await screen.findAllByRole("button");
      fireEvent.click(buttons[2]);
      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy).toHaveBeenCalledWith(1);
    });

    paginate.rerender(<Paginate {...props} currentPage={1} />);

    await act(async () => {
      const buttons = await screen.findAllByRole("button");
      fireEvent.click(buttons[1]);
      expect(changeSpy).toHaveBeenCalledTimes(2);
      expect(changeSpy).toHaveBeenCalledWith(0);
    });
  });

  it("should render article content based on the page number", async () => {
    const paginate = render(<Paginate {...props} currentPage={1} />);

    const articlesOne = await screen.findAllByRole("article");
    expect(articlesOne.length).toEqual(4);
    expect(articlesOne[0].textContent).toEqual("4");
    expect(articlesOne[1].textContent).toEqual("5");
    expect(articlesOne[2].textContent).toEqual("6");
    expect(articlesOne[3].textContent).toEqual("7");

    paginate.rerender(<Paginate {...props} currentPage={2} />);

    const articlesTwo = await screen.findAllByRole("article");
    expect(articlesTwo.length).toEqual(6);
    expect(articlesTwo[0].textContent).toEqual("8");
    expect(articlesTwo[1].textContent).toEqual("9");
  });

  it("should dynamically calculate the maximum number of pages based on the quantity of items and how many items are displayed per page", async () => {
    const paginate = render(<Paginate {...props} />);
    const inputs = (await screen.findAllByRole(
      "textbox"
    )) as HTMLInputElement[];

    await act(async () => {
      fireEvent.change(inputs[0], { target: { value: 2 } });
      jest.runAllTimers();

      const buttons = await screen.findAllByRole("button");
      expect(buttons[1]).toBeDisabled();
      expect(buttons[2]).toBeEnabled();
      expect(buttons[3]).toBeDisabled();
      expect(buttons[4]).toBeEnabled();

      const articles = await screen.findAllByRole("article");
      expect(articles.length).toEqual(2);
      expect(articles[0].textContent).toEqual("0");
      expect(articles[1].textContent).toEqual("1");
    });

    paginate.rerender(<Paginate {...props} currentPage={4} />);

    const buttons = await screen.findAllByRole("button");
    expect(buttons[1]).toBeEnabled();
    expect(buttons[2]).toBeDisabled();
    expect(buttons[3]).toBeEnabled();
    expect(buttons[4]).toBeDisabled();

    const articles = await screen.findAllByRole("article");
    expect(articles.length).toEqual(2);
    expect(articles[0].textContent).toEqual("0");
    expect(articles[1].textContent).toEqual("1");
  });

  it("should enable or disable the buttons based on what items are available", async () => {
    const paginate = render(<Paginate {...props} />);
    const buttonsOne = await screen.findAllByRole("button");
    expect(buttonsOne[1]).toBeDisabled();
    expect(buttonsOne[2]).toBeEnabled();
    expect(buttonsOne[3]).toBeDisabled();
    expect(buttonsOne[4]).toBeEnabled();

    paginate.rerender(<Paginate {...props} currentPage={1} />);
    const buttonsTwo = await screen.findAllByRole("button");
    expect(buttonsTwo[1]).toBeEnabled();
    expect(buttonsTwo[2]).toBeEnabled();
    expect(buttonsTwo[3]).toBeEnabled();
    expect(buttonsTwo[4]).toBeEnabled();

    paginate.rerender(<Paginate {...props} currentPage={2} />);
    const buttonsThree = await screen.findAllByRole("button");
    expect(buttonsThree[1]).toBeEnabled();
    expect(buttonsThree[2]).toBeDisabled();
    expect(buttonsThree[3]).toBeEnabled();
    expect(buttonsThree[4]).toBeDisabled();
  });
});
