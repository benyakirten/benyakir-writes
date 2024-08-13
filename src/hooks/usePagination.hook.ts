import { useState, useCallback, useMemo } from "react";

import type { PaginationHook } from "@/types/hooks";

const usePagination: PaginationHook = <T>(
	initialItems: T[],
	defaultItemsPerPage = 10,
) => {
	const [page, setPage] = useState(0);
	const [items, _setItems] = useState(initialItems);

	const [itemsPerPage, _setItemsPerPage] = useState(defaultItemsPerPage);

	const setItemsPerPage = useCallback((itemsPerPage: number) => {
		setPage(0);
		_setItemsPerPage(itemsPerPage);
	}, []);

	const setItems = useCallback((items: T[]) => {
		setPage(0);
		_setItems(items);
	}, []);

	const goToPreviousPage = useCallback(() => {
		setPage((prevPage) => prevPage - 1);
	}, []);

	const goToNextPage = useCallback(() => {
		setPage((prevPage) => prevPage + 1);
	}, []);

	const numPages = useMemo(
		() => Math.ceil(items.length / itemsPerPage),
		[items, itemsPerPage],
	);

	return {
		page,
		setPage,
		items,
		setItems,
		itemsPerPage,
		setItemsPerPage,
		goToPreviousPage,
		goToNextPage,
		numPages,
	};
};

export default usePagination;
