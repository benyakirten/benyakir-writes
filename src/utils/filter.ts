import {
  CreateFilterOption,
  DateFilter,
  ItemFilter,
  KeywordFilter,
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
  setFilters: React.Dispatch<React.SetStateAction<ItemFilter[]>>
): () => void {
  let searchId = 0;
  return () => {
    setFilters((filters) => [
      ...filters,
      {
        label: "Search",
        id: `search_${searchId++}`,
        search: "",
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
      removeQueryParam(`${id}_type`);
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
      setOneQueryParam(`date_${time}`, getShortDate(value).replace(/\//g, "-"));
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
      setOneQueryParam(`${id}_type`, type);
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

      searchFilter.search = search;
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
    if (filter.search === "") {
      return items;
    }

    const search = filter.search.toLowerCase().split(" ");
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
      const start = filter.start.getTime();
      const end = filter.end.getTime();
      return itemDate >= start && itemDate <= end;
    });
  };
}

export function getQueryParamState(): Map<string, string | number | string[]> {
  const state = new Map<string, string | number | string[]>();

  const params = getQueryParams();
  for (const key of params.keys()) {
    const value = params.get(key);
    if (!value) {
      continue;
    }

    if (value.includes(",")) {
      const values = deserializeFromQueryParams(value);
      state.set(key, values);
    } else if (!Number.isNaN(Number(value))) {
      state.set(key, Number(value));
    } else {
      state.set(key, value);
    }
  }

  return state;
}
