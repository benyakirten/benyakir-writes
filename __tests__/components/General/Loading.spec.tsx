import * as React from "react"

import { render, cleanup } from "@TestUtils"
import Loading from "@Gen/Loading/Loading.component"

describe('Loading component', () => {
    afterEach(cleanup)
    
    it('should render correctly', () => {
        expect(() => render(<Loading />)).not.toThrow()
    })
})