import { useState, useMemo, useEffect } from "react";

import { FilterHook } from "@/types/hooks";
import usePagination from "./usePagination.hook";
import {
  CreateFilterOption,
  DateFilter,
  ItemFilter,
  KeywordFilter,
  KeywordFilterDetails,
  SearchFilter,
} from "@/types/filters";
import {
  createModifyFilterFns,
  getPageNumberFromQuery,
  parseInitialFilters,
} from "@/utils/filter";
import { getQueryParams } from "@/utils/queries";

const useFilter: FilterHook = <T extends object>(
  items: T[],
  startDate: Date,
  endDate: Date,
  keywordFilterDetails: KeywordFilterDetails[],
  createFilterOptionsFn: (
    setFilters: React.Dispatch<React.SetStateAction<ItemFilter[]>>
  ) => CreateFilterOption[],
  filterByDate: (filter: DateFilter, items: T[]) => T[],
  filterByKeywords: (filter: KeywordFilter, items: T[]) => T[],
  filterBySearch: (filter: SearchFilter, items: T[]) => T[]
) => {
  const pagination = usePagination(items);
  const [filters, setFilters] = useState<ItemFilter[]>(
    parseInitialFilters(startDate, endDate, keywordFilterDetails)
  );

  const {
    createFilter,
    removeFilter,
    modifyDate,
    modifyKeywords,
    modifySearch,
    modifyFilterType,
    filterItems,
    // biome-ignore lint/correctness/useExhaustiveDependencies: We only need to run this function once
  } = useMemo(
    () =>
      createModifyFilterFns(
        createFilterOptionsFn(setFilters),
        setFilters,
        filterByDate,
        filterByKeywords,
        filterBySearch,
        pagination.setItems,
        items
      ),
    []
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: We want this to run once on component mount
  useEffect(() => {
    const queryParams = getQueryParams();
    const initialPage = getPageNumberFromQuery(queryParams);

    filterItems(filters);
    pagination.setPage(initialPage);
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
