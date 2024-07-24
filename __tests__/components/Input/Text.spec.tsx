import * as React from "react";
import "jest-styled-components";

import { Text } from "@Input";
import { cleanup, fireEvent, render, screen } from "@TestUtils";

describe("Text component", () => {
	const changeSpy = jest.fn();

	const testProps = {
		onChange: changeSpy,
		value: "test val",
		label: "test text",
		name: "test-text",
	};

	beforeEach(changeSpy.mockClear);

	afterEach(cleanup);

	it("should render correctly", () => {
		expect(() => render(<Text {...testProps} />)).not.toThrow();
	});

	it("should render a text input with a value, name and id according to props with an accompanying label with an htmlFor corresponding to the id", async () => {
		render(<Text {...testProps} />);
		const input = (await screen.findByRole("textbox")) as HTMLInputElement;
		expect(input.id).toEqual("test-text");
		expect(input.getAttribute("name")).toEqual("test-text");
		expect(input.value).toEqual("test val");

		const label = input.nextElementSibling!;
		expect(label.getAttribute("for")).toEqual("test-text");
		expect(label.textContent).toEqual("test text");
	});

	it("should call the onChange method whenever there is text input into the input", async () => {
		render(<Text {...testProps} />);
		const input = (await screen.findByRole("textbox")) as HTMLInputElement;

		fireEvent.change(input, { target: { value: "a new value" } });
		expect(changeSpy).toHaveBeenCalledTimes(1);
		expect(changeSpy).toHaveBeenCalledWith("a new value");
	});
});
