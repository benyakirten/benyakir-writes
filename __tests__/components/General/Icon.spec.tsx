import * as React from "react";
import { render, cleanup } from "@testing-library/react";
import renderer from 'react-test-renderer'

import Icon from "@Gen/Icon/Icon.component";
import { allIcons } from "../../props";

describe("Icon component", () => {
    afterEach(cleanup)
    
    it("should render properly", () => {
        expect(() => render(<Icon icon={allIcons[0]} />)).not.toThrow();

        const icon = renderer.create(<Icon icon={allIcons[0]} />).toJSON()
        expect(icon).toMatchSnapshot()
    });
});
