import { describe, it, expect, test } from "vitest";

import {
	convertHexToHSL,
	convertHexToRGBA,
	convertHexToRGBNumber,
	convertHexToRGBString,
	convertRGBNumberToHex,
	convertRGBNumberToRGBString,
	convertRGBStringToRGBNumber,
	validateRGBNumbers,
} from "@/utils/colors";

describe("convertHexToRGBA", () => {
	test.for<{ want: string; val: string; op: number }>([
		{
			val: "#000000",
			op: 0.8,
			want: "rgba(0, 0, 0, 0.8)",
		},
		{
			val: "#abcdef",
			op: 0.2,
			want: "rgba(171, 205, 239, 0.2)",
		},
		{
			val: "#000",
			op: 0,
			want: "rgba(0, 0, 0, 0)",
		},
		{
			val: "#000000",
			op: 0,
			want: "rgba(0, 0, 0, 0)",
		},
		{
			want: "rgba(0, 0, 0, 1)",
			val: "#000000",
			op: 1,
		},
	])("should convert $val with opacity $op to $want", ({ val, op, want }) => {
		const got = convertHexToRGBA(val, op);
		expect(got).toEqual(want);
	});

	test.for<{ want: string; val: string; op: number }>([
		{
			val: "#000000",
			op: 0.799,
			want: "rgba(0, 0, 0, 0.8)",
		},
		{
			val: "#abcdef",
			op: 0.249999999,
			want: "rgba(171, 205, 239, 0.25)",
		},

		{
			val: "#000000",
			op: 0.001,
			want: "rgba(0, 0, 0, 0)",
		},
		{
			val: "#000000",
			op: 0.9999,
			want: "rgba(0, 0, 0, 1)",
		},
	])("should convert $val with opacity $op to $want", ({ val, op, want }) => {
		const got = convertHexToRGBA(val, op);
		expect(got).toEqual(want);
	});

	test.for<string>(["#0000000", "#ab", "abcdef", "       "])(
		"should throw an error for '%s'",
		(val) => {
			expect(() => convertHexToRGBA(val)).toThrow();
		},
	);
});

describe("convertHexToRGBString", () => {
	test.for<{ input: string; want: RGBString }>([
		{
			want: {
				red: "ab",
				green: "cd",
				blue: "ef",
			},
			input: "#abcdef",
		},
		{
			want: {
				red: "00",
				green: "00",
				blue: "00",
			},
			input: "#000000",
		},
		{
			want: {
				red: "00",
				green: "00",
				blue: "00",
			},
			input: "#000",
		},
		{
			want: {
				red: "aa",
				green: "bb",
				blue: "cc",
			},
			input: "#abc",
		},
	])("should convert $input to $want", ({ input, want }) => {
		const got = convertHexToRGBString(input);
		expect(got).toEqual(want);
	});

	test.for<string>(["#0000000", "#ab", "abcdef", "       "])(
		"should throw an error for '%s'",
		(val) => {
			expect(() => convertHexToRGBString(val)).toThrow();
		},
	);
});

describe("convertRGBStringToRGBNumber", () => {
	test.for<{ want: RGBNumber; input: RGBString }>([
		{
			input: {
				red: "ab",
				green: "cd",
				blue: "ef",
			},
			want: {
				red: 171,
				green: 205,
				blue: 239,
			},
		},
		{
			input: {
				red: "00",
				green: "00",
				blue: "00",
			},
			want: {
				red: 0,
				green: 0,
				blue: 0,
			},
		},
		{
			input: {
				red: "00",
				green: "00",
				blue: "00",
			},
			want: {
				red: 0,
				green: 0,
				blue: 0,
			},
		},
		{
			input: {
				red: "aa",
				green: "bb",
				blue: "cc",
			},
			want: {
				red: 170,
				green: 187,
				blue: 204,
			},
		},
	])("should convert $input to $want", ({ input, want }) => {
		const got = convertRGBStringToRGBNumber(input);
		expect(got).toEqual(want);
	});

	test.for<RGBString>([
		{
			red: "abc",
			green: "cd",
			blue: "ef",
		},
		{
			red: "00",
			green: "-255",
			blue: "00",
		},
		{
			red: "how",
			green: "00",
			blue: "00",
		},
		{
			red: "aa",
			green: "bb",
			blue: "299",
		},
	])("should throw an error for '%s'", (val) => {
		expect(() => convertRGBStringToRGBNumber(val)).toThrow();
	});
});

