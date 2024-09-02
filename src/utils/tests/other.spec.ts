import { describe, expect, it } from "vitest";

import * as other from "@/utils/other";

describe("other utils", () => {
	describe("encode", () => {
		it("should give known ouputs for known inputs", () => {
			const expectations: {
				input: { [key: string]: string };
				result: string;
			}[] = [
				{
					input: {
						key: "value",
						key2: "value2",
					},
					result: "key=value&key2=value2",
				},
				{
					input: {
						"complex key": "value",
						"complex key2": "complex value2",
					},
					result: "complex%20key=value&complex%20key2=complex%20value2",
				},
				{
					input: {
						"key! and! stuff!": "value@é",
					},
					result: "key!%20and!%20stuff!=value%40%C3%A9",
				},
			];

			for (const expectation of expectations) {
				expect(other.encode(expectation.input)).toEqual(expectation.result);
			}
		});
	});
});
