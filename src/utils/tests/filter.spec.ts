import { beforeEach, describe, expect, it } from "vitest";

import {
  addDateFilter,
  addKeywordFilter,
  addSearchFilter,
  convertQueryParamToDate,
  createChoiceSet,
  createFilterByDateFn,
  createFilterByKeywordFn,
  createFilterBySearchFn,
  getHighestSearchId,
  getQueryParamState,
  getPageNumberFromQuery,
  isDateFilter,
  isKeywordFilter,
  isSearchFilter,
  getDateFilterFromQuery,
  getSearchFilterFromQuery,
  getKeywordFilterFromQuery,
  getTypeForFilterFromQuery,
  parseFiltersFromQueryParameters,
} from "@/utils/filter";
import {
  DateFilter,
  ItemFilter,
  KeywordFilter,
  SearchFilter,
} from "@/types/filters";
import { getQueryParams } from "../queries";

beforeEach(() => {
  window.history.pushState({}, "", "/");
});

const startDate = new Date(0);
startDate.setFullYear(2023, 0, 1);
startDate.setHours(0, 0, 0, 0);
const endDate = new Date(0);
endDate.setFullYear(2023, 11, 31);
endDate.setHours(0, 0, 0, 0);

describe("createChoiceSet", () => {
  it("should return only unique objects", () => {
    const items = [
      { name: ["John"], something: "Value" },
      { name: ["Doe"], something: "Value2" },
      { name: ["John"], something: "Value3" },
    ];
    const got = createChoiceSet(items, "name");
    expect(got).toHaveLength(2);
    expect(got).toEqual([
      { label: "John", value: "John" },
      { label: "Doe", value: "Doe" },
    ]);
  });
});

describe("createChoiceSet", () => {
  it("should return only unique objects", () => {
    const items = [
      { name: ["John"], something: "Value" },
      { name: ["Doe"], something: "Value2" },
      { name: ["John"], something: "Value3" },
    ];
    const got = createChoiceSet(items, "name");
    expect(got).toHaveLength(2);
    expect(got).toEqual([
      { label: "John", value: "John" },
      { label: "Doe", value: "Doe" },
    ]);
  });
});

describe("filter type tests", () => {
  const dateFilter: ItemFilter = {
    start: new Date(),
    end: new Date(),
    id: "date",
    label: "Date",
  };
  const searchFilter: ItemFilter = {
    search: ["test"],
    id: "search",
    label: "Search",
    type: "all",
  };
  const keywordFilter: ItemFilter = {
    currentKeywords: [{ value: "test", label: "test" }],
    id: "keyword",
    label: "Keyword",
    type: "any",
    allKeywords: [{ value: "test", label: "test" }],
  };

  describe("isDateFilter", () => {
    it("should return true for DateFilter", () => {
      expect(isDateFilter(dateFilter)).toBe(true);
    });

    it("should return false for non-DateFilter", () => {
      expect(isDateFilter(searchFilter)).toBe(false);
      expect(isDateFilter(keywordFilter)).toBe(false);
    });
  });

  describe("isSearchFilter", () => {
    it("should return true for SearchFilter", () => {
      expect(isSearchFilter(searchFilter)).toBe(true);
    });

    it("should return false for non-SearchFilter", () => {
      expect(isSearchFilter(dateFilter)).toBe(false);
      expect(isSearchFilter(keywordFilter)).toBe(false);
    });
  });

  describe("isKeywordFilter", () => {
    it("should return true for KeywordFilter", () => {
      expect(isKeywordFilter(keywordFilter)).toBe(true);
    });

    it("should return false for non-KeywordFilter", () => {
      expect(isKeywordFilter(dateFilter)).toBe(false);
      expect(isKeywordFilter(searchFilter)).toBe(false);
    });
  });
});

describe("addDateFilter", () => {
  it("should return a function that adds the date formatted to m-d-y ", () => {
    addDateFilter(startDate, endDate);

    const got = getQueryParams();
    expect(got.get("date_start")).toBe("01/01/2023");
    expect(got.get("date_end")).toBe("12/31/2023");
  });
});

describe("addKeywordFilter", () => {
  it("should add the keyword filter param with an empty string and a type of all to  the query params", () => {
    addKeywordFilter("keyword");

    const got = getQueryParams();
    expect(got.get("keyword")).toBe("");
    expect(got.get("keyword_type")).toBe("all");
  });
});

