import * as React from "react";

import { HoverImage } from "@Gen";
import { allIcons } from "@TestProps";
import { cleanup, render, screen } from "@TestUtils";

describe("HoverImage component", () => {
	afterEach(cleanup);

	it("should render properly", () => {
		expect(() => render(<HoverImage {...allIcons[0]} />)).not.toThrow();
	});

	it("should wrap the image in a link if the url property is set", async () => {
		render(<HoverImage {...allIcons[0]} url="https://www.google.com" />);
		const links = await screen.findAllByRole("link");
		expect(links[1].getAttribute("href")).toEqual("https://www.google.com");
	});
});
