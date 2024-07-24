import { fireEvent, render, screen } from "@testing-library/react";
import type React from "react";

import { useAlternation } from "@Hooks";

const HookTest: React.FC = () => {
	const [dropdown, setDropdown] = useAlternation();
	return (
		<>
			<button title="setTest1" onClick={() => setDropdown("test1")}>
				Set Test 1
			</button>
			<button title="setTest2" onClick={() => setDropdown("test2")}>
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
		render(<HookTest />);
		buttonOne = (await screen.findByTitle("setTest1")) as HTMLButtonElement;
		buttonTwo = (await screen.findByTitle("setTest2")) as HTMLButtonElement;
		output = (await screen.findByTitle("output")) as HTMLDivElement;
	});

	it("should change its value to the specified value when setDropdown is called", () => {
		expect(output).toHaveTextContent("");
		fireEvent.click(buttonOne);
		expect(output).toHaveTextContent("test1");
	});

	it("should change the dropdown value to an empty string if the setDropdown is called with dropdown's former value", () => {
		expect(output).toHaveTextContent("");
		fireEvent.click(buttonOne);
		expect(output).toHaveTextContent("test1");
		fireEvent.click(buttonOne);
		expect(output).toHaveTextContent("");
	});

	it("should change the value of dropdown to a new value when setDropdown is called with it as long as it's not the same value", () => {
		expect(output).toHaveTextContent("");
		fireEvent.click(buttonOne);
		expect(output).toHaveTextContent("test1");
		fireEvent.click(buttonTwo);
		expect(output).toHaveTextContent("test2");
		fireEvent.click(buttonTwo);
		expect(output).toHaveTextContent("");
	});
});
