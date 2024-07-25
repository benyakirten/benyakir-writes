import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { vi } from "vitest";

import useDebounce from "../useDebounce.hook";

const TIMEOUT = 500;

const HookTest: React.FC<{ callback: (val: string) => void }> = ({
	callback,
}) => {
	const [text, setText] = useDebounce(callback, "initial value");
	return (
		<div>
			<input
				data-testid="test-input"
				value={text}
				onChange={(e) => setText(e.target.value)}
				name="test-input"
				id="test-input"
			/>
			<article>{text}</article>
		</div>
	);
};

describe("useDebounce hook", () => {
	let input: HTMLInputElement;
	let output: HTMLElement;

	const debounceSpy = vi.fn();

	beforeAll(() => {
		vi.useFakeTimers();
	});

	beforeEach(() => {
		debounceSpy.mockClear();
		vi.runAllTimers();
		render(React.createElement(HookTest, { callback: debounceSpy }));

		input = document.querySelector("input") as HTMLInputElement;
		output = document.querySelector("article") as HTMLElement;
	});

	afterEach(async () => {
		cleanup();
	});

	it("should immediately update the output with the value as it's changed", async () => {
		expect(output.textContent).toBe("initial value");

		fireEvent.change(input, { target: { value: "new value" } });
		expect(debounceSpy).not.toHaveBeenCalled();
		expect(output.textContent).toBe("new value");

		fireEvent.change(input, { target: { value: "newer value" } });
		expect(debounceSpy).not.toHaveBeenCalled();
		expect(output.textContent).toBe("newer value");

		await vi.runAllTimersAsync();
		expect(debounceSpy).toHaveBeenCalledTimes(1);
		expect(debounceSpy).toHaveBeenCalledWith("newer value");
	});

	it("should not call the callback function output when the input's value changes if the required itme has not been passed", async () => {
		fireEvent.change(input, { target: { value: "new value" } });
		expect(debounceSpy).not.toHaveBeenCalled();
	});

	it("should change the value of the output and call the callback when the input's value changes after waiting an adequate amount of time", async () => {
		await vi.runAllTimersAsync();
		expect(debounceSpy).toHaveBeenCalledTimes(1);
		expect(debounceSpy).toHaveBeenCalledWith("initial value");

		fireEvent.change(input, { target: { value: "new value" } });

		await vi.runAllTimersAsync();
		expect(debounceSpy).toHaveBeenCalledTimes(2);
		expect(debounceSpy).toHaveBeenCalledWith("new value");
	});
});
