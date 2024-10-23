import {
  CreateFilterOption,
  DateFilter,
  ItemFilter,
  KeywordFilter,
  KeywordFilterDetails,
  ParsedQueryParams,
  SearchFilter,
  WordFilterType,
} from "@/types/filters";
import { PotentialChoice } from "@/types/general";
import { capitalize } from "./strings";
import {
  deserializeFromQueryParams,
  getQueryParams,
  removeQueryParam,
  serializeToQueryParams,
  setOneQueryParam,
} from "./queries";
import { getShortDate } from "./dates";

const DATE_START_KEY = "date_start";
const DATE_END_KEY = "date_end";
const SEARCH_KEY = "search";
const TYPE_KEY_SEGMENT = "_type";
const PAGE_KEY = "page";

export const createChoiceSet = <T extends object, U extends keyof T>(
  items: T[],
  key: T[U] extends string[] | null ? U : never
): PotentialChoice[] => {
  const [choiceSet, _] = items
    .flatMap((item) => item[key] as string[] | null)
    .reduce<[{ label: string; value: string }[], Set<string>]>(
      ([acc, set], next) => {
        if (!next) {
          return [acc, set];
        }

        if (set.has(next)) {
          return [acc, set];
        }

        acc.push({ label: next, value: next });
        set.add(next);
        return [acc, set];
      },
      [[], new Set()]
    );

  return choiceSet;
};

export const isDateFilter = (filter: ItemFilter): filter is DateFilter => {
  return "start" in filter;
};

export const isSearchFilter = (filter: ItemFilter): filter is SearchFilter => {
  return "search" in filter;
};

export const isKeywordFilter = (
  filter: ItemFilter
): filter is KeywordFilter => {
  return "currentKeywords" in filter;
};

export function createAddDateFilterFn(
  start: Date,
  end: Date,
  setFilters: React.Dispatch<React.SetStateAction<ItemFilter[]>>
): () => void {
  return () => {
    setFilters((filters) => [
      ...filters,
      { label: "Date", id: "date", start, end },
    ]);
  };
}

export function createAddKeywordFilterFn(
  id: string,
  keywords: PotentialChoice[],
  setFilters: React.Dispatch<React.SetStateAction<ItemFilter[]>>
): () => void {
  return () => {
    setFilters((filters) => [
      ...filters,
      {
        label: capitalize(id),
        id,
        type: "any",
        currentKeywords: [],
        allKeywords: keywords,
      },
    ]);
  };
}

export function createAddSearchFilterFn(
  setFilters: React.Dispatch<React.SetStateAction<ItemFilter[]>>,
  searchId = 0
): () => void {
  let _searchId = searchId;
  return () => {
    setFilters((filters) => [
      ...filters,
      {
        label: "Search",
        id: `${SEARCH_KEY}_${_searchId++}`,
        search: [],
        type: "any",
      },
    ]);
  };
}

function createFilterCreationFn(
  items: CreateFilterOption[]
): (id: string) => void {
  return (id: string) => {
    const item = items.find((item) => item.match === id);
    if (!item) {
      return;
    }

    item.fn();
  };
}

function createRemoveFilterFn(
  setFilters: React.Dispatch<React.SetStateAction<ItemFilter[]>>,
  filterItems: (filters: ItemFilter[]) => void
): (id: string) => void {
  return (id: string) =>
    setFilters((filters) => {
      removeQueryParam(id);
      removeQueryParam(`${id}${TYPE_KEY_SEGMENT}`);
      const newFilters = filters.filter((filter) => filter.id !== id);
      filterItems(newFilters);
      return newFilters;
    });
}

