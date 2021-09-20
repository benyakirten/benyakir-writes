import React from "react";
import { cleanup, render } from "@testing-library/react";
import renderer from 'react-test-renderer'

import Layout from "@Layout/Layout.component";

describe('Layout component', () => {
    jest.mock("@reach/router")

    afterEach(cleanup)

    it('should render correctly', () => {
        expect(() => render(<Layout />)).not.toThrow()

        const layout = renderer.create(<Layout />).toJSON()
        expect(layout).toMatchSnapshot()
    })
})