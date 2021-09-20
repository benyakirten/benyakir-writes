import * as React from "react";
import { cleanup, render } from "@testing-library/react";
import renderer from 'react-test-renderer'

import LeadPage from "@Layout/LeadPage/LeadPage.component";

describe("LeadPage component", () => {
    afterEach(cleanup)

    it("should render correctly", () => {
        expect(() => render(<LeadPage filter={<div />} />)).not.toThrow()

        const comp = renderer.create(<LeadPage filter={<div />} />).toJSON()
        expect(comp).toMatchSnapshot()
    });
});
