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
  setQueryParams,
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

export function createAddDateFilterFn(start: Date, end: Date): () => void {
  return () => {
    setQueryParams({
      [DATE_START_KEY]: getShortDate(start),
      [DATE_END_KEY]: getShortDate(end),
    });
  };
}

export function createAddKeywordFilterFn(id: string): () => void {
  return () => {
    setQueryParams({ [id]: "", [`${id}${TYPE_KEY_SEGMENT}`]: "all" });
  };
}

export function createAddSearchFilterFn(): () => void {
  return () => {
    const highestSearchId = getHighestSearchId();
    const id = `${SEARCH_KEY}_${highestSearchId + 1}`;
    setQueryParams({ [id]: "", [`${id}${TYPE_KEY_SEGMENT}`]: "any" });
  };
}

function createFilterCreationFn(
  filterItems: () => void,
  items: CreateFilterOption[]
): (id: string) => void {
  return (id: string) => {
    const item = items.find((item) => item.match === id);
    if (!item) {
      return;
    }

    item.fn();
    filterItems();
  };
}

function createRemoveFilterFn(filterItems: () => void): (id: string) => void {
  return (id: string) => {
    removeQueryParam(id);
    filterItems();
  };
}

function createModifyDateFn(
  filterItems: () => void
): (time: "start" | "end", value: Date) => void {
  return (time: "start" | "end", value: Date) => {
    setOneQueryParam(
      time === "end" ? DATE_END_KEY : DATE_START_KEY,
      getShortDate(value).replace(/\//g, "-")
    );

    filterItems();
  };
}

function createModifyKeywordFn(
  filterItems: () => void
): (id: string, keywords: readonly PotentialChoice[]) => void {
  return (id: string, keywords: readonly PotentialChoice[]) => {
    setOneQueryParam(
      id,
      keywords.map((k) => k.value)
    );

    filterItems();
  };
}

function createModifyFilterTypeFn(
  filterItems: () => void
): (id: string, type: WordFilterType) => void {
  return (id: string, type: WordFilterType) => {
    setOneQueryParam(`${id}${TYPE_KEY_SEGMENT}`, type);
    filterItems();
  };
}

function createModifySearchFn(
  filterItems: () => void
): (id: string, search: string) => void {
  return (id: string, search: string) => {
    setOneQueryParam(id, serializeToQueryParams([search]));
    filterItems();
  };
}

function createFilterItemsFn<T extends object>(
  filterByDate: (filter: DateFilter, items: T[]) => T[],
  filterByKeywords: (filter: KeywordFilter, items: T[]) => T[],
  filterBySearch: (filter: SearchFilter, items: T[]) => T[],
  setItems: (items: T[]) => void,
  setPage: (page: number) => void,
  setFilters: React.Dispatch<React.SetStateAction<ItemFilter[]>>,
  items: T[],
  startDate: Date,
  endDate: Date,
  keywordFilterDetails: KeywordFilterDetails[]
) {
  return () => {
    const filters = parseFiltersFromQueryParameters(
      startDate,
      endDate,
      keywordFilterDetails
    );
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

    const queryParams = getQueryParams();
    const page = getPageNumberFromQuery(queryParams);

    setPage(page);
    setFilters(filters);
  };
}

export function createModifyFilterFns<T extends object>(
  options: CreateFilterOption[],
  setFilters: React.Dispatch<React.SetStateAction<ItemFilter[]>>,
  filterByDate: (filter: DateFilter, items: T[]) => T[],
  filterByKeywords: (filter: KeywordFilter, items: T[]) => T[],
  filterBySearch: (filter: SearchFilter, items: T[]) => T[],
  setItems: (items: T[]) => void,
  setPage: (page: number) => void,
  items: T[],
  startDate: Date,
  endDate: Date,
  keywordFilterDetails: KeywordFilterDetails[]
) {
  const filterItems = createFilterItemsFn(
    filterByDate,
    filterByKeywords,
    filterBySearch,
    setItems,
    setPage,
    setFilters,
    items,
    startDate,
    endDate,
    keywordFilterDetails
  );

  return {
    createFilter: createFilterCreationFn(filterItems, options),
    removeFilter: createRemoveFilterFn(filterItems),
    modifyDate: createModifyDateFn(filterItems),
    modifyKeywords: createModifyKeywordFn(filterItems),
    modifyFilterType: createModifyFilterTypeFn(filterItems),
    modifySearch: createModifySearchFn(filterItems),
    filterItems,
  };
}

export function createFilterBySearchFn<T extends object>(
  searchFn: (item: T, word: string) => boolean
) {
  return (filter: SearchFilter, items: T[]): T[] => {
    if (filter.search.length === 0 || filter.search[0] === "") {
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
  for (const [key, value] of params.entries()) {
    if (value === null) {
      continue;
    }

    const val =
      Number.isNaN(Number(value)) || value === ""
        ? deserializeFromQueryParams(value)
        : Number(value);
    state.set(key, val);
  }

  return state;
}

export function getPageNumberFromQuery(searchParams: URLSearchParams): number {
  const page = searchParams.get(PAGE_KEY) ?? "";
  const p = Number.parseInt(page);

  return Number.isNaN(p) || p < 0 ? 0 : p - 1;
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
  if (Array.isArray(start) && start.length === 1) {
    const tentativeStartDate = new Date(start[0].replace(/-/g, "/"));
    if (!Number.isNaN(tentativeStartDate.getTime())) {
      startDate = tentativeStartDate;
    }
  }

  let endDate: Date | null = endDateDefault;
  if (Array.isArray(end) && end.length === 1) {
    const tentativeEndDate = new Date(end[0].replace(/-/g, "/"));
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

    searches.push({
      label: "Search",
      id,
      search: value.filter((v) => v !== ""),
      type,
    });
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
    currentKeywords: keywords
      .filter((keyword) => keyword !== "")
      .map((keyword) => ({
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

export function parseFiltersFromQueryParameters(
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

export function getHighestSearchId(): number {
  const queryParams = getQueryParams();
  let highestId = 0;
  for (const param of queryParams.keys()) {
    if (!param.startsWith(SEARCH_KEY) || param.endsWith(TYPE_KEY_SEGMENT)) {
      continue;
    }

    const id = Number.parseInt(param.split("_")[1]);
    if (Number.isNaN(id)) {
      continue;
    }
    highestId = Math.max(highestId, id);
  }

  return highestId;
}
