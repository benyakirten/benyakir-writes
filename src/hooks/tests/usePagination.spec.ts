import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import usePagination from "@/hooks/usePagination.hook";

describe("usePagination", () => {
	const initialItems = [
		{ id: 1, name: "Item 1" },
		{ id: 2, name: "Item 2" },
		{ id: 3, name: "Item 3" },
		{ id: 4, name: "Item 4" },
		{ id: 5, name: "Item 5" },
		{ id: 6, name: "Item 6" },
		{ id: 7, name: "Item 7" },
		{ id: 8, name: "Item 8" },
		{ id: 9, name: "Item 9" },
		{ id: 10, name: "Item 10" },
		{ id: 11, name: "Item 11" },
		{ id: 12, name: "Item 12" },
	];

	it("should initialize with default values", () => {
		const { result } = renderHook(() => usePagination(initialItems));

		expect(result.current.page).toBe(0);
		expect(result.current.items).toEqual(initialItems);
		expect(result.current.itemsPerPage).toBe(10);
		expect(result.current.numPages).toBe(1);
		expect(result.current.visibleItems).toEqual(initialItems.slice(0, 10));
	});

	it("should update page when setPage is called", () => {
		const { result } = renderHook(() => usePagination(initialItems));

		act(() => {
			result.current.setPage(1);
		});

		expect(result.current.page).toBe(1);
		expect(result.current.visibleItems).toEqual(initialItems.slice(10, 12));
	});

	it("should update itemsPerPage when setItemsPerPage is called", () => {
		const { result } = renderHook(() => usePagination(initialItems));

		act(() => {
			result.current.setItemsPerPage(5);
		});

		expect(result.current.itemsPerPage).toBe(5);
		expect(result.current.numPages).toBe(2);
		expect(result.current.visibleItems).toEqual(initialItems.slice(0, 5));
	});

	it("should update items and reset the page when setItems is called", () => {
		const { result } = renderHook(() => usePagination(initialItems));

		const newItems = [
			{ id: 13, name: "Item 13" },
			{ id: 14, name: "Item 14" },
			{ id: 15, name: "Item 15" },
		];

		act(() => {
			result.current.setPage(1);
			result.current.setItems(newItems);
		});

		expect(result.current.items).toEqual(newItems);
		expect(result.current.numPages).toBe(0);
		expect(result.current.visibleItems).toEqual(newItems);
	});
});
