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
  isDateFilter,
  isKeywordFilter,
  isSearchFilter,
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
    expect(got.get("param1")).toBe(123);
    expect(got.get("param2")).toBe(456);
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

  it("should handle mixed numeric and string array query parameters", () => {
    window.history.pushState({}, "", "?param1=123&param2=value1,value2");
    const got = getQueryParamState();
    expect(got.get("param1")).toBe(123);
    expect(got.get("param2")).toEqual(["value1", "value2"]);
  });

  it("should handle empty query parameters as an empty string", () => {
    window.history.pushState({}, "", "?param1=");
    const got = getQueryParamState();
    expect(got.get("param1")).toEqual([]);
  });
});
