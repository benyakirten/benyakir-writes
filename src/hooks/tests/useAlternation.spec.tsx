import React from "react";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { describe, beforeEach, it, expect, afterEach } from "vitest";

import useAlternation from "../useAlternation.hook";

const HookTest: React.FC = () => {
	const [dropdown, setDropdown] = useAlternation();
	return (
		<>
			<button
				type="button"
				title="setTest1"
				onClick={() => setDropdown("test1")}
			>
				Set Test 1
			</button>
			<button
				type="button"
				title="setTest2"
				onClick={() => setDropdown("test2")}
			>
				Set Test 2
			</button>
			<div title="output">{dropdown}</div>
		</>
	);
};

describe("useAlternation hook", () => {
	let buttonOne: HTMLButtonElement;
	let buttonTwo: HTMLButtonElement;
	let output: HTMLDivElement;

	beforeEach(async () => {
		render(React.createElement(HookTest));
		buttonOne = await screen.findByTitle("setTest1");
		buttonTwo = await screen.findByTitle("setTest2");
		output = await screen.findByTitle("output");
	});

	afterEach(cleanup);

	it("should change its value to the specified value when setDropdown is called", () => {
		expect(output.textContent).toEqual("");
		fireEvent.click(buttonOne);
		expect(output.textContent).toEqual("test1");
	});

	it("should change the dropdown value to an empty string if the setDropdown is called with dropdown's former value", () => {
		expect(output.textContent).toEqual("");
		fireEvent.click(buttonOne);
		expect(output.textContent).toEqual("test1");
		fireEvent.click(buttonOne);
		expect(output.textContent).toEqual("");
	});

	it("should change the value of dropdown to a new value when setDropdown is called with it as long as it's not the same value", () => {
		expect(output.textContent).toEqual("");
		fireEvent.click(buttonOne);
		expect(output.textContent).toEqual("test1");
		fireEvent.click(buttonTwo);
		expect(output.textContent).toEqual("test2");
		fireEvent.click(buttonTwo);
		expect(output.textContent).toEqual("");
	});
});
