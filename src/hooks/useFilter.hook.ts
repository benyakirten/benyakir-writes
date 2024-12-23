import { useEffect, useState } from "react";

import {
	DateFilter,
	ItemFilter,
	KeywordFilter,
	KeywordFilterDetails,
	SearchFilter,
} from "@/types/filters";
import { FilterHook } from "@/types/hooks";
import { createModifyFilterFns } from "@/utils/filter";
import { getQueryParams } from "@/utils/queries";
import usePagination from "./usePagination.hook";

const useFilter: FilterHook = <T extends object>(
	items: T[],
	startDate: Date,
	endDate: Date,
	keywordFilterDetails: KeywordFilterDetails[],
	filterByDate: (filter: DateFilter, items: T[]) => T[],
	filterByKeywords: (filter: KeywordFilter, items: T[]) => T[],
	filterBySearch: (filter: SearchFilter, items: T[]) => T[],
) => {
	const pagination = usePagination<T>(items);
	const [filters, setFilters] = useState<ItemFilter[]>([]);

	const {
		createFilter,
		removeFilter,
		modifyDate,
		modifyKeywords,
		modifySearch,
		modifyFilterType,
		filterItems,
	} = createModifyFilterFns(
		setFilters,
		filterByDate,
		filterByKeywords,
		filterBySearch,
		pagination.setItems,
		pagination.setPage,
		items,
		startDate,
		endDate,
		keywordFilterDetails,
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: Run this only once - on component mount
	useEffect(() => {
		const page = getQueryParams().get("page");
		const p = Number.parseInt(page ?? "0");
		filterItems();

		if (page && !Number.isNaN(p)) {
			pagination.setPage(p - 1);
		}
		return () => setFilters([]);
	}, []);

	return {
		pagination,
		createFilter,
		removeFilter,
		modifyDate,
		modifyKeywords,
		modifySearch,
		modifyFilterType,
		filters,
	};
};

export default useFilter;
