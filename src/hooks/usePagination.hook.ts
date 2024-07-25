import { useState, useCallback } from "react";

import type { PaginationHook } from "@/types/hooks";

const usePagination: PaginationHook = <T>(initialItems: T[]) => {
	const [currentPage, setCurrentPage] = useState(0);
	const [currentItems, _setCurrentItems] = useState(initialItems);

	const setCurrentItems = useCallback((_items: T[]) => {
		setCurrentPage(0);
		_setCurrentItems(_items);
	}, []);

	return {
		currentPage,
		onPageChange: setCurrentPage,
		items: currentItems,
		setCurrentItems,
	};
};

export default usePagination;
