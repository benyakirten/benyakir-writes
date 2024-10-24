import { beforeEach, describe, expect, it } from "vitest";

import {
  createChoiceSet,
  isDateFilter,
  isKeywordFilter,
  isSearchFilter,
  createAddDateFilterFn,
  createAddKeywordFilterFn,
  createAddSearchFilterFn,
} from "@/utils/filter";
import { ItemFilter } from "@/types/filters";
import { getQueryParams } from "../queries";

beforeEach(() => {
  window.history.pushState({}, "", "/");
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

// describe("createAddDateFilterFn", () => {
//   it("should return a function that adds the date formatted to m-d-y ", () => {
//     const startDate = new Date(0);
//     startDate.setFullYear(2023, 0, 1);
//     startDate.setHours(0, 0, 0, 0);
//     const endDate = new Date(0);
//     endDate.setFullYear(2023, 11, 31);
//     endDate.setHours(0, 0, 0, 0);
//     const fn = createAddDateFilterFn(startDate, endDate);
//     fn();

//     const got = getQueryParams();
//     expect(got.get("date_start")).toBe("01/01/2023");
//     expect(got.get("date_end")).toBe("12/31/2023");
//   });
// });

// describe("createAddKeywordFilterFn", () => {
//   it("should return a function that adds the keyword to the query", () => {
//     const fn = createAddKeywordFilterFn("keyword");
//     fn();

//     const got = getQueryParams();
//     expect(got.get("keyword")).toBe("");
//     expect(got.get("keyword_type")).toBe("all");
//   });
// });

// describe("createAdd")
