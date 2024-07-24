import * as React from "react";
import "jest-styled-components";

import { AlertBox } from "@Gen";
import { cleanup, render } from "@TestUtils";

describe("AlertBox component", () => {
	it("should render successfully", () => {
		expect(() => render(<AlertBox />)).not.toThrow();
		cleanup();
	});
});
