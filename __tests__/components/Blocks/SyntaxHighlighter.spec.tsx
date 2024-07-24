import * as React from "react";

import { SyntaxHighlighter } from "@Blocks";
import { act, cleanup, render, screen } from "@TestUtils";
import { ENABLED_THEMES, getFullTheme } from "@Utils/blocks/syntax-highlighter";

describe("SyntaxHighlighter component", () => {
	const sampleCode = `
        function sample() {
            return 1+1;
        }
    `;

	afterEach(cleanup);

	it("renders correctly", async () => {
		await act(async () => {
			expect(() =>
				render(
					<SyntaxHighlighter
						lang="js"
						code={sampleCode}
						type="benyakir-syntax-highlighter"
					/>,
				),
			).not.toThrow();
		});
	});

	it("should render a menu with a choice of all the themes that are enabled in the syntax highlighter", async () => {
		await act(async () => {
			render(
				<SyntaxHighlighter
					lang="js"
					code={sampleCode}
					type="benyakir-syntax-highlighter"
				/>,
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
			expect(allThemesArr).toContain(getFullTheme(t)),
		);
	});

	it("should apply the theme's settings to the syntax highlighter", async () => {
		let container: Element;
		await act(async () => {
			container = render(
				<SyntaxHighlighter
					lang="js"
					code={sampleCode}
					type="benyakir-syntax-highlighter"
				/>,
			).baseElement;
		});

		const code = container!.querySelector("code")!;
		expect(code.classList).toContain("language-js");
	});
});
