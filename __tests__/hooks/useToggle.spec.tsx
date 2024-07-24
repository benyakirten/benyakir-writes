import type React from "react";

import { useToggle } from "@Hooks";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

const Wrapper: React.FC<{ initialValue?: boolean }> = ({ initialValue }) => {
	const [value, toggleValue] = useToggle(initialValue);
	return (
		<div>
			<article>{value ? "true" : "false"}</article>
			<button onClick={toggleValue} />
		</div>
	);
};

describe("useToggle hook", () => {
	it("should display a false value if the initialValue is undefined", async () => {
		render(<Wrapper />);
		const output = await screen.getByRole("article");
		expect(output.textContent).toEqual("false");
	});

	it("should display the initial value if it is specified", async () => {
		render(<Wrapper initialValue={true} />);
		const output = await screen.getByRole("article");
		expect(output.textContent).toEqual("true");
	});

	it("should allow the value to be toggled by clicking on the button", async () => {
		render(<Wrapper />);
		const output = await screen.getByRole("article");
		const button = await screen.getByRole("button");

		expect(output.textContent).toEqual("false");
		fireEvent.click(button);

		expect(output.textContent).toEqual("true");
		fireEvent.click(button);

		expect(output.textContent).toEqual("false");
	});
});