function createModifyDateFn(
  setFilters: React.Dispatch<React.SetStateAction<ItemFilter[]>>,
  filterItems: (filters: ItemFilter[]) => void
): (time: "start" | "end", value: Date) => void {
  return (time: "start" | "end", value: Date) =>
    setFilters((filters) => {
      setOneQueryParam(
        time === "end" ? DATE_END_KEY : DATE_START_KEY,
        getShortDate(value).replace(/\//g, "-")
      );
      const dateFilter = filters.find((filter) => filter.id === "date");
      if (!dateFilter || !("start" in dateFilter)) {
        return filters;
      }

      dateFilter[time] = value;
      filterItems(filters);

      return structuredClone(filters);
    });
}

function createModifyKeywordFn(
  setFilters: React.Dispatch<React.SetStateAction<ItemFilter[]>>,
  filterItems: (filters: ItemFilter[]) => void
): (id: string, keywords: readonly PotentialChoice[]) => void {
  return (id: string, keywords: readonly PotentialChoice[]) =>
    setFilters((filters) => {
      setOneQueryParam(
        id,
        keywords.map((k) => k.value)
      );
      const keywordFilter = filters.find((filter) => filter.id === id);
      if (!keywordFilter || !("currentKeywords" in keywordFilter)) {
        return filters;
      }

      keywordFilter.currentKeywords = keywords;
      filterItems(filters);

      return structuredClone(filters);
    });
}

function createModifyFilterTypeFn(
  setFilters: React.Dispatch<React.SetStateAction<ItemFilter[]>>,
  filterItems: (filters: ItemFilter[]) => void
): (id: string, type: WordFilterType) => void {
  return (id: string, type: WordFilterType) =>
    setFilters((filters) => {
      const filter = filters.find((filter) => filter.id === id);
      setOneQueryParam(`${id}${TYPE_KEY_SEGMENT}`, type);
      if (!filter || !("type" in filter)) {
        return filters;
      }

      filter.type = type;
      filterItems(filters);

      return structuredClone(filters);
    });
}

function createModifySearchFn(
  setFilters: React.Dispatch<React.SetStateAction<ItemFilter[]>>,
  filterItems: (filters: ItemFilter[]) => void
): (id: string, search: string) => void {
  return (id: string, search: string) =>
    setFilters((filters) => {
      const searchFilter = filters.find((filter) => filter.id === id);
      setOneQueryParam(id, serializeToQueryParams([search]));
      if (!searchFilter || !("search" in searchFilter)) {
        return filters;
      }

      searchFilter.search = search
        .replace(/,\s/g, " ")
        .replace(/,(\S)/g, " $1")
        .split(" ");
      filterItems(filters);

      return structuredClone(filters);
    });
}

function createFilterItemsFn<T extends object>(
  filterByDate: (filter: DateFilter, items: T[]) => T[],
  filterByKeywords: (filter: KeywordFilter, items: T[]) => T[],
  filterBySearch: (filter: SearchFilter, items: T[]) => T[],
  setItems: (items: T[]) => void,
  items: T[]
) {
  return (filters: ItemFilter[]) => {
    let filteredItems = items;
    for (const filter of filters) {
      if (isDateFilter(filter)) {
        filteredItems = filterByDate(filter, filteredItems);
      } else if (isSearchFilter(filter)) {
        filteredItems = filterBySearch(filter, filteredItems);
      } else if (isKeywordFilter(filter)) {
        filteredItems = filterByKeywords(filter, filteredItems);
      }
    }

    setItems(filteredItems);
  };
}

export function createModifyFilterFns<T extends object>(
  options: CreateFilterOption[],
  setFilters: React.Dispatch<React.SetStateAction<ItemFilter[]>>,
  filterByDate: (filter: DateFilter, items: T[]) => T[],
  filterByKeywords: (filter: KeywordFilter, items: T[]) => T[],
  filterBySearch: (filter: SearchFilter, items: T[]) => T[],
  setItems: (items: T[]) => void,
  items: T[]
) {
  const filterItems = createFilterItemsFn(
    filterByDate,
    filterByKeywords,
    filterBySearch,
    setItems,
    items
  );

  return {
    createFilter: createFilterCreationFn(options),
    removeFilter: createRemoveFilterFn(setFilters, filterItems),
    modifyDate: createModifyDateFn(setFilters, filterItems),
    modifyKeywords: createModifyKeywordFn(setFilters, filterItems),
    modifyFilterType: createModifyFilterTypeFn(setFilters, filterItems),
    modifySearch: createModifySearchFn(setFilters, filterItems),
  };
}

export function createFilterBySearchFn<T extends object>(
  searchFn: (item: T, word: string) => boolean
) {
  return (filter: SearchFilter, items: T[]): T[] => {
    if (
      filter.search.length === 0 ||
      (filter.search.length === 1 && filter.search[0] === "")
    ) {
      return items;
    }

    const { search } = filter;
    const fn =
      filter.type === "any"
        ? search.some.bind(search)
        : search.every.bind(search);

    return items.filter((item) => fn((word) => searchFn(item, word)));
  };
}

export function createFilterByKeywordFn<T extends object>(
  getChoiceFn: (item: T, id: string) => string[]
) {
  return (filter: KeywordFilter, items: T[]): T[] => {
    if (filter.currentKeywords.length === 0) {
      return items;
    }

    const fn =
      filter.type === "any"
        ? filter.currentKeywords.some.bind(filter.currentKeywords)
        : filter.currentKeywords.every.bind(filter.currentKeywords);

    return items.filter((item) => {
      const choices = getChoiceFn(item, filter.id);
      return fn((keyword) => choices.includes(keyword.value));
    });
  };
}

export function createFilterByDateFn<T extends object>(
  getDateFn: (item: T) => Date
) {
  return (filter: DateFilter, items: T[]): T[] => {
    return items.filter((item) => {
      const itemDate = getDateFn(item).getTime();
      const start = filter.start?.getTime() ?? 0;
      const end = filter.end?.getTime() ?? 0;
      return itemDate >= start && itemDate <= end;
    });
  };
}

export function getQueryParamState(): ParsedQueryParams {
  const state = new Map<string, number | string[]>();

  const params = getQueryParams();
  for (const key of params.keys()) {
    const value = params.get(key);
    if (!value) {
      continue;
    }

    if (!Number.isNaN(Number(value))) {
      state.set(key, Number(value));
    } else {
      state.set(
        key,
        value.split(",").map((v) => decodeURIComponent(v))
      );
    }
  }

  return state;
}

export function getPageNumberFromQuery(
  state: ParsedQueryParams
): number | null {
  const page = state.get(PAGE_KEY);
  if (!page || Array.isArray(page) || typeof page === "string") {
    return null;
  }

  return page;
}

export function getDateFilterFromQuery(
  state: ParsedQueryParams,
  startDateDefault: Date,
  endDateDefault: Date
): DateFilter | null {
  const start = state.get(DATE_START_KEY) ?? null;
  const end = state.get(DATE_END_KEY) ?? null;

  if (!start && !end) {
    return null;
  }

  let startDate: Date | null = startDateDefault;
  if (start && typeof start === "string") {
    const tentativeStartDate = new Date(start.replace(/-/g, "/"));
    if (!Number.isNaN(tentativeStartDate.getTime())) {
      startDate = tentativeStartDate;
    }
  }

  let endDate: Date | null = endDateDefault;
  if (end && typeof end === "string") {
    const tentativeEndDate = new Date(end.replace(/-/g, "/"));
    if (!Number.isNaN(tentativeEndDate.getTime())) {
      endDate = tentativeEndDate;
    }
  }

  return {
    label: "Date",
    id: "date",
    start: startDate,
    end: endDate,
  };
}

export function getSearchFilterFromQuery(
  state: ParsedQueryParams
): SearchFilter[] {
  const searches: SearchFilter[] = [];

  for (const [key, value] of state.entries()) {
    if (!key.startsWith(SEARCH_KEY) || typeof value === "number") {
      continue;
    }

    const id = key as string;
    const type = getTypeForFilterFromQuery(id, state);

    searches.push({ label: "Search", id, search: value, type });
  }

  return searches;
}

export function getKeywordFilterFromQuery(
  id: string,
  state: Map<string, number | string[]>,
  allKeywords: PotentialChoice[]
): KeywordFilter | null {
  const keywords = state.get(id);
  if (!Array.isArray(keywords) || keywords.length === 0) {
    return null;
  }

  const type = getTypeForFilterFromQuery(id, state);

  return {
    label: capitalize(id),
    id,
    type,
    currentKeywords: keywords.map((keyword) => ({
      label: keyword,
      value: keyword,
    })),
    allKeywords,
  };
}

export function getTypeForFilterFromQuery(
  id: string,
  state: Map<string, number | string[]>
): WordFilterType {
  const rawType = state.get(`${id}${TYPE_KEY_SEGMENT}`);
  let type: WordFilterType = "all";
  if (rawType && Array.isArray(rawType)) {
    const [typeString] = rawType;
    if (typeString === "any") {
      type = typeString;
    }
  }

  return type;
}

export function parseInitialFilters(
  startDate: Date,
  endDate: Date,
  keywordFilterDetails: KeywordFilterDetails[]
): ItemFilter[] {
  const rawFilters = getQueryParamState();

  let filters: ItemFilter[] = [];

  const dateFilters = getDateFilterFromQuery(rawFilters, startDate, endDate);
  if (dateFilters) {
    filters.push(dateFilters);
  }

  const searchFilters = getSearchFilterFromQuery(rawFilters);
  filters = filters.concat(searchFilters);

  for (const { id, allKeywords } of keywordFilterDetails) {
    const filter = getKeywordFilterFromQuery(id, rawFilters, allKeywords);
    if (filter) {
      filters.push(filter);
    }
  }

  return filters;
}
