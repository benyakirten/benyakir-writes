import * as React from "react";
import "jest-styled-components";

import { cleanup, fireEvent, render, screen } from "@TestUtils";

import { Toggle } from "@Input";

describe("Toggle component", () => {
	const toggleSpy = jest.fn();
	const props: ToggleProps = {
		label: "test toggle",
		value: false,
		onToggle: toggleSpy,
		name: "test-toggle",
	};

	afterEach(cleanup);

	beforeEach(toggleSpy.mockClear);

	it("should render properly", () => {
		expect(() => render(<Toggle {...props} />)).not.toThrow();
	});

	it("should call the onToggle method if the input, label or span are clicked", () => {
		render(<Toggle {...props} />);

		const span = screen.getByText("test toggle");
		fireEvent.click(span);
		expect(toggleSpy).toHaveBeenCalledTimes(1);

		const parent = span.parentElement;
		const input = parent?.firstElementChild!;
		fireEvent.click(input);
		expect(toggleSpy).toHaveBeenCalledTimes(2);

		const label = input.nextElementSibling!;
		fireEvent.click(label);
		expect(toggleSpy).toHaveBeenCalledTimes(3);
	});
});
