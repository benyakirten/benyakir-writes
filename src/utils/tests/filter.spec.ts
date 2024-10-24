import { beforeEach, describe, expect, it } from "vitest";

import {
  addDateFilter,
  addKeywordFilter,
  addSearchFilter,
  createChoiceSet,
  createFilterBySearchFn,
  isDateFilter,
  isKeywordFilter,
  isSearchFilter,
} from "@/utils/filter";
import { ItemFilter, SearchFilter } from "@/types/filters";
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

describe("is filter type tests", () => {
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
});
