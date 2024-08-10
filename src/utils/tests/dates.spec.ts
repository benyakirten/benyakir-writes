import { describe, it, expect, test } from "vitest";

import {
	getTimeFromDateString,
	getBlogPostDateInformation,
	convertDatePickerValueToDate,
	convertDateToDatePickerValue,
} from "@/utils/dates";

describe("getTimeFromDateString", () => {
	it("should parse the input according to certain criteria", () => {
		const result = getTimeFromDateString("09/15/2019");
		expect(result.date).toEqual(new Date("09/15/2019"));
		expect(result.full).toEqual("September");
		expect(result.short).toEqual("SEP");
		expect(result.month).toEqual(9);
		expect(result.year).toEqual(2019);
	});

	it("should give known results for known inputs", () => {
		const datesAndResults: { date: string; result: DateInformation }[] = [
			{
				date: "09/15/2019",
				result: {
					date: new Date("09/15/2019"),
					short: "SEP",
					full: "September",
					month: 9,
					year: 2019,
				},
			},
			{
				date: "01/31/2030",
				result: {
					date: new Date("01/31/2030"),
					short: "JAN",
					full: "January",
					month: 1,
					year: 2030,
				},
			},
			{
				date: "11/01/1833",
				result: {
					date: new Date("11/01/1833"),
					short: "NOV",
					full: "November",
					month: 11,
					year: 1833,
				},
			},
			{
				date: "05/30/1954",
				result: {
					date: new Date("05/30/1954"),
					short: "MAY",
					full: "May",
					month: 5,
					year: 1954,
				},
			},
			{
				date: "08/10/2000",
				result: {
					date: new Date("08/10/2000"),
					short: "AUG",
					full: "August",
					month: 8,
					year: 2000,
				},
			},
		];
		for (const item of datesAndResults) {
			const result = getTimeFromDateString(item.date);
			expect(result).toEqual(item.result);
		}
	});

	it("should raise errors for incorrectly formatted results", () => {
		const badlyFormattedDates = [
			"9/15/2019",
			"15/09/2019",
			"2019/15/09",
			"normalstring",
		];
		for (const badDate of badlyFormattedDates) {
			expect(() => getTimeFromDateString(badDate)).toThrow();
		}
	});
});

describe("getBlogPostDateInformation", () => {
	it("should parse the input according to certain criteria", () => {
		const result = getBlogPostDateInformation("2019/09/15");
		expect(result.date).toEqual(new Date("2019/09/15"));
		expect(result.full).toEqual("September");
		expect(result.short).toEqual("SEP");
		expect(result.month).toEqual(9);
		expect(result.year).toEqual(2019);
	});

	it("should give known results for known inputs", () => {
		const datesAndResults: { date: string; result: DateInformation }[] = [
			{
				date: "2019/09/15",
				result: {
					date: new Date("2019/09/15"),
					short: "SEP",
					full: "September",
					month: 9,
					year: 2019,
				},
			},
			{
				date: "2030/01/31",
				result: {
					date: new Date("2030/01/31"),
					short: "JAN",
					full: "January",
					month: 1,
					year: 2030,
				},
			},
			{
				date: "1833/11/01",
				result: {
					date: new Date("1833/11/01"),
					short: "NOV",
					full: "November",
					month: 11,
					year: 1833,
				},
			},
			{
				date: "1954/05/30",
				result: {
					date: new Date("1954/05/30"),
					short: "MAY",
					full: "May",
					month: 5,
					year: 1954,
				},
			},
			{
				date: "2000/08/10",
				result: {
					date: new Date("2000/08/10"),
					short: "AUG",
					full: "August",
					month: 8,
					year: 2000,
				},
			},
		];
		for (const item of datesAndResults) {
			const result = getBlogPostDateInformation(item.date);
			expect(result).toEqual(item.result);
		}
	});

	it("should raise errors for incorrectly formatted results", () => {
		const badlyFormattedDates = [
			"9/15/2019",
			"09/15/2918",
			"15/09/2019",
			"2019/15/9",
			"normalstring",
		];
		for (const badDate of badlyFormattedDates) {
			expect(() => getBlogPostDateInformation(badDate)).toThrow();
		}
	});
});

describe("convertDateToDatePickerValue", () => {
	it("should convert the date to the correct date picker value format", () => {
		const date = new Date("2022-09-15");
		const result = convertDateToDatePickerValue(date);
		expect(result).toEqual("2022-09-15");
	});

	it("should handle single-digit month and date values", () => {
		const date = new Date("2022-01-05");
		const result = convertDateToDatePickerValue(date);
		expect(result).toEqual("2022-01-05");
	});

	it("should handle leap year dates", () => {
		const date = new Date("2024-02-29");
		const result = convertDateToDatePickerValue(date);
		expect(result).toEqual("2024-02-29");
	});

	it("should return Jan 1st 1970 if the date is invalid", () => {
		const date = new Date("invalid");
		const result = convertDateToDatePickerValue(date);
		expect(result).toEqual("1970-01-01");
	});
});

describe("convertDatePickerValueToDate", () => {
	it("should convert the date picker value to a Date object", () => {
		const value = "2022-09-15";
		const result = convertDatePickerValueToDate(value);
		expect(result).toEqual(new Date("09/15/2022"));
	});

	it("should handle single-digit month and date values", () => {
		const value = "2022-01-05";
		const result = convertDatePickerValueToDate(value);
		expect(result).toEqual(new Date("01/05/2022"));
	});

	it("should handle leap year dates", () => {
		const value = "2024-02-29";
		const result = convertDatePickerValueToDate(value);
		expect(result).toEqual(new Date("02/29/2024"));
	});

	test.each<string>(["invalid", "2024-2-29", ""])(
		"should return an invalid date for %s",
		(value) => {
			const result = convertDatePickerValueToDate(value);
			expect(result).toEqual(new Date("invalid"));
		},
	);
});
