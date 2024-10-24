import { useState, useEffect } from "react";

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
import { createModifyFilterFns } from "@/utils/filter";

const useFilter: FilterHook = <T extends object>(
  items: T[],
  startDate: Date,
  endDate: Date,
  keywordFilterDetails: KeywordFilterDetails[],
  createFilterOptions: CreateFilterOption[],
  filterByDate: (filter: DateFilter, items: T[]) => T[],
  filterByKeywords: (filter: KeywordFilter, items: T[]) => T[],
  filterBySearch: (filter: SearchFilter, items: T[]) => T[]
) => {
  const pagination = usePagination(items);
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
    createFilterOptions,
    setFilters,
    filterByDate,
    filterByKeywords,
    filterBySearch,
    pagination.setItems,
    pagination.setPage,
    items,
    startDate,
    endDate,
    keywordFilterDetails
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: Run this only once - on component mount
  useEffect(() => {
    filterItems();
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
