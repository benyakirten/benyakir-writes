import * as React from "react";

import IndexPage from "@/pages";
import { cleanup, render, screen } from "@TestUtils";

describe("home page", () => {
	afterEach(cleanup);

	it("should render correctly", () => {
		expect(() => render(<IndexPage />)).not.toThrow();
	});

	it("should render a heading", async () => {
		render(<IndexPage />);
		const title = await screen.findByText("Welcome to Benyakir Writes");
		expect(title).toBeTruthy();
		expect(title.tagName).toEqual("H1");
	});

	it("should render a following paragraph", async () => {
		render(<IndexPage />);
		const title = await screen.findByText("Welcome to Benyakir Writes");
		const para = title.nextElementSibling;
		expect(para?.tagName).toEqual("SECTION");
	});

	it("should render a subtitle with another following paragraph", async () => {
		render(<IndexPage />);
		const title = await screen.findByText(
			"To get started, click on the bar to the left.",
		);
		expect(title).toBeTruthy();
		expect(title.tagName).toEqual("H2");

		const para = title.nextElementSibling;
		expect(para?.tagName).toEqual("P");
	});

	it("should render a final paragraph with links", async () => {
		render(<IndexPage />);
		const title = await screen.findByText("Need to contact me?");
		expect(title).toBeTruthy();
		expect(title.tagName).toEqual("H2");

		const para = title.nextElementSibling!;
		expect(para.tagName).toEqual("P");

		const links = para.children;
		expect(links[0].getAttribute("href")).toEqual("/portfolio");
		expect(links[1].getAttribute("href")).toEqual(
			"mailto:ben@benyakiredits.com",
		);
	});
});
