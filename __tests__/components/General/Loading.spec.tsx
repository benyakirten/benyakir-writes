import * as React from "react";
import { render, cleanup } from "@testing-library/react";
import renderer from 'react-test-renderer'

import Loading from "@Gen/Loading/Loading.component"

describe('Loading component', () => {
    afterEach(cleanup)
    
    it('should render correctly', () => {
        expect(() => render(<Loading />)).not.toThrow()

        const loading = renderer.create(<Loading />).toJSON()
        expect(loading).toMatchSnapshot()
    })
})