describe("addSearchFilter", () => {
  it("should add a search filter param with a value of an empty string and a type of all to the queyr params", () => {
    addSearchFilter();

    const got = getQueryParams();
    expect(got.get("search_1")).toBe("");
    expect(got.get("search_1_type")).toBe("all");
  });

  it("should add the next consecutive number as the search filter based on the highest search filter already in use", () => {
    window.history.pushState({}, "", "?search_1=test&search_1_type=any");

    addSearchFilter();
    const got = getQueryParams();
    expect(got.get("search_2")).toBe("");
    expect(got.get("search_2_type")).toBe("all");
  });

  it("should not try to fill in the gap in sequences if there is one", () => {
    window.history.pushState(
      {},
      "",
      "?search_1=test&search_1_type=any&search_3=test&search_3_type=any"
    );

    addSearchFilter();
    const got = getQueryParams();
    expect(got.get("search_4")).toBe("");
    expect(got.get("search_4_type")).toBe("all");
  });
});

describe("createFilterBySearchFn", () => {
  const items = [
    { name: "John Doe" },
    { name: "Jane Doe" },
    { name: "Alice Johnson" },
    { name: "Bob Smith" },
  ];

  const searchFn = (item: { name: string }, word: string) =>
    item.name.includes(word);

  it("should return all items if search filter is empty", () => {
    const filter: SearchFilter = {
      search: [""],
      id: "search",
      label: "Search",
      type: "all",
    };
    const filterBySearch = createFilterBySearchFn(searchFn);
    const got = filterBySearch(filter, items);
    expect(got).toEqual(items);
  });

  it("should return items that match all search terms when type is 'all'", () => {
    const filter: SearchFilter = {
      search: ["Doe, John"],
      id: "search",
      label: "Search",
      type: "all",
    };
    const filterBySearch = createFilterBySearchFn(searchFn);
    const got = filterBySearch(filter, items);
    expect(got).toEqual([{ name: "John Doe" }]);
  });

  it("should return items that match any search term when type is 'any'", () => {
    const filter: SearchFilter = {
      search: ["Doe, Smith"],
      id: "search",
      label: "Search",
      type: "any",
    };
    const filterBySearch = createFilterBySearchFn(searchFn);
    const got = filterBySearch(filter, items);
    expect(got).toEqual([
      { name: "John Doe" },
      { name: "Jane Doe" },
      { name: "Bob Smith" },
    ]);
  });

  it("should filter the same way regardless of if the separator is a comma, a space or a comma and a space", () => {
    const filter1: SearchFilter = {
      search: ["Doe, Smith"],
      id: "search",
      label: "Search",
      type: "any",
    };

    const filter2: SearchFilter = {
      search: ["Doe,Smith"],
      id: "search",
      label: "Search",
      type: "any",
    };

    const filter3: SearchFilter = {
      search: ["Doe Smith"],
      id: "search",
      label: "Search",
      type: "any",
    };

    const filterBySearch = createFilterBySearchFn(searchFn);
    const got1 = filterBySearch(filter1, items);
    const got2 = filterBySearch(filter2, items);
    const got3 = filterBySearch(filter3, items);
    expect(got1).toEqual(got2);
    expect(got2).toEqual(got3);
  });

  it("should return an empty array if no items match the search terms", () => {
    const filter: SearchFilter = {
      search: ["Nonexistent"],
      id: "search",
      label: "Search",
      type: "all",
    };
    const filterBySearch = createFilterBySearchFn(searchFn);
    const got = filterBySearch(filter, items);
    expect(got).toEqual([]);
  });
});

