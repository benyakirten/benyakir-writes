import { describe, it, expect, vi, beforeEach } from "vitest";
import { getQueryParams, setOneQueryParam } from "../queries";

beforeEach(() => {
  window.history.pushState({}, "", "/");
});

describe("getQueryParams", () => {
  it("should return URLSearchParams object with correct query parameters", () => {
    window.history.pushState({}, "", "/?param1=value1&param2=value2");

    const params = getQueryParams();
    expect(params.get("param1")).toBe("value1");
    expect(params.get("param2")).toBe("value2");
  });

  it("should return an empty URLSearchParams object when there are no query parameters", () => {
    const params = getQueryParams();
    expect(params.size).toEqual(0);
  });
});

describe("setOneQueryParam", () => {
  it("should set a single query parameter", () => {
    setOneQueryParam("param1", "value1");
    const params = getQueryParams();
    expect(params.get("param1")).toBe("value1");
  });

  it("should append to existing query parameters", () => {
    window.history.pushState({}, "", "/?param1=value1");
    setOneQueryParam("param2", "value2");
    const params = getQueryParams();
    expect(params.get("param1")).toBe("value1");
    expect(params.get("param2")).toBe("value2");
  });

  it("should handle array values correctly", () => {
    setOneQueryParam("param1", ["value1", "value2"]);
    const params = getQueryParams();
    expect(params.get("param1")).toBe("value1,value2");
  });

  it("should handle numeric values correctly", () => {
    setOneQueryParam("param1", 123);
    const params = getQueryParams();
    expect(params.get("param1")).toBe("123");
  });
});
