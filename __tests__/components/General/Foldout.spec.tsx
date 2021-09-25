import * as React from "react";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";

import renderer from "react-test-renderer";
import "jest-styled-components";

import Foldout from "@Gen/Foldout/Foldout.component";
import { FoldoutBody } from "@Gen/Foldout/Foldout.styles";

describe("Foldout component", () => {
    const clickSpy = jest.fn();

    beforeEach(() => {
        clickSpy.mockClear();
    });

    afterEach(cleanup);

    it("should render properly", () => {
        expect(() => render(<Foldout topbar={<p>Hello</p>} />)).not.toThrow();
    });

    it("should set the down arrow's tabindex according to the open prop", async () => {
        render(<Foldout topbar={<p>Test Topbar</p>} open={false} />);
        const downArrowOne = await screen.getByRole("button");
        expect(downArrowOne.getAttribute("tabindex")).toEqual("-1");

        cleanup();

        render(<Foldout topbar={<p>Test Topbar</p>} open={true} />);
        const downArrowTwo = await screen.getByRole("button");
        expect(downArrowTwo.getAttribute("tabindex")).toEqual("0");
    });

    it("should adjust the aria-hidden attribute of the foldout body according to the open prop", async () => {
        let topbar, body;

        render(<Foldout topbar={<p>Test Topbar</p>} open={false} />);
        topbar = await screen.getByText("Test Topbar");
        body = topbar.nextElementSibling as HTMLElement;
        expect(body?.getAttribute("aria-hidden")).toEqual("true");

        cleanup();

        render(<Foldout topbar={<p>Test Topbar</p>} open={true} />);
        topbar = await screen.getByText("Test Topbar");
        body = topbar.nextElementSibling;
        expect(body?.getAttribute("aria-hidden")).toEqual("false");
    });

    it("should dispatch the onClick event if the foldout or any element within it is clicked unless the item or its parent has an id of no-toggle such as the body and its descendants", async () => {
        render(
            <Foldout
                topbar={<p>Test Topbar</p>}
                open={false}
                onClick={clickSpy}
            >
                <p>Some stuff</p>
            </Foldout>
        );
        const button = await screen.getByRole("button");
        fireEvent.click(button);
        expect(clickSpy).toHaveBeenCalledTimes(2);

        const topbar = await screen.getByText("Test Topbar");
        fireEvent.click(topbar);
        expect(clickSpy).toHaveBeenCalledTimes(3);

        const body = topbar.nextElementSibling!;
        expect(body.getAttribute('data-navtoggle')).toEqual("no-toggle");
        fireEvent.click(body);
        expect(clickSpy).toHaveBeenCalledTimes(3);

        const stuff = await screen.getByText("Some stuff");
        fireEvent.click(stuff);
        expect(clickSpy).toHaveBeenCalledTimes(3);
    });

    it("should render the outer div's cursor based on the open prop", () => {
        const outer = renderer.create(
            <Foldout topbar={<p>Test Topbar</p>} open={true} />
        );
        expect(outer.toJSON()).toMatchSnapshot();
        expect(outer.toJSON()).toHaveStyleRule("cursor", "n-resize");

        const innerOne = (outer.toJSON()! as any).children[2]
        expect(innerOne).toHaveStyleRule("height", "4rem")
        expect(innerOne).toHaveStyleRule("opacity", "1")


        outer.update(<Foldout topbar={<p>Test Topbar</p>} open={false} />);
        expect(outer.toJSON()).toHaveStyleRule("cursor", "s-resize");

        const innerTwo = (outer.toJSON()! as any).children[2]
        expect(innerTwo).toHaveStyleRule("height", "0")
        expect(innerTwo).toHaveStyleRule("opacity", "0")
    });
});