describe("createFilterByKeywordFn", () => {
  const items = [
    { id: 1, keywords: ["test", "example"] },
    { id: 2, keywords: ["sample", "demo"] },
    { id: 3, keywords: ["test", "demo"] },
    { id: 4, keywords: ["example", "sample"] },
  ];

  const getChoiceFn = (item: { keywords: string[] }, id: string) =>
    item.keywords;

  it("should return all items if currentKeywords is empty", () => {
    const filter: KeywordFilter = {
      currentKeywords: [],
      id: "keywords",
      label: "Keywords",
      type: "any",
      allKeywords: [],
    };
    const filterByKeyword = createFilterByKeywordFn(getChoiceFn);
    const got = filterByKeyword(filter, items);
    expect(got).toEqual(items);
  });

  it("should should return only items that have all of the keyword if the type is all", () => {
    const filter: KeywordFilter = {
      currentKeywords: [{ value: "nonexistent", label: "nonexistent" }],
      id: "keywords",
      label: "Keywords",
      type: "any",
      allKeywords: [],
    };
    const filterByKeyword = createFilterByKeywordFn(getChoiceFn);
    const got = filterByKeyword(filter, items);
    expect(got).toEqual([]);
  });

  it("should return all items that have at least one matching keyword if the type is all", () => {
    const filter: KeywordFilter = {
      currentKeywords: [
        { value: "test", label: "test" },
        { value: "demo", label: "demo" },
      ],
      id: "keywords",
      label: "Keywords",
      type: "any",
      allKeywords: [],
    };
    const filterByKeyword = createFilterByKeywordFn(getChoiceFn);
    const got = filterByKeyword(filter, items);
    expect(got).toEqual([
      { id: 1, keywords: ["test", "example"] },
      { id: 2, keywords: ["sample", "demo"] },
      { id: 3, keywords: ["test", "demo"] },
    ]);
  });

  it("should handle multiple keywords correctly when type is 'all'", () => {
    const filter: KeywordFilter = {
      currentKeywords: [
        { value: "example", label: "example" },
        { value: "sample", label: "sample" },
      ],
      id: "keywords",
      label: "Keywords",
      type: "all",
      allKeywords: [],
    };
    const filterByKeyword = createFilterByKeywordFn(getChoiceFn);
    const got = filterByKeyword(filter, items);
    expect(got).toEqual([{ id: 4, keywords: ["example", "sample"] }]);
  });
});

describe("createFilterByDateFn", () => {
  const items = [
    { id: 1, date: new Date(2023, 0, 1) },
    { id: 2, date: new Date(2023, 5, 15) },
    { id: 3, date: new Date(2023, 11, 31) },
    { id: 4, date: new Date(2022, 11, 31) },
  ];

  const getDateFn = (item: { date: Date }) => item.date;

  it("should return items within the date range", () => {
    const filter: DateFilter = {
      start: new Date(2023, 0, 1),
      end: new Date(2023, 11, 31),
      id: "date",
      label: "Date",
    };
    const filterByDate = createFilterByDateFn(getDateFn);
    const got = filterByDate(filter, items);
    expect(got).toEqual([
      { id: 1, date: new Date(2023, 0, 1) },
      { id: 2, date: new Date(2023, 5, 15) },
      { id: 3, date: new Date(2023, 11, 31) },
    ]);
  });

  it("should return an empty array if no items match the date range", () => {
    const filter: DateFilter = {
      start: new Date(2024, 0, 1),
      end: new Date(2024, 11, 31),
      id: "date",
      label: "Date",
    };
    const filterByDate = createFilterByDateFn(getDateFn);
    const got = filterByDate(filter, items);
    expect(got).toEqual([]);
  });
});

describe("convertQueryParamToDate", () => {
  it("should convert a valid query param date string to a Date object", () => {
    const rawDate = "03-01-2023";
    const got = convertQueryParamToDate(rawDate);
    const expectedDate = new Date(0);
    expectedDate.setFullYear(2023, 2, 1);
    expectedDate.setHours(0, 0, 0, 0);
    expect(got).toEqual(expectedDate);
  });

  it("should handle single digit month and day correctly", () => {
    const rawDate = "3-1-2023";
    const got = convertQueryParamToDate(rawDate);
    const expectedDate = new Date(0);
    expectedDate.setFullYear(2023, 2, 1);
    expectedDate.setHours(0, 0, 0, 0);
    expect(got).toEqual(expectedDate);
  });

  it("should return an invalid date for an invalid query param date string", () => {
    const rawDate = "invalid-date";
    const got = convertQueryParamToDate(rawDate);
    expect(got.getTime()).toBeNaN();
  });

  it("should return an invalid date for an empty string", () => {
    const rawDate = "";
    const got = convertQueryParamToDate(rawDate);
    expect(got.getTime()).toBeNaN();
  });

  it("should return an invaliddate a date string with missing parts", () => {
    const rawDate = "01-2023";
    const got = convertQueryParamToDate(rawDate);
    expect(got.getTime()).toBeNaN();
  });
});