describe("convertRGBNumberToRGBString", () => {
	test.for<{ want: RGBString; input: RGBNumber }>([
		{
			input: {
				red: 171,
				green: 205,
				blue: 239,
			},
			want: {
				red: "ab",
				green: "cd",
				blue: "ef",
			},
		},
		{
			input: {
				red: 0,
				green: 0,
				blue: 0,
			},
			want: {
				red: "00",
				green: "00",
				blue: "00",
			},
		},
		{
			input: {
				red: 0,
				green: 0,
				blue: 0,
			},
			want: {
				red: "00",
				green: "00",
				blue: "00",
			},
		},
		{
			input: {
				red: 170,
				green: 187,
				blue: 204,
			},
			want: {
				red: "aa",
				green: "bb",
				blue: "cc",
			},
		},
	])("should convert $input to $want", ({ input, want }) => {
		const got = convertRGBNumberToRGBString(input);
		expect(got).toEqual(want);
	});

	test.for<RGBNumber>([
		{
			red: 116.5,
			green: 205,
			blue: 239,
		},
		{
			red: -20,
			green: 0,
			blue: 0,
		},
		{
			red: 0,
			green: 280,
			blue: 0,
		},
		{
			red: 0,
			green: 187,
			blue: Number.POSITIVE_INFINITY,
		},
	])("should throw an error for '%s'", (val) => {
		expect(() => convertRGBNumberToRGBString(val)).toThrow();
	});
});

describe("validateRGBNumbers", () => {
	test.for<{ input: number[] }>([
		{ input: [155, 255, 125] },
		{ input: [0, 0, 0] },
		{ input: [1, 2, 3, 4, 5, 5, 6, 6, 7, 8, 255, 255, 255, 255, 21, 18] },
	])("should return true for %input", ({ input }) => {
		expect(validateRGBNumbers(...input)).toBe(true);
	});

	test.for<{ input: number[] }>([
		{ input: [100.1] },
		{ input: [] },
		{ input: [275] },
		{ input: [100, 115, 125, 255, 256] },
		{ input: [-50] },
		{ input: [100, 200, 100, 200, -1] },
	])("should return false for %input", ({ input }) => {
		expect(validateRGBNumbers(...input)).toBe(false);
	});
});

describe("convertHexToRGBNumber", () => {
	test.for<{ input: string; want: RGBNumber }>([
		{
			want: {
				red: 171,
				green: 205,
				blue: 239,
			},
			input: "#abcdef",
		},
		{
			want: {
				red: 0,
				green: 0,
				blue: 0,
			},
			input: "#000000",
		},
		{
			want: {
				red: 0,
				green: 0,
				blue: 0,
			},
			input: "#000",
		},
		{
			want: {
				red: 170,
				green: 187,
				blue: 204,
			},
			input: "#abc",
		},
	])("should convert $input to $want", ({ input, want }) => {
		const got = convertHexToRGBNumber(input);
		expect(got).toEqual(want);
	});

	test.for<string>(["#0000000", "#ab", "abcdef", "       "])(
		"should throw an error for '%s'",
		(val) => {
			expect(() => convertHexToRGBNumber(val)).toThrow();
		},
	);
});

describe("convertRGBNumberToHex", () => {
	test.for<{ input: RGBNumber; want: string }>([
		{
			input: {
				red: 171,
				green: 205,
				blue: 239,
			},
			want: "#abcdef",
		},
		{
			input: {
				red: 0,
				green: 0,
				blue: 0,
			},
			want: "#000",
		},
		{
			input: {
				red: 0,
				green: 0,
				blue: 0,
			},
			want: "#000",
		},
		{
			input: {
				red: 170,
				green: 187,
				blue: 204,
			},
			want: "#aabbcc",
		},
	])("should convert $input to $want", ({ input, want }) => {
		const got = convertRGBNumberToHex(input);
		expect(got).toEqual(want);
	});

	test.for<RGBNumber>([
		{
			red: 116.5,
			green: 205,
			blue: 239,
		},
		{
			red: -20,
			green: 0,
			blue: 0,
		},
		{
			red: 0,
			green: 280,
			blue: 0,
		},
		{
			red: 0,
			green: 187,
			blue: Number.POSITIVE_INFINITY,
		},
	])("should throw an error for '%s'", (val) => {
		expect(() => convertRGBNumberToHex(val)).toThrow();
	});
});

describe("convertHexToHSL", () => {
	test.for<{ input: string; want: HSLColor }>([
		{
			input: "#FF0000",
			want: {
				hue: 0,
				saturation: 1,
				luminance: 0.5,
			},
		},
		{
			input: "#00FF00",
			want: {
				hue: 120,
				saturation: 1,
				luminance: 0.5,
			},
		},
		{
			input: "#0000FF",
			want: {
				hue: 240,
				saturation: 1,
				luminance: 0.5,
			},
		},
		{
			input: "#FFFFFF",
			want: {
				hue: 0,
				saturation: 0,
				luminance: 1,
			},
		},
		{
			input: "#000000",
			want: {
				hue: 0,
				saturation: 0,
				luminance: 0,
			},
		},
		{
			input: "#3bff00",
			want: {
				hue: 106,
				saturation: 1,
				luminance: 0.5,
			},
		},
		{
			input: "#cfdca8",
			want: {
				hue: 75,
				saturation: 0.43,
				luminance: 0.76,
			},
		},
	])("should convert $input to $want", ({ input, want }) => {
		const got = convertHexToHSL(input);
		expect(got).toEqual(want);
	});

	test("should return throw for invalid hex string", () => {
		expect(() => convertHexToHSL("#12345")).toThrow();
	});
});
