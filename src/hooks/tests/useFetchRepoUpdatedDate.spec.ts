import { renderHook, act } from "@testing-library/react";
import {
	describe,
	it,
	expect,
	vi,
	afterEach,
	beforeAll,
	afterAll,
} from "vitest";
import {
	useFetchRepoUpdatedDate,
	FetchState,
} from "../useFetchRepoUpdatedDate.hook";

describe("useFetchRepoUpdatedDate", () => {
	const fetchSpy = vi.spyOn(global, "fetch");

	afterEach(() => {
		fetchSpy.mockClear();
	});

	it("should return FetchState.NONE when repoLink is not provided", () => {
		const { result } = renderHook(() => useFetchRepoUpdatedDate());

		expect(result.current).toEqual(FetchState.NONE);
		expect(fetchSpy).not.toHaveBeenCalled();
	});

	it("should set the fetch state to loading while fetching", () => {
		let promiseResolve: (value: Response) => void;
		let promiseReject: (value: Error) => void;
		const promise: Promise<Response> = new Promise((resolve, reject) => {
			promiseResolve = resolve;
			promiseReject = reject;
		});
		fetchSpy.mockReturnValue(promise);

		const { result } = renderHook(() => useFetchRepoUpdatedDate("testlink"));
		expect(result.current).toEqual(FetchState.LOADING);
		expect(fetchSpy).toHaveBeenCalledTimes(1);
		expect(fetchSpy).toHaveBeenCalledWith("testlink", {
			signal: new AbortController().signal,
		});
	});

	it("should return FetchState.ERROR when an error occurs during fetching", async () => {
		fetchSpy.mockRejectedValue(new Error("Failed to fetch"));
		const { result } = renderHook(() => useFetchRepoUpdatedDate("testlink"));
		await vi.waitUntil(() => result.current === FetchState.ERROR);
	});

	it("should return the latest update date when fetching is successful and add it to the cache which will be used for subsequent requests", async () => {
		const mockResponse = {
			pushed_at: "2022-01-01T00:00:00Z",
		};

		fetchSpy.mockResolvedValue({
			ok: true,
			json: vi.fn().mockResolvedValueOnce(mockResponse),
			// biome-ignore lint/suspicious/noExplicitAny: Test
		} as any);

		const { result } = renderHook(() =>
			useFetchRepoUpdatedDate("https://github.com/user/repo"),
		);

		await vi.waitUntil(() => result.current !== FetchState.LOADING);
		expect(result.current).toEqual(new Date(mockResponse.pushed_at));

		expect(fetchSpy).toHaveBeenCalledTimes(1);
		expect(fetchSpy).toHaveBeenCalledWith(
			"https://api.github.com/repos/user/repo",
			{
				signal: new AbortController().signal,
			},
		);

		const { result: result2 } = renderHook(() =>
			useFetchRepoUpdatedDate("https://github.com/user/repo"),
		);
		await vi.waitUntil(() => result2.current !== FetchState.LOADING);
		expect(result2.current).toEqual(new Date(mockResponse.pushed_at));

		expect(fetchSpy).toHaveBeenCalledTimes(1);
	});
});