describe("getHighestSearchId", () => {
  it("should return 0 if there are no search parameters", () => {
    const got = getHighestSearchId();
    expect(got).toBe(0);
  });

  it("should return the highest search id when there are search parameters", () => {
    window.history.pushState(
      {},
      "",
      "?search_1=test&search_2=test&search_3=test"
    );
    const got = getHighestSearchId();
    expect(got).toBe(3);
  });

  it("should ignore non-search parameters", () => {
    window.history.pushState(
      {},
      "",
      "?search_1=test&other_param=test&search_2=test"
    );
    const got = getHighestSearchId();
    expect(got).toBe(2);
  });

  it("should ignore search parameters with invalid ids", () => {
    window.history.pushState(
      {},
      "",
      "?search_1=test&search_invalid=test&search_2=test"
    );
    const got = getHighestSearchId();
    expect(got).toBe(2);
  });

  it("should handle gaps in the sequence of search parameters", () => {
    window.history.pushState(
      {},
      "",
      "?search_1=test&search_3=test&search_5=test"
    );
    const got = getHighestSearchId();
    expect(got).toBe(5);
  });

  it("should return 0 if all search parameters have invalid ids", () => {
    window.history.pushState(
      {},
      "",
      "?search_invalid=test&search_another=test"
    );
    const got = getHighestSearchId();
    expect(got).toBe(0);
  });
});

describe("getQueryParamState", () => {
  it("should return an empty map if there are no query parameters", () => {
    const got = getQueryParamState();
    expect(got.size).toBe(0);
  });

  it("should correctly parse numeric query parameters", () => {
    window.history.pushState({}, "", "?param1=123&param2=456");
    const got = getQueryParamState();
    expect(got.get("param1")).toEqual(["123"]);
    expect(got.get("param2")).toEqual(["456"]);
  });

  it("should correctly parse string array query parameters", () => {
    window.history.pushState({}, "", "?param1=value1,value2&param2=value3");
    const got = getQueryParamState();
    expect(got.get("param1")).toEqual(["value1", "value2"]);
    expect(got.get("param2")).toEqual(["value3"]);
  });

  it("should decode array query parameters correctly", () => {
    window.history.pushState({}, "", "?param1=value%201,value%202");
    const got = getQueryParamState();
    expect(got.get("param1")).toEqual(["value 1", "value 2"]);
  });

  it("should handle recognize everything as a strimg", () => {
    window.history.pushState({}, "", "?param1=123&param2=value1,value2");
    const got = getQueryParamState();
    expect(got.get("param1")).toEqual(["123"]);
    expect(got.get("param2")).toEqual(["value1", "value2"]);
  });

  it("should handle empty query parameters as an empty string", () => {
    window.history.pushState({}, "", "?param1=");
    const got = getQueryParamState();
    expect(got.get("param1")).toEqual([]);
  });
});

describe("getPageNumberFromQuery", () => {
  it("should return 0 if the page parameter is missing", () => {
    const searchParams = new URLSearchParams("");
    const got = getPageNumberFromQuery(searchParams);
    expect(got).toBe(0);
  });

  it("should return 0 if the page parameter is not a number", () => {
    const searchParams = new URLSearchParams("?page=abc");
    const got = getPageNumberFromQuery(searchParams);
    expect(got).toBe(0);
  });

  it("should return 0 if the page parameter is a negative number", () => {
    const searchParams = new URLSearchParams("?page=-1");
    const got = getPageNumberFromQuery(searchParams);
    expect(got).toBe(0);
  });

  it("should return the correct page number minus one if the page parameter is a valid number", () => {
    const searchParams = new URLSearchParams("?page=3");
    const got = getPageNumberFromQuery(searchParams);
    expect(got).toBe(2);
  });

  it("should return 0 if the page parameter is zero", () => {
    const searchParams = new URLSearchParams("?page=0");
    const got = getPageNumberFromQuery(searchParams);
    expect(got).toBe(0);
  });

  it("should handle multiple parameters correctly", () => {
    const searchParams = new URLSearchParams(
      "?param1=value1&page=4&param2=value2"
    );
    const got = getPageNumberFromQuery(searchParams);
    expect(got).toBe(3);
  });
});

