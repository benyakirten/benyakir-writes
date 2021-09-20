import * as React from "react";
import {
    cleanup,
    render,
    screen,
    act,
    fireEvent
} from "@testing-library/react";

import SyntaxHighlighter from "@Blocks/SyntaxHighlighter/SyntaxHighlighter.component";
import { ENABLED_THEMES, getFullTheme } from "@Utils/syntax-highlighter";

describe("SyntaxHighlighter component", () => {
    const sampleCode = `
        function sample() {
            return 1+1;
        }
    `;

    afterEach(cleanup)

    it("renders correctly", async () => {
        await act(async () => {
            expect(() =>
                render(
                    <SyntaxHighlighter
                        lang="js"
                        code="sampleCode"
                        type="benyakir-syntax-highlighter"
                    />
                )
            ).not.toThrow();
        });
    });

    it("should render a menu with a choice of all the themes that are enabled in the syntax highlighter", async () => {
        await act(async () => {
            render(
                <SyntaxHighlighter
                    lang="js"
                    code="sampleCode"
                    type="benyakir-syntax-highlighter"
                />
            );
        });

        const defaultMenuItem = await screen.getByText("Darcula");
        expect(defaultMenuItem).toBeTruthy();
        expect(defaultMenuItem.tagName).toEqual("OPTION");
        expect(defaultMenuItem.parentElement?.tagName).toEqual("SELECT");

        const allThemes = defaultMenuItem.parentElement?.children!;
        expect(allThemes.length).toEqual(ENABLED_THEMES.length);

        const allThemesArr = Array.from(allThemes).map((t) => t.textContent);
        ENABLED_THEMES.forEach((t) =>
            expect(allThemesArr).toContain(getFullTheme(t))
        );
    });

    it("should render a loading spinner wnile a new theme is being loaded", async () => {
        let container: Element;
        await act(async () => {
            container = render(
                <SyntaxHighlighter
                    lang="js"
                    code="sampleCode"
                    type="benyakir-syntax-highlighter"
                />
            ).baseElement;
        });

        const menu = (await screen.getByText("Darcula")).parentElement!;

        await act(async () => {
            fireEvent.change(menu, { target: { value: 'prism' } });
            expect(container.querySelector(".sc-gsTEea")).toBeTruthy();
        });
    });

    it('should apply the theme\'s settings to the syntax highlighter', async () => {
        let container: Element;
        await act(async () => {
            container = render(
                <SyntaxHighlighter
                    lang="js"
                    code="sampleCode"
                    type="benyakir-syntax-highlighter"
                />
            ).baseElement;
        });

        const code = container!.querySelector("code")!
        expect(code.classList).toContain("language-js")
        expect(code.style.color).toEqual("rgb(169, 183, 198)")
        expect(code.style.direction).toEqual("ltr")
        expect(code.style.fontFamily).toEqual("Consolas, Monaco, 'Andale Mono', monospace")
        expect(code.style.hyphens).toEqual("none")
        expect(code.style.lineHeight).toEqual("1.5")
        expect(code.style.tabSize).toEqual("4")
        expect(code.style.textAlign).toEqual("left")
        expect(code.style.whiteSpace).toEqual("pre")
        expect(code.style.wordBreak).toEqual("normal")
        expect(code.style.wordSpacing).toEqual("normal")
    })
});
