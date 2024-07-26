import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import useMultiple from "../useMultiple.hook";

const Wrapper: React.FC<{
	possibilities: string[];
	defaultTrue?: string[];
}> = ({ possibilities, defaultTrue }) => {
	const [allItems, setAllItems] = useMultiple(possibilities, defaultTrue);
	const [text, setText] = React.useState("");
	const handleClick = () => {
		setAllItems(...text.split(" "));
		setText("");
	};
	return (
		<div>
			<ul>
				{Object.keys(allItems)
					.filter((possibility) => allItems[possibility])
					.map((item) => (
						<li key={item}>{item}</li>
					))}
			</ul>
			<input
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<button type="button" onClick={handleClick}>
				Alternate
			</button>
		</div>
	);
};

describe("useMultiple hook", () => {
	afterEach(cleanup);

	it("should display a list item for all possibilities if none are specified as open by default", async () => {
		render(<Wrapper possibilities={["first", "second", "third"]} />);
		const ul = await screen.getByRole("list");
		expect(ul.children.length).toEqual(3);
		expect(ul.children[0].textContent).toEqual("first");
		expect(ul.children[1].textContent).toEqual("second");
		expect(ul.children[2].textContent).toEqual("third");
	});

	it("should only display a list item for those that are defaulted to true", async () => {
		render(
			<Wrapper
				possibilities={["first", "second", "third"]}
				defaultTrue={["first", "second"]}
			/>,
		);
		const ul = await screen.getByRole("list");
		expect(ul.children.length).toEqual(2);
		expect(ul.children[0].textContent).toEqual("first");
		expect(ul.children[1].textContent).toEqual("second");
	});

	it("should toggle the appearance of list items for each toggled", () => {
		render(<Wrapper possibilities={["first", "second", "third"]} />);
		const ul = screen.getByRole("list");
		const input = screen.getByRole("textbox");
		const button = screen.getByRole("button");

		expect(ul.children.length).toEqual(3);

		fireEvent.change(input, { target: { value: "first" } });
		fireEvent.click(button);

		expect(ul.children.length).toEqual(2);
		expect(ul.children[0].textContent).toEqual("second");
		expect(ul.children[1].textContent).toEqual("third");

		fireEvent.change(input, { target: { value: "first" } });
		fireEvent.click(button);

		expect(ul.children.length).toEqual(3);
		expect(ul.children[0].textContent).toEqual("first");
		expect(ul.children[1].textContent).toEqual("second");
		expect(ul.children[2].textContent).toEqual("third");
	});

	it("should allow multiple items to be toggled on/off", () => {
		render(<Wrapper possibilities={["first", "second", "third"]} />);
		const ul = screen.getByRole("list");
		const input = screen.getByRole("textbox");
		const button = screen.getByRole("button");
		expect(ul.children.length).toEqual(3);

		fireEvent.change(input, { target: { value: "first second" } });
		fireEvent.click(button);

		expect(ul.children.length).toEqual(1);
		expect(ul.children[0].textContent).toEqual("third");

		fireEvent.change(input, { target: { value: "first third" } });
		fireEvent.click(button);

		expect(ul.children.length).toEqual(1);
		expect(ul.children[0].textContent).toEqual("first");

		fireEvent.change(input, { target: { value: "second third" } });
		fireEvent.click(button);
		expect(ul.children.length).toEqual(3);
		expect(ul.children[0].textContent).toEqual("first");
		expect(ul.children[1].textContent).toEqual("second");
		expect(ul.children[2].textContent).toEqual("third");
	});
});