describe("getDateFilterFromQuery", () => {
  const startDateDefault = new Date(2023, 0, 1);
  const endDateDefault = new Date(2023, 11, 31);

  it("should return null if both start and end dates are missing", () => {
    const state = new Map<string, string[]>();
    const got = getDateFilterFromQuery(state, startDateDefault, endDateDefault);
    expect(got).toBeNull();
  });

  it("should return the default start and end dates if both are missing in the state", () => {
    const state = new Map<string, string[]>();
    state.set("date_start", []);
    state.set("date_end", []);
    const got = getDateFilterFromQuery(state, startDateDefault, endDateDefault);
    expect(got).toEqual({
      label: "Date",
      id: "date",
      start: startDateDefault,
      end: endDateDefault,
    });
  });

  it("should return the parsed start date and default end date if only start date is present", () => {
    const state = new Map<string, string[]>();
    state.set("date_start", ["01-01-2023"]);
    const got = getDateFilterFromQuery(state, startDateDefault, endDateDefault);
    expect(got).toEqual({
      label: "Date",
      id: "date",
      start: new Date(2023, 0, 1),
      end: endDateDefault,
    });
  });

  it("should return the default start date and parsed end date if only end date is present", () => {
    const state = new Map<string, string[]>();
    state.set("date_end", ["12-31-2023"]);
    const got = getDateFilterFromQuery(state, startDateDefault, endDateDefault);
    expect(got).toEqual({
      label: "Date",
      id: "date",
      start: startDateDefault,
      end: new Date(2023, 11, 31),
    });
  });

  it("should return the parsed start and end dates if both are present", () => {
    const state = new Map<string, string[]>();
    state.set("date_start", ["01-01-2023"]);
    state.set("date_end", ["12-31-2023"]);
    const got = getDateFilterFromQuery(state, startDateDefault, endDateDefault);
    expect(got).toEqual({
      label: "Date",
      id: "date",
      start: new Date(2023, 0, 1),
      end: new Date(2023, 11, 31),
    });
  });

  it("should return the default start date if the parsed start date is invalid", () => {
    const state = new Map<string, string[]>();
    state.set("date_start", ["invalid-date"]);
    const got = getDateFilterFromQuery(state, startDateDefault, endDateDefault);
    expect(got).toEqual({
      label: "Date",
      id: "date",
      start: startDateDefault,
      end: endDateDefault,
    });
  });

  it("should return the default end date if the parsed end date is invalid", () => {
    const state = new Map<string, string[]>();
    state.set("date_end", ["invalid-date"]);
    const got = getDateFilterFromQuery(state, startDateDefault, endDateDefault);
    expect(got).toEqual({
      label: "Date",
      id: "date",
      start: startDateDefault,
      end: endDateDefault,
    });
  });
});

