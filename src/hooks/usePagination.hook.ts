import { useCallback, useMemo, useState } from "react";

import type { PaginationHook } from "@/types/hooks";
import { clamp } from "@/utils/numbers";
import { setOneQueryParam } from "@/utils/queries";

const DEFAULT_ITEMS_PER_PAGE = 10;
const usePagination: PaginationHook = <T>(
	initialItems: T[],
	defaultItemsPerPage = DEFAULT_ITEMS_PER_PAGE,
) => {
	const [page, _setPage] = useState(0);
	const [items, _setItems] = useState(initialItems);
	const [itemsPerPage, _setItemsPerPage] = useState(defaultItemsPerPage);

	const numPages = Math.floor(items.length / itemsPerPage);

	const setPage: React.Dispatch<React.SetStateAction<number>> = useCallback(
		(pageOrPageFn) => {
			_setPage((prevPage) => {
				const newPage =
					typeof pageOrPageFn === "function"
						? pageOrPageFn(prevPage)
						: pageOrPageFn;

				const page = clamp(newPage, 0, numPages);
				setOneQueryParam("page", (page + 1).toString());
				return page;
			});
		},
		[numPages],
	);

	if (page > numPages) {
		setPage(numPages);
	}

	const setItemsPerPage = useCallback(
		(itemsPerPage: number) => {
			setPage(0);
			_setItemsPerPage(itemsPerPage);
		},
		[setPage],
	);

	const setItems = useCallback(
		(items: T[]) => {
			setPage(0);
			_setItems(items);
		},
		[setPage],
	);

	const visibleItems: T[] = useMemo(
		() =>
			items.slice(
				itemsPerPage * page,
				page < numPages ? itemsPerPage * (page + 1) : items.length,
			),
		[items, page, itemsPerPage, numPages],
	);

	return {
		page,
		setPage,
		items,
		setItems,
		itemsPerPage,
		setItemsPerPage,
		numPages,
		visibleItems,
	};
};

export default usePagination;
