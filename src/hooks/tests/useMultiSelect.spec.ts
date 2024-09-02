import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import useMultiSelect from "../useMultiSelect.hook";

describe("useMultiSelect", () => {
	it("should initialize with the default value", () => {
		const defaultValue = ["option1", "option2"];
		const { result } = renderHook(() => useMultiSelect(defaultValue));

		expect(result.current[0]).toEqual(new Set(defaultValue));
	});

	it("should filter the items and update the set when the filter method is called", async () => {
		const items = [
			{ id: 1, name: "Item 1", categories: ["category1", "category2"] },
			{ id: 2, name: "Item 2", categories: ["category2", "category3"] },
			{ id: 3, name: "Item 3", categories: ["category3", "category4"] },
		];

		const { result } = renderHook(() => useMultiSelect());
		expect(result.current[0]).toEqual(new Set([]));

		const filteredItems = result.current[1](
			new Set(["category3"]),
			items,
			(item) => item.categories,
		);

		expect(filteredItems).toEqual([
			{ id: 2, name: "Item 2", categories: ["category2", "category3"] },
			{ id: 3, name: "Item 3", categories: ["category3", "category4"] },
		]);

		await vi.waitUntil(() => result.current[0].size > 0);
		expect(result.current[0]).toEqual(new Set(["category3"]));
	});
});
