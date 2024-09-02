import { describe, expect, it } from "vitest";

import * as filter from "@/utils/filter";

describe("filter util", () => {
	describe("createChoiceSet", () => {
		it("should return only unique objects", () => {
			const items = [
				{ name: ["John"], something: "Value" },
				{ name: ["Doe"], something: "Value2" },
				{ name: ["John"], something: "Value3" },
			];
			const got = filter.createChoiceSet(items, "name");
			expect(got).toHaveLength(2);
			expect(got).toEqual([
				{ label: "John", value: "John" },
				{ label: "Doe", value: "Doe" },
			]);
		});
	});
});
