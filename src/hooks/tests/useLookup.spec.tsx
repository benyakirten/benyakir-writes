import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import useLookup from "../useLookup.hook";

const LookupTest: React.FC = () => {
	const [state, dispatch] = useLookup({
		item: true,
	});

	function deactivate() {
		dispatch({ type: "DEACTIVATE", payload: "item" });
	}
	function activate() {
		dispatch({ type: "ACTIVATE", payload: "item" });
	}
	function toggle() {
		dispatch({ type: "TOGGLE", payload: "item" });
	}

	return (
		<>
			<button type="button" title="deactivate" onClick={deactivate}>
				Deactivate Item
			</button>
			<button type="button" title="activate" onClick={activate}>
				Activate Item
			</button>
			<button type="button" title="toggle" onClick={toggle}>
				Toggle
			</button>
			<div title="output">{state.item.toString()}</div>
		</>
	);
};

describe("useLookup hook", () => {
	let deactivateButton: HTMLButtonElement;
	let activateButton: HTMLButtonElement;
	let toggleButton: HTMLButtonElement;
	let output: HTMLDivElement;

	beforeEach(async () => {
		render(React.createElement(LookupTest));
		deactivateButton = (await screen.findByTitle(
			"deactivate",
		)) as HTMLButtonElement;
		activateButton = (await screen.findByTitle(
			"activate",
		)) as HTMLButtonElement;
		toggleButton = (await screen.findByTitle("toggle")) as HTMLButtonElement;
		output = (await screen.findByTitle("output")) as HTMLDivElement;
	});

	afterEach(cleanup);

	it("should render the designated item false if the deactivated dispatch type is called", () => {
		expect(output.textContent).toEqual("true");
		fireEvent.click(deactivateButton);
		expect(output.textContent).toEqual("false");
		fireEvent.click(deactivateButton);
		expect(output.textContent).toEqual("false");
	});

	it("should render the designated item true if it is first false then the activate dispatch type is called", () => {
		expect(output.textContent).toEqual("true");
		fireEvent.click(deactivateButton);
		expect(output.textContent).toEqual("false");
		fireEvent.click(activateButton);
		expect(output.textContent).toEqual("true");
		fireEvent.click(activateButton);
		expect(output.textContent).toEqual("true");
	});

	it("should toggle the value of the designated item if the toggle method dispatch type is called", () => {
		expect(output.textContent).toEqual("true");
		fireEvent.click(toggleButton);
		expect(output.textContent).toEqual("false");
		fireEvent.click(toggleButton);
		expect(output.textContent).toEqual("true");
		fireEvent.click(toggleButton);
		expect(output.textContent).toEqual("false");
		fireEvent.click(toggleButton);
		expect(output.textContent).toEqual("true");
	});

	it("should allow all three functionalities if they are used intermittently", () => {
		expect(output.textContent).toEqual("true");
		fireEvent.click(deactivateButton);
		expect(output.textContent).toEqual("false");
		fireEvent.click(activateButton);
		expect(output.textContent).toEqual("true");
		fireEvent.click(toggleButton);
		expect(output.textContent).toEqual("false");
		fireEvent.click(activateButton);
		expect(output.textContent).toEqual("true");
		fireEvent.click(deactivateButton);
		expect(output.textContent).toEqual("false");
	});
});
