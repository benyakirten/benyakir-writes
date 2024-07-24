import * as React from "react";

import BlogPage from "@/pages/blog";
import { act, cleanup, fireEvent, render, screen } from "@TestUtils";

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
		expect(() => render(<BlogPage />)).not.toThrow();
	});

	it("should render a main heading", async () => {
		render(<BlogPage />);
		const title = await screen.getByText("Blog Posts");
		expect(title).toBeTruthy();
		expect(title.tagName).toEqual("H1");
	});

	it("should render a blog card for every blog post", async () => {
		render(<BlogPage />);
		const cards = await screen.findAllByRole("article");
		expect(cards.length).toEqual(2);
	});

	it("should render only the filtered items if a filter is applied", async () => {
		render(<BlogPage />);

		await act(async () => {
			const input = await screen.findAllByRole("textbox");
			fireEvent.change(input[0], { target: { value: "january" } });

			jest.runAllTimers();

			const posts = await screen.findAllByRole("article");
			expect(posts.length).toEqual(1);
		});
	});
});
