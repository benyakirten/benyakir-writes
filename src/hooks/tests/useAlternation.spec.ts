import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import useAlternation from "../useAlternation.hook";

describe("useAlternation hook", () => {
	function getQueryParams() {
		return new URLSearchParams(window.location.search);
	}

	beforeEach(() => {
		window.history.pushState("", "", "/");
	});

	it("should set the initial value by the query parameter", () => {
		window.history.pushState("", "", "?theme=light");

		const { result } = renderHook(() => useAlternation("theme"));
		expect(result.current[0]).toBe("light");
	});

	it("should set the initial value to null if the query parameter is not present", () => {
		const { result } = renderHook(() => useAlternation("theme"));
		expect(result.current[0]).toBeNull();
		expect(getQueryParams().get("theme")).toBeNull();
	});

	it("should set the value to null and remove the query parameter if the value is set to its current value", () => {
		window.history.pushState("", "", "?theme=light");

		const { result } = renderHook(() => useAlternation("theme"));
		act(() => {
			result.current[1]("light");
		});

		expect(result.current[0]).toBeNull();
		expect(getQueryParams().get("theme")).toBeNull();
	});

	it("should set the value to null and remove the query parameter if the value is null", () => {
		window.history.pushState("", "", "?theme=light");

		const { result } = renderHook(() => useAlternation("theme"));
		act(() => {
			result.current[1](null);
		});

		expect(result.current[0]).toBeNull();
		expect(getQueryParams().get("theme")).toBeNull();
	});

	it("should set the value to the new value and update the query parameter if the value is different", () => {
		const { result } = renderHook(() => useAlternation("theme"));

		act(() => {
			result.current[1]("light");
		});
		expect(result.current[0]).toBe("light");
		expect(getQueryParams().get("theme")).toBe("light");
	});
});
