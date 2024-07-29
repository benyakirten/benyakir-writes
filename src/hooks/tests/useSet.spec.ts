import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import useSet from "../useSet.hook";

describe("useSet", () => {
	it("should initialize with the default set", () => {
		const defaultValue = ["item1", "item2"];
		const { result } = renderHook(() => useSet(defaultValue));

		expect(result.current[0]).toEqual(new Set(defaultValue));
	});

	it("should add items to the set when called with new items", () => {
		const { result } = renderHook(() => useSet());

		result.current[1]("item1");

		expect(result.current[0]).toEqual(new Set(["item1"]));
	});

	it("should remove items from the set when called with existing items", () => {
		const { result } = renderHook(() => useSet(["item1", "item2"]));

		result.current[1]("item1");

		expect(result.current[0]).toEqual(new Set(["item2"]));
	});

	it("should be able to both remove and add items", () => {
		const { result } = renderHook(() => useSet(["item1", "item2"]));

		act(() => {
			result.current[1]("item1");
		});
		expect(result.current[0]).toEqual(new Set(["item2"]));

		act(() => {
			result.current[1]("item1");
		});
		expect(result.current[0]).toEqual(new Set(["item1", "item2"]));
	});
});
