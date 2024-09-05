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

	describe("getRandomSuggestions", () => {
		it("should return a random selection of items from the trie if the number of options is greater than the minimum amount", () => {
			const alphabet = "abcdefghijklmnopqrstuvwxyz";
			const trieOptions: [string, number][] = alphabet
				.split("")
				.map((char, index) => [char, index + 1]);
			const trie = new Trie(trieOptions);

			const suggestions = trie.getRandomSuggestions();
			expect(suggestions).toHaveLength(5);

			for (const suggestion of suggestions) {
				expect(alphabet).toContain(suggestion);
			}
		});

		it("should return all possible suggestions if the number of options is <= the minimum amount", () => {
			const trie = new Trie([
				["apples", 5],
				["apply", 4],
				["banana", 3],
				["cherry", 2],
			]);

			const suggestions = trie.getRandomSuggestions();

			expect(suggestions).toHaveLength(4);
			expect(suggestions).toContain("apples");
			expect(suggestions).toContain("apply");
			expect(suggestions).toContain("banana");
			expect(suggestions).toContain("cherry");
		});

		it("should return an empty array when there are no words in the trie", () => {
			const trie = new Trie();

			const suggestions = trie.getRandomSuggestions();

			expect(suggestions).toHaveLength(0);
		});
	});

	describe("getLevenshteinDistance", () => {
		beforeEach(() => {
			trie = new Trie([
				["apples", 5],
				["apply", 4],
				["banana", 3],
			]);
		});

		it("should return the correct Levenshtein distance between two strings", () => {
			const trie = new Trie();
			expect(trie.getLevenshteinDistance("kitten", "sitting")).toBe(3);
			expect(trie.getLevenshteinDistance("book", "back")).toBe(2);
			expect(trie.getLevenshteinDistance("hello", "world")).toBe(4);
			expect(trie.getLevenshteinDistance("abc", "def")).toBe(3);
			expect(trie.getLevenshteinDistance("abc", "abc")).toBe(0);
			expect(trie.getLevenshteinDistance("abc", "abcdef")).toBe(3);
			expect(trie.getLevenshteinDistance("abcd", "abc")).toBe(1);
		});

		it("should return 0 when both strings are empty", () => {
			const trie = new Trie();
			expect(trie.getLevenshteinDistance("", "")).toBe(0);
		});

		it("should return the length of the non-empty string when the other string is empty", () => {
			const trie = new Trie();
			expect(trie.getLevenshteinDistance("hello", "")).toBe(5);
			expect(trie.getLevenshteinDistance("abc", "")).toBe(3);
		});

		it("should return the length of the non-empty string when the other string is empty", () => {
			const trie = new Trie();
			expect(trie.getLevenshteinDistance("", "hello")).toBe(5);
			expect(trie.getLevenshteinDistance("", "abc")).toBe(3);
		});
	});

	describe("getClosestLevenshteinSuggestions", () => {
		beforeEach(() => {
			trie = new Trie([
				["apples", 5],
				["apply", 4],
				["banana", 3],
				["cherry", 2],
				["orange", 1],
				["grape", 1],
				["kiwi", 1],
			]);
		});

		it("should return the closest Levenshtein suggestions based on the prefix up to the specified amount", () => {
			expect(trie.getClosestLevenshteinSuggestions("ap")).toEqual([
				"apply",
				"grape",
				"apples",
				"kiwi",
				"banana",
			]);
		});

		it("should return suggestions even when there are no similar values", () => {
			expect(trie.getClosestLevenshteinSuggestions("xyz")).toEqual([
				"kiwi",
				"apply",
				"grape",
				"apples",
				"banana",
			]);
			expect(trie.getClosestLevenshteinSuggestions("")).toEqual([
				"kiwi",
				"apply",
				"grape",
				"apples",
				"banana",
			]);
		});
	});
});
