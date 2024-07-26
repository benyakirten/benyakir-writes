import { describe, it, expect } from "vitest";

import { keepWithinRange } from "@/utils/numbers";

describe("keepWithinRange", () => {
	it("should return numbers that are between the min and max without changing them", () => {
		const min = 0;
		const max = 100;
		const inputs = [10, 20, 30, 99, 1, 0.00001, 99.99999];

		for (const input of inputs) {
			expect(keepWithinRange(input, min, max)).toEqual(input);
		}
	});

	it("should return numbers above the max as the max", () => {
		const min = 0;
		const max = 100;
		const inputs = [100.1, 2000, 10e10, Number.POSITIVE_INFINITY];

		for (const input of inputs) {
			expect(keepWithinRange(input, min, max)).toEqual(max);
		}
	});

	it("should return numbers below the minimum as the minimum", () => {
		const min = 0;
		const max = 100;
		const inputs = [-0.000001, -10e10, Number.NEGATIVE_INFINITY];

		for (const input of inputs) {
			expect(keepWithinRange(input, min, max)).toEqual(min);
		}
	});
});
