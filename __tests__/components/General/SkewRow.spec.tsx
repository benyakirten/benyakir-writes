import * as React from "react";

import { SkewRow } from "@Gen";
import { cleanup, render } from "@TestUtils";

describe("SkewRow component", () => {
	afterEach(cleanup);

	it("should render properly", () => {
		expect(() => render(<SkewRow />)).not.toThrow();
	});
});
