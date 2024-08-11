import { renderHook, act } from "@testing-library/react";

import { useFlyout } from "@/hooks/useFlyout.hook";
import { describe, afterEach, it, expect, vi, afterAll } from "vitest";

describe("useFlyout", () => {
	const clientRectSpy = vi.fn();
	const WINDOW_INNER_HEIGHT = 1000;
	vi.stubGlobal("innerHeight", WINDOW_INNER_HEIGHT);

	// @ts-ignore
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const menuRef = { current: { getBoundingClientRect: clientRectSpy } } as any;

	afterEach(() => {
		clientRectSpy.mockClear();
	});

	afterAll(() => {
		vi.unstubAllGlobals();
	});

	function setClientRect(top: number) {
		clientRectSpy.mockReturnValue({ top });
	}

	it("should set menuOpenTop to true if button is positioned below the middle of the window", () => {
		setClientRect(WINDOW_INNER_HEIGHT / 2 + 10);
		// @ts-ignore
		const { result } = renderHook(() => useFlyout(menuRef));

		expect(result.current[0]).toBe(true);
	});

	it("should set menuOpenTop to false if button is positioned below the middle of the window", () => {
		setClientRect(WINDOW_INNER_HEIGHT / 2 - 10);
		// @ts-ignore
		const { result } = renderHook(() => useFlyout(menuRef));
		expect(result.current[0]).toBe(false);
	});

	it("should update menuOpenTop when the window is scrolled", () => {
		setClientRect(WINDOW_INNER_HEIGHT / 2 + 10);
		const { result } = renderHook(() => useFlyout(menuRef));

		expect(result.current[0]).toBe(true);

		act(() => {
			setClientRect(WINDOW_INNER_HEIGHT / 2 - 10);
			window.dispatchEvent(new Event("scroll"));
		});

		expect(result.current[0]).toBe(false);
	});

	it("should set isOpen to true if hardOpen is true or if lightOpen is true", () => {
		setClientRect(WINDOW_INNER_HEIGHT / 2 + 10);
		const { result } = renderHook(() => useFlyout(menuRef));

		expect(result.current[1]).toBe(false);

		act(() => {
			result.current[2](true); // setSoftOpen(true)
		});

		expect(result.current[1]).toBe(true);

		act(() => {
			result.current[2](false);
			result.current[3](true); // setHardOpen(true)
		});

		expect(result.current[1]).toBe(true);
	});

	it("should set isOpen to false when both lightOpen and hardOpen are false", () => {
		const { result } = renderHook(() => useFlyout(menuRef));

		act(() => {
			result.current[2](true); // setSoftOpen(true)
		});

		expect(result.current[1]).toBe(true);

		act(() => {
			result.current[2](false);
			result.current[3](false); // setHardOpen(false)
		});

		expect(result.current[1]).toBe(false);
	});
});
