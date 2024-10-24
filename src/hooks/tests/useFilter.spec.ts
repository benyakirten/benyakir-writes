import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";

import useFilter from "../useFilter.hook";
import { CreateFilterOption, KeywordFilterDetails } from "@/types/filters";
import { setQueryParams } from "@/utils/queries";

describe("useFilter", () => {
  const items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    { id: 4, name: "Item 4" },
    { id: 5, name: "Item 5" },
    { id: 6, name: "Item 6" },
    { id: 7, name: "Item 7" },
    { id: 8, name: "Item 8" },
    { id: 9, name: "Item 9" },
    { id: 10, name: "Item 10" },
    { id: 11, name: "Item 11" },
    { id: 12, name: "Item 12" },
  ];

  const startDate = new Date(0);
  startDate.setFullYear(2023, 0, 1);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(0);
  endDate.setFullYear(2023, 11, 31);
  endDate.setHours(0, 0, 0, 0);

  const createDateFiter = vi.fn();
  const createKeywordFilter = vi.fn();
  const createSearchFilter = vi.fn();
  const filterByDate = vi.fn();
  const filterByKeywords = vi.fn();
  const filterBySearch = vi.fn();

  const allKeywords = ["keyword1", "keyword2", "keyword3"];
  const keywordFilterDetails: KeywordFilterDetails[] = [
    {
      id: "keyword",
      allKeywords,
    },
  ];

  const createFilterOptions: CreateFilterOption[] = [
    {
      match: "date",
      fn: createDateFiter,
    },
    {
      match: "keyword",
      fn: createKeywordFilter,
    },
    {
      match: "search",
      fn: createSearchFilter,
    },
  ];

  let filterResults: ReturnType<typeof useFilter>;
  beforeEach(() => {
    filterResults = renderHook(() =>
      useFilter(
        items,
        startDate,
        endDate,
        keywordFilterDetails,
        createFilterOptions,
        filterByDate,
        filterByKeywords,
        filterBySearch
      )
    ).result.current;

    createDateFiter.mockClear();
    createKeywordFilter.mockClear();
    createSearchFilter.mockClear();
    filterByDate.mockClear();
    filterByKeywords.mockClear();
    filterBySearch.mockClear();
  });

  function getQueryParams() {
    return new URLSearchParams(window.location.search);
  }

  describe("createFilter", () => {
    it("should call the function to create a filter based on what matcher was called", () => {
      act(() => {
        filterResults.createFilter("date");
      });
      expect(createDateFiter).toHaveBeenCalledOnce();

      act(() => {
        filterResults.createFilter("keyword");
      });
      expect(createKeywordFilter).toHaveBeenCalledOnce();

      act(() => {
        filterResults.createFilter("search");
      });
      expect(createSearchFilter).toHaveBeenCalledOnce();
    });

    it("should alter the query params, filter based on them and assign a page", () => {
      filterByDate.mockReturnValue(items);
      filterByKeywords.mockReturnValue(items);
      filterBySearch.mockReturnValue(items);

      createDateFiter.mockImplementation(() => {
        setQueryParams({ date_start: "01-01-2023", date_end: "12-31-2023" });
      });
      createKeywordFilter.mockImplementation(() => {
        setQueryParams({ keyword: encodeURIComponent("keyword1,keyword2") });
      });
      createSearchFilter.mockImplementation(() => {
        setQueryParams({ search_1: encodeURIComponent("search term") });
      });

      act(() => {
        filterResults.createFilter("date");
        filterResults.createFilter("keyword");
        filterResults.createFilter("search");
      });

      const queryParams = getQueryParams();

      expect(queryParams.get("date_start")).toBe("01-01-2023");
      expect(queryParams.get("date_end")).toBe("12-31-2023");
      expect(filterByDate).toHaveBeenCalledTimes(3);
      expect(filterByDate).toHaveBeenCalledWith(
        { end: endDate, start: startDate, id: "date", label: "Date" },
        items
      );

      expect(queryParams.get("keyword")).toBe("keyword1%2Ckeyword2");
      expect(filterByKeywords).toHaveBeenCalledTimes(2);
      expect(filterByKeywords).toHaveBeenCalledWith(
        {
          id: "keyword",
          label: "Keyword",
          currentKeywords: [
            { label: "keyword1", value: "keyword1" },
            { label: "keyword2", value: "keyword2" },
          ],
          allKeywords,
          type: "all",
        },
        items
      );

      expect(queryParams.get("search_1")).toBe("search%20term");
      expect(filterBySearch).toHaveBeenCalledTimes(1);
      expect(filterBySearch).toHaveBeenCalledWith(
        {
          id: "search_1",
          label: "Search",
          search: ["search term"],
          type: "all",
        },
        items
      );
    });
  });
});
