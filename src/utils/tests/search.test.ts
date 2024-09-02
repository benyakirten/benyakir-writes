import { beforeEach, describe, expect, it } from "vitest";

import { Trie } from "../search";

describe("Trie", () => {
	let trie: Trie;

	describe("insert", () => {
		beforeEach(() => {
			trie = new Trie();
		});

		it("should add the word with the weight to the trie", () => {
			trie.insert("apples", 5);
			trie.insert("apply", 4);
			trie.insert("banana", 3);

			expect(trie.words).toEqual(["apples", "apply", "banana"]);
			expect(trie.suggest("apple")).toEqual([
				{
					word: "apples",
					weight: 5,
				},
			]);
		});
	});

	describe("suggest", () => {
		beforeEach(() => {
			trie = new Trie([
				["apples", 5],
				["apply", 4],
				["banana", 3],
			]);
		});

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
