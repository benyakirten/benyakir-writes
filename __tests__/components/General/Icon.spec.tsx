import * as React from "react";

import { cleanup, render } from "@TestUtils";

import { Icon } from "@Gen";
import { allIcons } from "@TestProps";

describe("Icon component", () => {
	afterEach(cleanup);

	it("should render properly", () => {
		expect(() => render(<Icon icon={allIcons[0]} />)).not.toThrow();
	});
});
