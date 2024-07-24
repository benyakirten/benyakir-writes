import * as React from "react";

import { Loading } from "@Gen";
import { cleanup, render } from "@TestUtils";

describe("Loading component", () => {
	afterEach(cleanup);

	it("should render correctly", () => {
		expect(() => render(<Loading />)).not.toThrow();
	});
});
