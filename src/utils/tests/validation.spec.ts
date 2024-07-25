import { COLOR_REGEX } from "@Constants";
import {
	validate,
	validateByRegex,
	validateLength,
	validateRange,
} from "@Utils/validation";

describe("validateByRegex", () => {
	it("should return a function", () => {
		const res = validateByRegex(/any/);
		expect(typeof res).toEqual("function");
	});

	it("should return a function that returns true for proper input", () => {
		const correctInputs = ["#abc", "#123", "#456123"];
		const res = validateByRegex(COLOR_REGEX);
		for (const input of correctInputs) {
			expect(res(input)).toEqual(true);
		}
	});

	it("should return a function that returns false for improper input", () => {
		const badInputs = ["#efg", "#", "#1234567", "       ", " ", "!!!"];
		const res = validateByRegex(COLOR_REGEX);
		for (const input of badInputs) {
			expect(res(input)).toEqual(false);
		}
	});
});

describe("validateLength", () => {
	it("should return a function", () => {
		const res = validateLength({});
		expect(typeof res).toEqual("function");
	});

	it("should return a function with just a minimum that returns true or false with for correct or incorrect inputs", () => {
		const correctInputsMin = [
			"abcde",
			"abcdefefefefefefefefefefefef",
			"                       ",
			"     ",
		];

		const incorrectInputsMin = ["abcd", "    ", "", "1"];

		const resMin = validateLength({
			min: 5,
		});

		for (const input of correctInputsMin) {
			expect(resMin(input)).toBe(true);
		}

		for (const input of incorrectInputsMin) {
			expect(resMin(input)).toBe(false);
		}
	});

	it("should return a function with just a max that returns true or false for correct or incorrect inputs", () => {
		const correctInputsMax = ["", " ", "123456789"];

		const incorrectInputsMax = [
			"12345612094910240",
			"                  ",
			"          asf asf as fa sf",
		];

		const resMax = validateLength({
			max: 10,
		});

		for (const input of correctInputsMax) {
			expect(resMax(input)).toBe(true);
		}

		for (const input of incorrectInputsMax) {
			expect(resMax(input)).toBe(false);
		}
	});

	it("should return a function with just an exact length that returns true or false with for correct or incorrect inputs", () => {
		const correctInputsExact = ["ab", "  ", "a ", " a"];

		const incorrectInputsExact = [" ", "", "   ", "abcdef"];
		const resExact = validateLength({
			exact: 2,
		});

		for (const input of correctInputsExact) {
			expect(resExact(input)).toBe(true);
		}

		for (const input of incorrectInputsExact) {
			expect(resExact(input)).toBe(false);
		}
	});

	it("should return a function that allows for multiple exact lengths if exact is an array of numbers", () => {
		const res = validateLength({ exact: [4, 7] });

		const correctInputs = ["abcd", "#abc", "#abcdef"];

		const incorrectInputs = ["abc", "abcde", "abcdef", "abcdefgh"];

		for (const input of correctInputs) {
			expect(res(input)).toBe(true);
		}

		for (const input of incorrectInputs) {
			expect(res(input)).toBe(false);
		}
	});

	it("should return a function with both a min and max length that returns true or false with for correct or incorrect inputs", () => {
		const correctInputsMinMax = ["ab", "   ", "abc ", " abcd"];

		const incorrectInputsMinMax = [" ", "", "abcdef"];
		const resMinMax = validateLength({
			min: 2,
			max: 5,
		});

		for (const input of correctInputsMinMax) {
			expect(resMinMax(input)).toBe(true);
		}

		for (const input of incorrectInputsMinMax) {
			expect(resMinMax(input)).toBe(false);
		}
	});

	it("should return a function with all three propertiesthat returns true or false with for correct or incorrect inputs", () => {
		const correctInputsAll = ["abcd", "    ", "abc ", " abc"];

		const incorrectInputsAll = [" ", "", "abcdef", "ab", "abcde"];

		const resAll = validateLength({
			min: 2,
			max: 5,
			exact: 4,
		});

		for (const input of correctInputsAll) {
			expect(resAll(input)).toBe(true);
		}

		for (const input of incorrectInputsAll) {
			expect(resAll(input)).toBe(false);
		}
	});
});

describe("validateRange", () => {
	it("should return a function", () => {
		const res = validateRange({ min: 1, max: 5, step: 1 });
		expect(typeof res).toBe("function");
	});

	it("should return a function that returns true for inputs that are <= the max", () => {
		const validInputs = [2, 3, 5, 1];

		const res = validateRange({ min: 1, max: 5, step: 1 });

		for (const input of validInputs) {
			expect(res(input)).toBe(true);
		}
	});

	it("should return a function that returns true for inputs that are divisible by the step", () => {
		const resOne = validateRange({ min: 1, max: 1, step: 1 });
		expect(resOne(1)).toBe(true);

		const resTwo = validateRange({ min: 1.5, max: 6, step: 1.5 });
		expect(resTwo(1.5)).toBe(true);
		expect(resTwo(4.5)).toBe(true);
	});

	it("should return a function that returns false for inputs that are not <= the max of the range", () => {
		const invalidInputs = [6, 7, 10e10, Number.POSITIVE_INFINITY];

		const res = validateRange({ min: 1, max: 5, step: 1 });

		for (const input of invalidInputs) {
			expect(res(input)).toBe(false);
		}
	});

	it("should return a funciton that returns false if the values are not >= the minimum of the range", () => {
		const invalidInputs = [0, 0.9999, -10e10, Number.NEGATIVE_INFINITY];

		const res = validateRange({ min: 1, max: 5, step: 1 });

		for (const input of invalidInputs) {
			expect(res(input)).toBe(false);
		}
	});

	it("should return a function that returns false for inputs that are not divisible by the step", () => {
		const resOne = validateRange({ min: 1, max: 2, step: 1 });
		expect(resOne(1.000001)).toBe(false);
		expect(resOne(1.9999999)).toBe(false);

		const resTwo = validateRange({ min: 1.5, max: 6, step: 1.5 });
		expect(resTwo(1.6)).toBe(false);
		expect(resTwo(4)).toBe(false);
	});
});

describe("validate", () => {
	it("should allow for multiple validation functions", () => {
		const valid = validate(5, [
			validateRange({ min: 1, max: 5, step: 1 }),
			validateRange({ min: 1, max: 5, step: 1 }),
			validateRange({ min: 1, max: 5, step: 1 }),
		]);
		expect(valid).toBe(true);

		const validTwo = validate("hello", [
			validateByRegex(/hello/),
			validateLength({ exact: 5 }),
		]);

		expect(validTwo).toBe(true);
	});

	it("should allow for empty validation functions", () => {
		const valid = validate("hello", []);
		expect(valid).toBe(true);
	});

	it("should return true for correct inputs", () => {
		const validationFunctions = [
			validateByRegex(COLOR_REGEX),
			validateLength({ exact: [4, 7] }),
		];

		const correctInputs = ["#abcdef", "#abc", "#def", "#123456"];

		for (const input of correctInputs) {
			expect(validate(input, validationFunctions)).toBe(true);
		}
	});

	it("should return false for incorrect inputs", () => {
		const validationFunctions = [
			validateByRegex(COLOR_REGEX),
			validateLength({ exact: [4, 7] }),
		];

		const incorrectInputs = [
			"#abcdeg",
			"#abcd",
			"#defefee",
			"#l23",
			"abcd",
			"    ",
			"       ",
		];

		for (const input of incorrectInputs) {
			expect(validate(input, validationFunctions)).toBe(false);
		}
	});
});
