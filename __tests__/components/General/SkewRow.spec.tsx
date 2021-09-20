import * as React from "react";
import { render, cleanup } from "@testing-library/react";
import renderer from 'react-test-renderer'

import SkewRow from "@Gen/SkewRow/SkewRow.component"

describe('SkewRow component', () => {
    afterEach(cleanup)

    it('should render properly', () => {
        expect(() => render(<SkewRow />)).not.toThrow()

        const row = renderer.create(<SkewRow />).toJSON()
        expect(row).toMatchSnapshot()
    })
})