describe("getSearchFilterFromQuery", () => {
  it("should return an empty array if there are no search filters in the state", () => {
    const state = new Map<string, string[]>();
    const got = getSearchFilterFromQuery(state);
    expect(got).toEqual([]);
  });

  it("should return search filters from the state", () => {
    const state = new Map<string, string[]>();
    state.set("search_1", ["test"]);
    state.set("search_1_type", ["all"]);
    state.set("search_2", ["example"]);
    state.set("search_2_type", ["any"]);

    const got = getSearchFilterFromQuery(state);
    expect(got).toEqual([
      {
        label: "Search",
        id: "search_1",
        search: ["test"],
        type: "all",
      },
      {
        label: "Search",
        id: "search_2",
        search: ["example"],
        type: "any",
      },
    ]);
  });

  it("should ignore non-search filters in the state", () => {
    const state = new Map<string, string[]>();
    state.set("search_1", ["test"]);
    state.set("search_1_type", ["all"]);
    state.set("other_param", ["value"]);

    const got = getSearchFilterFromQuery(state);
    expect(got).toEqual([
      {
        label: "Search",
        id: "search_1",
        search: ["test"],
        type: "all",
      },
    ]);
  });

  it("should filter out empty search values", () => {
    const state = new Map<string, string[]>();
    state.set("search_1", ["", "test"]);
    state.set("search_1_type", ["all"]);

    const got = getSearchFilterFromQuery(state);
    expect(got).toEqual([
      {
        label: "Search",
        id: "search_1",
        search: ["test"],
        type: "all",
      },
    ]);
  });

  it("should handle multiple search filters correctly", () => {
    const state = new Map<string, string[]>();
    state.set("search_1", ["test1"]);
    state.set("search_1_type", ["all"]);
    state.set("search_2", ["test2"]);
    state.set("search_2_type", ["any"]);
    state.set("search_3", ["test3"]);
    state.set("search_3_type", ["all"]);

    const got = getSearchFilterFromQuery(state);
    expect(got).toEqual([
      {
        label: "Search",
        id: "search_1",
        search: ["test1"],
        type: "all",
      },
      {
        label: "Search",
        id: "search_2",
        search: ["test2"],
        type: "any",
      },
      {
        label: "Search",
        id: "search_3",
        search: ["test3"],
        type: "all",
      },
    ]);
  });
});
describe("getKeywordFilterFromQuery", () => {
  const allKeywords = [
    { value: "test", label: "test" },
    { value: "example", label: "example" },
  ];

  it("should return null if the keyword is not present in the state", () => {
    const state = new Map<string, string[]>();
    const got = getKeywordFilterFromQuery("keyword", state, allKeywords);
    expect(got).toBeNull();
  });

  it("should return a KeywordFilter object if the keyword is present and is an array", () => {
    const state = new Map<string, string[]>();
    state.set("keyword", ["test", "example"]);
    state.set("keyword_type", ["any"]);
    const got = getKeywordFilterFromQuery("keyword", state, allKeywords);
    expect(got).toEqual({
      label: "Keyword",
      id: "keyword",
      type: "any",
      currentKeywords: [
        { label: "test", value: "test" },
        { label: "example", value: "example" },
      ],
      allKeywords,
    });
  });

  it("should return a KeywordFilter object with default type if type is not present in the state", () => {
    const state = new Map<string, string[]>();
    state.set("keyword", ["test", "example"]);
    const got = getKeywordFilterFromQuery("keyword", state, allKeywords);
    expect(got).toEqual({
      label: "Keyword",
      id: "keyword",
      type: "all",
      currentKeywords: [
        { label: "test", value: "test" },
        { label: "example", value: "example" },
      ],
      allKeywords,
    });
  });

  it("should return a KeywordFilter object with capitalized label", () => {
    const state = new Map<string, string[]>();
    state.set("keyword", ["test", "example"]);
    state.set("keyword_type", ["any"]);
    const got = getKeywordFilterFromQuery("keyword", state, allKeywords);
    expect(got?.label).toBe("Keyword");
  });

  it("should handle empty keyword array correctly", () => {
    const state = new Map<string, string[]>();
    state.set("keyword", []);
    state.set("keyword_type", ["any"]);
    const got = getKeywordFilterFromQuery("keyword", state, allKeywords);
    expect(got).toEqual({
      label: "Keyword",
      id: "keyword",
      type: "any",
      currentKeywords: [],
      allKeywords,
    });
  });
});

describe("getTypeForFilterFromQuery", () => {
  it("should return 'all' if the type is not present in the state", () => {
    const state = new Map<string, string[]>();
    const got = getTypeForFilterFromQuery("filter_id", state);
    expect(got).toBe("all");
  });

  it("should return 'all' if the type array is empty", () => {
    const state = new Map<string, string[]>();
    state.set("filter_id_type", []);
    const got = getTypeForFilterFromQuery("filter_id", state);
    expect(got).toBe("all");
  });

  it("should return 'all' if the type array contains an invalid type", () => {
    const state = new Map<string, string[]>();
    state.set("filter_id_type", ["invalid"]);
    const got = getTypeForFilterFromQuery("filter_id", state);
    expect(got).toBe("all");
  });

  it("should return 'any' if the type array contains 'any'", () => {
    const state = new Map<string, string[]>();
    state.set("filter_id_type", ["any"]);
    const got = getTypeForFilterFromQuery("filter_id", state);
    expect(got).toBe("any");
  });

  it("should return 'all' if the type array contains multiple types but 'any' is not the first element", () => {
    const state = new Map<string, string[]>();
    state.set("filter_id_type", ["all", "any"]);
    const got = getTypeForFilterFromQuery("filter_id", state);
    expect(got).toBe("all");
  });

  it("should return 'any' if the type array contains multiple types and 'any' is the first element", () => {
    const state = new Map<string, string[]>();
    state.set("filter_id_type", ["any", "all"]);
    const got = getTypeForFilterFromQuery("filter_id", state);
    expect(got).toBe("any");
  });
});

