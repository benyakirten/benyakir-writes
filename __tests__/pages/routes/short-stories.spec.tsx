import * as React from "react";
import {
    cleanup,
    render,
    screen,
    act,
    fireEvent,
} from "@testing-library/react";

import ShortstoriesPage from "@/pages/author/short-stories";

describe("short-stories page", () => {

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
        expect(() => render(<ShortstoriesPage />));
    });

    it("should render a main heading", async () => {
        render(<ShortstoriesPage />);
        const title = await screen.getByText("Short Stories");
        expect(title).toBeTruthy();
        expect(title.tagName).toEqual("H1");
    });

    it("should render a story card for every short story", async () => {
        render(<ShortstoriesPage />);
        const cards = await screen.findAllByRole("article");
        expect(cards.length).toEqual(2);
    });

    it("should render only the filtered items if a filter is applied", async () => {
        render(<ShortstoriesPage />);

        await act(async () => {
            const input = await screen.findAllByRole("textbox");
            fireEvent.change(input[0], { target: { value: "july" } });

            jest.runAllTimers();

            const cards = await screen.findAllByRole("article");
            expect(cards.length).toEqual(1);
        });
    });
});
