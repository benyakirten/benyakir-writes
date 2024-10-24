import { describe, it, expect, beforeEach } from "vitest";

import {
  deserializeFromQueryParams,
  getQueryParams,
  removeQueryParam,
  serializeToQueryParams,
  setOneQueryParam,
  visitQueryParams,
} from "../queries";

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

  it("should overwrite existing query parameters", () => {
    window.history.pushState({}, "", "/?param1=value1");
    setOneQueryParam("param1", "value2");
    const params = getQueryParams();
    expect(params.get("param1")).toBe("value2");
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

describe("setQueryParams", () => {
  it("should set multiple query parameters", () => {
    setOneQueryParam("param1", "value1");
    setOneQueryParam("param2", "value2");
    setOneQueryParam("param3", "value3");
    const params = getQueryParams();
    expect(params.get("param1")).toBe("value1");
    expect(params.get("param2")).toBe("value2");
    expect(params.get("param3")).toBe("value3");
  });

  it("should overwrite existing query parameters", () => {
    setOneQueryParam("param1", "value1");
    setOneQueryParam("param1", "value2");
    const params = getQueryParams();
    expect(params.get("param1")).toBe("value2");
  });
});

describe("removeQueryParam", () => {
  it("should remove any number of query parameters starting with that key", () => {
    window.history.pushState({}, "", "/?param1=value1&param2=value2");
    removeQueryParam("param");
    const params = getQueryParams();
    expect(params.size).toEqual(0);
  });

  it("should remove all query parameters with the same key", () => {
    window.history.pushState({}, "", "/?param1=value1&param1=value2");
    removeQueryParam("param1");
    const params = getQueryParams();
    expect(params.size).toEqual(0);
  });

  it("should not remove query parameters with a different key", () => {
    window.history.pushState({}, "", "/?param1=value1&param2=value2");
    removeQueryParam("param1");
    const params = getQueryParams();
    expect(params.get("param2")).toBe("value2");
  });

  it("should not remove any query parameters if no matching key is found", () => {
    window.history.pushState({}, "", "/?param1=value1");
    removeQueryParam("param2");
    const params = getQueryParams();
    expect(params.get("param1")).toBe("value1");
  });
});

describe("visitQueryParams", () => {
  it("should update the URL with the given query parameters", () => {
    const params = new URLSearchParams();
    params.set("param1", "value1");
    params.set("param2", "value2");

    visitQueryParams(params);

    expect(window.location.search).toBe("?param1=value1&param2=value2");
  });

  it("should replace the existing query parameters", () => {
    window.history.pushState({}, "", "/?param1=oldValue");

    const params = new URLSearchParams();
    params.set("param1", "newValue");

    visitQueryParams(params);

    expect(window.location.search).toBe("?param1=newValue");
  });

  it("should handle empty query parameters", () => {
    const params = new URLSearchParams();

    visitQueryParams(params);

    expect(window.location.search).toBe("");
  });

  it("should not change the pathname", () => {
    const initialPathname = window.location.pathname;
    const params = new URLSearchParams();
    params.set("param1", "value1");

    visitQueryParams(params);

    expect(window.location.pathname).toBe(initialPathname);
  });
});

describe("serializeToQueryParams", () => {
  it("should serialize an array of strings to a query parameter string", () => {
    const data = ["value1", "value2", "value3"];
    const result = serializeToQueryParams(data);
    expect(result).toBe("value1,value2,value3");
  });

  it("should serialize an array of numbers to a query parameter string", () => {
    const data = [1, 2, 3];
    const result = serializeToQueryParams(data);
    expect(result).toBe("1,2,3");
  });

  it("should handle an empty array", () => {
    const data: string[] = [];
    const result = serializeToQueryParams(data);
    expect(result).toBe("");
  });

  it("should encode special characters", () => {
    const data = ["value1", "value 2", "value&3"];
    const result = serializeToQueryParams(data);
    expect(result).toBe("value1,value%202,value%263");
  });
});

describe("deserializeFromQueryParams", () => {
  it("should deserialize a query parameter string to an array of strings", () => {
    const data = "value1,value2,value3";
    const result = deserializeFromQueryParams(data);
    expect(result).toEqual(["value1", "value2", "value3"]);
  });

  it("should handle an empty query parameter string", () => {
    const data = "";
    const result = deserializeFromQueryParams(data);
    expect(result).toEqual([""]);
  });

  it("should decode special characters", () => {
    const data = "value1,value%202,value%263";
    const result = deserializeFromQueryParams(data);
    expect(result).toEqual(["value1", "value 2", "value&3"]);
  });

  it("should handle a single value", () => {
    const data = "value1";
    const result = deserializeFromQueryParams(data);
    expect(result).toEqual(["value1"]);
  });
});
