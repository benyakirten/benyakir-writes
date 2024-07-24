import * as date from "@Utils/dates";

describe("dates util", () => {
	describe("getTimeFromDateString", () => {
		it("should parse the input according to certain criteria", () => {
			const result = date.getTimeFromDateString("09/15/2019");
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
				const result = date.getTimeFromDateString(item.date);
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
				expect(() => date.getTimeFromDateString(badDate)).toThrow();
			}
		});
	});

	describe("getBlogPostDateInformation", () => {
		it("should parse the input according to certain criteria", () => {
			const result = date.getBlogPostDateInformation("2019/09/15");
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
				const result = date.getBlogPostDateInformation(item.date);
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
				expect(() => date.getBlogPostDateInformation(badDate)).toThrow();
			}
		});
	});
});
