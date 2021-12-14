import * as React from "react";
import "jest-styled-components";

import { render, cleanup, screen, fireEvent } from "@TestUtils";
import TextArea from "@Input/TextArea/TextArea.component";

describe("TextArea component", () => {
    const changeSpy = jest.fn();

    const testProps = {
        onChange: changeSpy,
        value: "test val",
        label: "test text",
        name: "test-text",
    };

    beforeEach(changeSpy.mockClear);

    afterEach(cleanup);

    it("should render correctly", () => {
        expect(() => render(<TextArea {...testProps} />)).not.toThrow();
    });

    it("should render a text input with a value, name and id according to props with an accompanying label with an htmlFor corresponding to the id", async () => {
        render(<TextArea {...testProps} />);
        const input = (await screen.findByRole(
            "textbox"
        )) as HTMLTextAreaElement;
        expect(input.id).toEqual("test-text");
        expect(input.getAttribute("name")).toEqual("test-text");
        expect(input.value).toEqual("test val");

        const label = input.nextElementSibling!;
        expect(label.getAttribute("for")).toEqual("test-text");
        expect(label.textContent).toEqual("test text");
    });

    it("should call the onChange method whenever there is text input into the textarea", async () => {
        render(<TextArea {...testProps} />);
        const input = (await screen.findByRole(
            "textbox"
        )) as HTMLTextAreaElement;

        fireEvent.change(input, { target: { value: "a new value" } });
        expect(changeSpy).toHaveBeenCalledTimes(1);
        expect(changeSpy).toHaveBeenCalledWith("a new value");
    });

    it("should render a span with a bunch of irrelevant statistics about the statistics input", async () => {
        render(<TextArea {...testProps} value="" />);
        const inputOne = (await screen.findByRole(
            "textbox"
        )) as HTMLTextAreaElement;
        const spanOne = inputOne.nextElementSibling?.nextElementSibling!;

        expect(spanOne).toBeTruthy();
        expect(spanOne.textContent).toEqual(
            "Letters: 0 - Words: 0 - Average Word Length: 0"
        );

        cleanup();

        render(<TextArea {...testProps} />);
        const inputTwo = (await screen.findByRole(
            "textbox"
        )) as HTMLTextAreaElement;
        const spanTwo = inputTwo.nextElementSibling?.nextElementSibling!;

        expect(spanTwo).toBeTruthy();
        expect(spanTwo.textContent).toEqual(
            "Letters: 7 - Words: 2 - Average Word Length: 3.5"
        );

        cleanup();

        const gettsburgAddress = `Four score and seven years ago our fathers brought forth, on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.
        Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure. We are met on a great battle-field of that war. We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this.
        But, in a larger sense, we can not dedicate—we can not consecrate—we can not hallow—this ground. The brave men, living and dead, who struggled here, have consecrated it, far above our poor power to add or detract. The world will little note, nor long remember what we say here, but it can never forget what they did here. It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us—that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion—that we here highly resolve that these dead shall not have died in vain—that this nation, under God, shall have a new birth of freedom—and that government of the people, by the people, for the people, shall not perish from the earth.`;

        render(<TextArea {...testProps} value={gettsburgAddress} />);
        const inputThree = (await screen.findByRole(
            "textbox"
        )) as HTMLTextAreaElement;
        const spanThree = inputThree.nextElementSibling?.nextElementSibling!;

        expect(spanThree).toBeTruthy();
        expect(spanThree.textContent).toEqual(
            "Letters: 1190 - Words: 278 - Average Word Length: 4.28"
        );
    });
});
