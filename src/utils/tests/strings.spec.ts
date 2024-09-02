import { describe, expect, it, test } from "vitest";

import {
	camelToTitleCase,
	capitalize,
	multiplyCSSNumber,
	titleCase,
	titleToKebab,
	truncate,
} from "../strings";

describe("titleToKebab", () => {
	test.for<{ title: string; kebab: string }>([
		{ title: "title", kebab: "title" },
		{ title: "Title Two", kebab: "title-two" },
		{
			title: "Bob's BIG BURGER's big STAND's burger craze",
			kebab: "bobs-big-burgers-big-stands-burger-craze",
		},
		{
			title:
				"Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
			kebab:
				"dr-strangelove-or-how-i-learned-to-stop-worrying-and-love-the-bomb",
		},
		{ title: "tIItle  three", kebab: "tiitle-three" },
		{ title: "tIItle        four", kebab: "tiitle-four" },
		{ title: "     tIItle  five    ", kebab: "tiitle-five" },
	])("should convert $title to $kebab", ({ title, kebab }) => {
		expect(titleToKebab(title)).toEqual(kebab);
	});

	test.for<{ input: string }>([
		{ input: "      " },
		{ input: "'''''" },
		{ input: "     '   '    ' " },
		{ input: ":  ! @ #  ***" },
	])("should throw for input $input", ({ input }) => {
		expect(() => titleToKebab(input)).toThrow();
	});
});

describe("truncate", () => {
	test.for<{ input: { sentence: string; cutoff: number }; result: string }>([
		{
			input: { sentence: "a long sentence that goes on and on", cutoff: 18 },
			result: "a long sentence...",
		},
		{
			input: {
				sentence:
					"An abstract base class serves as the model for the converters",
				cutoff: 14,
			},
			result: "An abstract...",
		},
		{ input: { sentence: "a bb ccc dddd", cutoff: 5 }, result: "a bb..." },
	])("should give known results for known inputs", ({ input, result }) => {
		expect(truncate(input.sentence, input.cutoff)).toEqual(result);
	});

	test.for<{ sentence: string; cutoff: number }>([
		{ sentence: "abcdef", cutoff: 6 },
		{ sentence: "abc defg", cutoff: 8 },
		{ sentence: "a b c d", cutoff: 200 },
	])(
		"should return the same sentence if the cutoff is >= the sentence length",
		({ sentence, cutoff }) => {
			expect(truncate(sentence, cutoff)).toEqual(sentence);
		},
	);

	test.for<{ input: string }>([
		{ input: "               e" },
		{ input: "               " },
	])("should throw for an input of $input", ({ input }) => {
		expect(() => truncate(input, 8)).toThrow();
	});
});

describe("multiplyCSSNumber", () => {
	test.for<{ input: string; result: string }>([
		{ input: "10rem", result: "15rem" },
		{ input: "1.5%", result: "2.3%" },
		{ input: "11.8px", result: "17.7px" },
	])("should give known results for known inputs", ({ input, result }) => {
		expect(multiplyCSSNumber(input, 1.5)).toEqual(result);
	});

	test.for<{ input: string }>([{ input: "badstring" }, { input: "rem10" }])(
		"should return the prop if it doesn't match the regex",
		({ input }) => {
			expect(multiplyCSSNumber(input, 1)).toEqual(input);
		},
	);
});

describe("capitalize", () => {
	test.for<{ input: string; result: string }>([
		{ input: "hello", result: "Hello" },
		{ input: "  hi", result: "  hi" },
		{ input: "hi  ", result: "Hi  " },
	])(
		"should return the first letter of a string capitalized",
		({ input, result }) => {
			expect(capitalize(input)).toEqual(result);
		},
	);
});

describe("titleCase", () => {
	test.for<{ input: string; result: string }>([
		{ input: "hello there", result: "Hello There" },
		{ input: "  hi", result: "  Hi" },
		{ input: "hi  you", result: "Hi  You" },
	])(
		"should capitalize the first word in every word if given a string of space separated words",
		({ input, result }) => {
			expect(titleCase(input)).toEqual(result);
		},
	);

	test.for<{ input: string[]; result: string }>([
		{ input: ["hello", "there"], result: "Hello There" },
		{ input: ["", "", "hi"], result: "  Hi" },
		{ input: ["hi", "", "", "you"], result: "Hi   You" },
	])(
		"should capitalize the first word in every word if given an array of strings",
		({ input, result }) => {
			expect(titleCase(input)).toEqual(result);
		},
	);
});

describe("camelToTitleCase", () => {
	test.for<{ camel: string; otherSections: string[]; result: string }>([
		{ camel: "helloWorld", otherSections: [], result: "Hello World" },
		{
			camel: "helloWorld",
			otherSections: ["greetings"],
			result: "Greetings Hello World",
		},
		{
			camel: "helloWorldHowAreYou",
			otherSections: [],
			result: "Hello World How Are You",
		},
		{
			camel: "helloWorldHowAreYou",
			otherSections: ["greetings", "question"],
			result: "Greetings Question Hello World How Are You",
		},
	])(
		"should convert $camel with additions $otherSections to $result case",
		({ camel, otherSections, result }) => {
			const got = camelToTitleCase(camel, otherSections);
			expect(got).toEqual(result);
		},
	);
});
