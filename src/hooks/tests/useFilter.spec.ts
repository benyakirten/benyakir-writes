import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { KeywordFilterDetails } from "@/types/filters";
import { setQueryParams } from "@/utils/queries";
import useFilter from "../useFilter.hook";

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

  const filterByDate = vi.fn();
  const filterByKeywords = vi.fn();
  const filterBySearch = vi.fn();

  const allKeywords = [
    { label: "keyword1", value: "keyword1" },
    { label: "keyword2", value: "keyword2" },
    { label: "keyword3", value: "keyword3" },
  ];
  const keywordFilterDetails: KeywordFilterDetails[] = [
    {
      id: "keyword",
      allKeywords,
    },
  ];

  beforeEach(() => {
    filterByDate.mockClear();
    filterByKeywords.mockClear();
    filterBySearch.mockClear();
    window.history.pushState("", "", "/");
  });

  function getQueryParams() {
    return new URLSearchParams(window.location.search);
  }

  describe("createFilter", () => {
    it("should alter the query params, filter based on them and assign a page", () => {
      const filterResults = renderHook(() =>
        useFilter(
          items,
          startDate,
          endDate,
          keywordFilterDetails,
          filterByDate,
          filterByKeywords,
          filterBySearch
        )
      ).result.current;

      filterByDate.mockReturnValue(items);
      filterByKeywords.mockReturnValue(items);
      filterBySearch.mockReturnValue(items);

      act(() => {
        filterResults.createFilter("date");
        filterResults.createFilter("keyword");
        filterResults.createFilter("search");
      });

      const queryParams = getQueryParams();

      expect(queryParams.get("date_start")).toBe("01/01/2023");
      expect(queryParams.get("date_end")).toBe("12/31/2023");
      expect(filterByDate).toHaveBeenCalledTimes(3);
      expect(filterByDate).toHaveBeenCalledWith(
        { end: endDate, start: startDate, id: "date", label: "Date" },
        items
      );

      expect([...queryParams.keys()]).toContain("keyword");
      expect(queryParams.get("keyword_type")).toEqual("all");
      expect(filterByKeywords).toHaveBeenCalledTimes(2);
      expect(filterByKeywords).toHaveBeenCalledWith(
        {
          id: "keyword",
          label: "Keyword",
          currentKeywords: [],
          allKeywords,
          type: "all",
        },
        items
      );

      expect([...queryParams.keys()]).toContain("search_1");
      expect(queryParams.get("search_1_type")).toEqual("all");
      expect(filterBySearch).toHaveBeenCalledOnce();
      expect(filterBySearch).toHaveBeenCalledWith(
        {
          id: "search_1",
          label: "Search",
          search: [],
          type: "all",
        },
        items
      );
    });
  });

  it("should filter the items on initialization by the preexisting query params", () => {
    filterByDate.mockReturnValue(items);
    filterByKeywords.mockReturnValue(items);
    filterBySearch.mockReturnValue(items);

    window.history.pushState(
      "",
      "",
      "?date_start=01-01-2023&date_end=12-31-2023&keyword=keyword1%2Ckeyword2&search_1=search%20term"
    );
    const filterResults = renderHook(() =>
      useFilter(
        items,
        startDate,
        endDate,
        keywordFilterDetails,
        filterByDate,
        filterByKeywords,
        filterBySearch
      )
    ).result.current;

    const queryParams = getQueryParams();

    expect(queryParams.get("date_start")).toBe("01-01-2023");
    expect(queryParams.get("date_end")).toBe("12-31-2023");
    expect(filterByDate).toHaveBeenCalledOnce();
    expect(filterByDate).toHaveBeenCalledWith(
      { end: endDate, start: startDate, id: "date", label: "Date" },
      items
    );

    expect(queryParams.get("keyword")).toBe("keyword1,keyword2");
    expect(filterByKeywords).toHaveBeenCalledOnce();
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

    expect(queryParams.get("search_1")).toBe("search term");
    expect(filterBySearch).toHaveBeenCalledOnce();
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
