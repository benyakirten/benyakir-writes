import { useState, useCallback, useMemo } from "react";

import type { PaginationHook } from "@/types/hooks";
import { deepEquals } from "@/utils/other";

const usePagination: PaginationHook = <T>(initialItems: T[]) => {
	const [currentPage, setCurrentPage] = useState(0);
	const [currentItems, _setCurrentItems] = useState(initialItems);

	const setCurrentItems = useCallback(
		(items: T[]) => {
			if (deepEquals(currentItems, items)) {
				return;
			}

			setCurrentPage(0);
			_setCurrentItems(items);
		},
		[currentItems],
	);

	return {
		currentPage,
		onPageChange: setCurrentPage,
		items: currentItems,
		setCurrentItems,
	};
};

export default usePagination;
