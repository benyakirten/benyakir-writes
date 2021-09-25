import * as React from "react";
import "jest-styled-components";

import {
    cleanup,
    render,
    screen,
    act,
    fireEvent
} from "@testing-library/react";

import Button from "@Gen/Button/Button.component";

describe("Button component", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
        cleanup();
    });

    it("should render successfully", () => {
        expect(() => render(<Button />)).not.toThrow();
    });

    it("should disable or enable the button depending on the prop passed in", async () => {
        let button: HTMLElement;

        render(<Button disabled={false} />);
        button = await screen.findByRole("button");
        expect(button).toBeEnabled();

        cleanup();

        render(<Button disabled={true} />);
        button = await screen.findByRole("button");
        expect(button).toBeDisabled();
    });

    it("should change the position, tranformOrigin and clipPath based of the inner div based on how a mouse enters over the button", async () => {
        let button: HTMLElement;
        render(<Button />);
        button = await screen.findByRole("button");
        (button as any).getBoundingClientRect = jest.fn(() => ({
            bottom: 100,
            height: 100,
            left: 0,
            right: 100,
            top: 0,
            width: 100,
            x: 0,
            y: 0,
        }));

        const div = button.firstElementChild as HTMLElement;
        expect(div).toBeTruthy();
        expect(div.tagName).toEqual("DIV");
        expect(div.style.transformOrigin).toEqual("top left")
        expect(div.style.clipPath).toEqual("polygon(0 0, 100% 0, 0 100%)")
        expect(div.style.top).toEqual("0px")
        expect(div.style.left).toEqual("0px")

        await act(async () => {
            fireEvent.mouseEnter(button, {
                clientX: 90,
                clientY: 20
            })
            jest.runAllTimers()
            expect(div.style.transformOrigin).toEqual("top right")
            expect(div.style.clipPath).toEqual("polygon(100% 0, 0 0, 100% 100%)")
            expect(div.style.top).toEqual("0px")
            expect(div.style.right).toEqual("0px")
        })

        await act(async () => {
            fireEvent.mouseEnter(button, {
                clientX: 90,
                clientY: 90
            })
            jest.runAllTimers()
            expect(div.style.transformOrigin).toEqual("bottom right")
            expect(div.style.clipPath).toEqual("polygon(100% 0, 0 100%, 100% 100%)")
            expect(div.style.bottom).toEqual("0px")
            expect(div.style.right).toEqual("0px")
        })

        await act(async () => {
            fireEvent.mouseEnter(button, {
                clientX: 20,
                clientY: 90
            })
            jest.runAllTimers()
            expect(div.style.transformOrigin).toEqual("bottom left")
            expect(div.style.clipPath).toEqual("polygon(0 0, 0 100%, 100% 100%)")
            expect(div.style.bottom).toEqual("0px")
            expect(div.style.left).toEqual("0px")
        })

        await act(async () => {
            fireEvent.mouseEnter(button, {
                clientX: 20,
                clientY: 20
            })
            jest.runAllTimers()
            expect(div.style.transformOrigin).toEqual("top left")
            expect(div.style.clipPath).toEqual("polygon(0 0, 100% 0, 0 100%)")
            expect(div.style.top).toEqual("0px")
            expect(div.style.left).toEqual("0px")
        })
    });
});
