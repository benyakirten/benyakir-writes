import * as React from "react";
import {
    cleanup,
    render,
    screen,
    act,
    fireEvent,
} from "@testing-library/react";

import BooksPage from "@/pages/author/books";

describe("books page", () => {
    jest.mock("gatsby")

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
        cleanup();
    });

    it("should render correctly", () => {
        expect(() => render(<BooksPage />));
    });

    it("should render a main heading", async () => {
        render(<BooksPage />);
        const title = await screen.getByText("Books");
        expect(title).toBeTruthy();
        expect(title.tagName).toEqual("H1");
    });

    it("should render a story card for every short story", async () => {
        render(<BooksPage />);
        const cards = await screen.findAllByRole("article");
        expect(cards.length).toEqual(2);
    });

    it("should render only the filtered items if a filter is applied", async () => {
        render(<BooksPage />);

        await act(async () => {
            const input = await screen.findAllByRole("textbox");
            fireEvent.change(input[0], { target: { value: "september" } });

            jest.runAllTimers();

            const cards = await screen.findAllByRole("article");
            expect(cards.length).toEqual(1);
        });
    });
});