describe("parseFiltersFromQueryParameters", () => {
  const startDate = new Date(2023, 0, 1);
  const endDate = new Date(2023, 11, 31);
  const keywordFilterDetails = [
    {
      id: "keyword1",
      allKeywords: [
        { value: "test1", label: "test1" },
        { value: "example1", label: "example1" },
      ],
    },
    {
      id: "keyword2",
      allKeywords: [
        { value: "test2", label: "test2" },
        { value: "example2", label: "example2" },
      ],
    },
  ];

  it("should return an empty array if there are no filters in the query parameters", () => {
    const got = parseFiltersFromQueryParameters(
      startDate,
      endDate,
      keywordFilterDetails
    );
    expect(got).toEqual([]);
  });

  it("should return date filter if date parameters are present", () => {
    window.history.pushState(
      {},
      "",
      "?date_start=01-01-2023&date_end=12-31-2023"
    );
    const got = parseFiltersFromQueryParameters(
      startDate,
      endDate,
      keywordFilterDetails
    );
    expect(got).toEqual([
      {
        label: "Date",
        id: "date",
        start: new Date(2023, 0, 1),
        end: new Date(2023, 11, 31),
      },
    ]);
  });

  it("should return search filters if search parameters are present", () => {
    window.history.pushState({}, "", "?search_1=test&search_1_type=all");
    const got = parseFiltersFromQueryParameters(
      startDate,
      endDate,
      keywordFilterDetails
    );
    expect(got).toEqual([
      {
        label: "Search",
        id: "search_1",
        search: ["test"],
        type: "all",
      },
    ]);
  });

  it("should return keyword filters if keyword parameters are present", () => {
    window.history.pushState(
      {},
      "",
      "?keyword1=test1,example1&keyword1_type=any"
    );
    const got = parseFiltersFromQueryParameters(
      startDate,
      endDate,
      keywordFilterDetails
    );
    expect(got).toEqual([
      {
        label: "Keyword1",
        id: "keyword1",
        type: "any",
        currentKeywords: [
          { label: "test1", value: "test1" },
          { label: "example1", value: "example1" },
        ],
        allKeywords: [
          { value: "test1", label: "test1" },
          { value: "example1", label: "example1" },
        ],
      },
    ]);
  });

  it("should return all filters if multiple parameters are present", () => {
    window.history.pushState(
      {},
      "",
      "?date_start=01-01-2023&date_end=12-31-2023&search_1=test&search_1_type=all&keyword1=test1,example1&keyword1_type=any"
    );
    const got = parseFiltersFromQueryParameters(
      startDate,
      endDate,
      keywordFilterDetails
    );
    expect(got).toEqual([
      {
        label: "Date",
        id: "date",
        start: new Date(2023, 0, 1),
        end: new Date(2023, 11, 31),
      },
      {
        label: "Search",
        id: "search_1",
        search: ["test"],
        type: "all",
      },
      {
        label: "Keyword1",
        id: "keyword1",
        type: "any",
        currentKeywords: [
          { label: "test1", value: "test1" },
          { label: "example1", value: "example1" },
        ],
        allKeywords: [
          { value: "test1", label: "test1" },
          { value: "example1", label: "example1" },
        ],
      },
    ]);
  });

  it("should handle invalid date parameters with the default values", () => {
    window.history.pushState(
      {},
      "",
      "?date_start=invalid-date&date_end=12-31-2023"
    );
    const got = parseFiltersFromQueryParameters(
      startDate,
      endDate,
      keywordFilterDetails
    );
    expect(got).toEqual([
      {
        label: "Date",
        id: "date",
        start: startDate,
        end: new Date(2023, 11, 31),
      },
    ]);
  });

  it("should handle empty keyword parameters with an empty array", () => {
    window.history.pushState({}, "", "?keyword1=&keyword1_type=any");
    const got = parseFiltersFromQueryParameters(
      startDate,
      endDate,
      keywordFilterDetails
    );
    expect(got).toEqual([
      {
        label: "Keyword1",
        id: "keyword1",
        type: "any",
        currentKeywords: [],
        allKeywords: [
          { value: "test1", label: "test1" },
          { value: "example1", label: "example1" },
        ],
      },
    ]);
  });
});
