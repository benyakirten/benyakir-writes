import React from "react";

import { LinkGroup } from "@Layout";
import { cleanup, render, screen } from "@TestUtils";

describe("LinkGroup component", () => {
	const clickSpy = jest.fn();

	const props = {
		domain: "test-domain",
		links: ["Test Link A", "Test Link B"],
		onClick: clickSpy,
	};

	beforeEach(clickSpy.mockClear);

	afterEach(cleanup);

	it("should render correctly", () => {
		expect(() => render(<LinkGroup {...props} />)).not.toThrow();
	});

	it("should render a topbar that serves as a link to the entire domain", async () => {
		render(<LinkGroup {...props} />);
		const topbar = await screen.getByText("Test-domain");
		expect(topbar.tagName).toEqual("A");
		expect(topbar.getAttribute("href")).toEqual("/test-domain");
	});

	it("should render a list of links to sub domains if the foldout is open", async () => {
		render(<LinkGroup {...props} open={true} />);
		const links = await screen.getAllByRole("link");
		expect(links.length).toEqual(4);

		expect(links[2].textContent).toEqual("Test Link A");
		expect(links[2].getAttribute("href")).toEqual("/test-domain/test-link-a/");

		expect(links[3].textContent).toEqual("Test Link B");
		expect(links[3].getAttribute("href")).toEqual("/test-domain/test-link-b/");
	});
});
