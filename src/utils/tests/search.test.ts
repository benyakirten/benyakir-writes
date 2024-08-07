import { describe, beforeEach, it, expect } from "vitest";

import { Trie } from "../search";

describe("Trie", () => {
	let trie: Trie;

	beforeEach(() => {
		trie = new Trie([
			["apples", 5],
			["apply", 4],
			["banana", 3],
		]);
	});

	describe("suggest", () => {
		it("should suggest words based on prefix", () => {
			expect(trie.suggest("a")).toEqual([
				{
					weight: 5,
					word: "apples",
				},
				{
					weight: 4,
					word: "apply",
				},
			]);
			expect(trie.suggest("ap")).toEqual([
				{
					weight: 5,
					word: "apples",
				},
				{
					weight: 4,
					word: "apply",
				},
			]);
			expect(trie.suggest("app")).toEqual([
				{
					weight: 5,
					word: "apples",
				},
				{
					weight: 4,
					word: "apply",
				},
			]);
			expect(trie.suggest("appl")).toEqual([
				{
					weight: 5,
					word: "apples",
				},
				{
					weight: 4,
					word: "apply",
				},
			]);
			expect(trie.suggest("apple")).toEqual([
				{
					weight: 5,
					word: "apples",
				},
			]);
		});

		it("should return null when no suggestions are available", () => {
			expect(trie.suggest("")).toBeNull();
			expect(trie.suggest("x")).toBeNull();
			expect(trie.suggest("xyz")).toBeNull();
			expect(trie.suggest("apples")).toBeNull();
		});
	});
});
