import * as React from "react";
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import {
    cleanup,
    render
} from "@testing-library/react";

import AlertBox from "@Gen/AlertBox/AlertBox.component"

describe('AlertBox component', () => {
    it('should render successfully', () => {
        expect(() => render(<AlertBox />)).not.toThrow()
        cleanup()
    })

    it('should have a green or red background if the success prop is true or false', () => {
        const comp = renderer.create(<AlertBox success={true} />)
        expect(comp.toJSON()).toMatchSnapshot()
        expect(comp.toJSON()).toHaveStyleRule("background-color", "#44764d")

        comp.update(<AlertBox success={false} />)
        expect(comp.toJSON()).toMatchSnapshot()
        expect(comp.toJSON()).toHaveStyleRule("background-color", "#993d4d")
    })

    it('should have a default success prop value of true', () => {
        const comp = renderer.create(<AlertBox />)
        expect(comp.toJSON()).toMatchSnapshot()
        expect(comp.toJSON()).toHaveStyleRule("background-color", "#44764d")
    })
})