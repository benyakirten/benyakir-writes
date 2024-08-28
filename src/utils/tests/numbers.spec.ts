import { describe, it, expect } from "vitest";

import { clamp, mod, round } from "@/utils/numbers";

describe("clamp", () => {
	it("should return numbers that are between the min and max without changing them", () => {
		const min = 0;
		const max = 100;
		const inputs = [10, 20, 30, 99, 1, 0.00001, 99.99999];

		for (const input of inputs) {
			expect(clamp(input, min, max)).toEqual(input);
		}
	});

	it("should return numbers above the max as the max", () => {
		const min = 0;
		const max = 100;
		const inputs = [100.1, 2000, 10e10, Number.POSITIVE_INFINITY];

		for (const input of inputs) {
			expect(clamp(input, min, max)).toEqual(max);
		}
	});

	it("should return numbers below the minimum as the minimum", () => {
		const min = 0;
		const max = 100;
		const inputs = [-0.000001, -10e10, Number.NEGATIVE_INFINITY];

		for (const input of inputs) {
			expect(clamp(input, min, max)).toEqual(min);
		}
	});
});

describe("mod", () => {
	it("should return the correct modulo when the dividend is positive", () => {
		expect(mod(10, 3)).toEqual(1);
		expect(mod(15, 7)).toEqual(1);
		expect(mod(20, 5)).toEqual(0);
	});

	it("should return the correct modulo when the dividend is negative", () => {
		expect(mod(-10, 3)).toEqual(2);
		expect(mod(-15, 7)).toEqual(6);
		expect(mod(-20, 5)).toEqual(0);
	});

	it("should return 0 when the dividend is 0", () => {
		expect(mod(0, 3)).toEqual(0);
		expect(mod(0, 7)).toEqual(0);
		expect(mod(0, 5)).toEqual(0);
	});

	it("should return NaN when the divisor is 0", () => {
		expect(mod(10, 0)).toBeNaN();
		expect(mod(-15, 0)).toBeNaN();
		expect(mod(0, 0)).toBeNaN();
	});
});
describe("round", () => {
	it("should round the number to the specified precision", () => {
		expect(round(Math.PI, 0)).toEqual(3);
		expect(round(Math.PI, 1)).toEqual(3.1);
		expect(round(Math.PI, 2)).toEqual(3.14);
		// biome-ignore lint/suspicious/noApproximativeNumericConstant: Not precise enough
		expect(round(Math.PI, 3)).toEqual(3.142);
	});

	it("should round the number to 0 decimal places by default", () => {
		expect(round(Math.PI)).toEqual(3);
		expect(round(Math.E)).toEqual(3);
		expect(round(Math.SQRT2)).toEqual(1);
	});

	it("should return the number itself when precision is 0", () => {
		expect(round(42, 0)).toEqual(42);
		expect(round(100, 0)).toEqual(100);
		expect(round(0, 0)).toEqual(0);
	});
});
