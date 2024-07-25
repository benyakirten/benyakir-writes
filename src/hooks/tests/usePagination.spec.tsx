import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import usePagination from "../usePagination.hook";

const TestHook: React.FC = () => {
	const { currentPage, onPageChange, items, setCurrentItems } = usePagination([
		1, 2, 3, 4, 5,
	]);
	return (
		<>
			<button type="button" onClick={() => onPageChange(currentPage + 1)}>
				&times;
			</button>
			<button type="button" onClick={() => setCurrentItems([2, 3, 4, 5])}>
				&times;
			</button>
			<article>{currentPage}</article>
			<article>{items.join(" ")}</article>
		</>
	);
};

describe("usePagination hook", () => {
	let buttonOne: HTMLButtonElement;
	let buttonTwo: HTMLButtonElement;
	let outputOne: HTMLElement;
	let outputTwo: HTMLElement;

	beforeEach(async () => {
		render(React.createElement(TestHook));
		const buttons = await screen.getAllByRole("button");
		buttonOne = buttons[0] as HTMLButtonElement;
		buttonTwo = buttons[1] as HTMLButtonElement;

		const outputs = await screen.getAllByRole("article");
		outputOne = outputs[0];
		outputTwo = outputs[1];
	});

	afterEach(cleanup);

	it("should increment the page number if the onPageChange function is called", async () => {
		expect(outputOne.textContent).toEqual("0");

		fireEvent.click(buttonOne);
		expect(outputOne.textContent).toEqual("1");

		fireEvent.click(buttonOne);
		expect(outputOne.textContent).toEqual("2");

		fireEvent.click(buttonOne);
		expect(outputOne.textContent).toEqual("3");

		fireEvent.click(buttonOne);
		expect(outputOne.textContent).toEqual("4");
	});

	it("should reset the page number to 0 if the setCurrentItems function is called", async () => {
		expect(outputOne.textContent).toEqual("0");
		expect(outputTwo.textContent).toEqual("1 2 3 4 5");

		fireEvent.click(buttonOne);
		expect(outputOne.textContent).toEqual("1");
		expect(outputTwo.textContent).toEqual("1 2 3 4 5");

		fireEvent.click(buttonTwo);
		expect(outputOne.textContent).toEqual("0");
		expect(outputTwo.textContent).toEqual("2 3 4 5");
	});
});
