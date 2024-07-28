import { useState, useCallback, useMemo } from "react";

import type { PaginationHook } from "@/types/hooks";

const usePagination: PaginationHook = <T>(initialItems: T[]) => {
	const [currentPage, setCurrentPage] = useState(0);
	const [currentItems, _setCurrentItems] = useState(initialItems);

	const setCurrentItems = useCallback((items: T[]) => {
		setCurrentPage(0);
		_setCurrentItems(items);
	}, []);

	return {
		currentPage,
		onPageChange: setCurrentPage,
		items: currentItems,
		setCurrentItems,
	};
};

export default usePagination;
