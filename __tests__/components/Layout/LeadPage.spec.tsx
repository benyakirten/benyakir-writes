import * as React from "react";

import { LeadPage } from "@Layout";
import { cleanup, render } from "@TestUtils";

describe("LeadPage component", () => {
	afterEach(cleanup);

	it("should render correctly", () => {
		expect(() =>
			render(<LeadPage title="test title" filter={<div />} />),
		).not.toThrow();
	});
});
