import React from "react";

import { SyntaxHighlighter } from "@Blocks";
import { WpContent } from "@Styles/general-components";

const KNOWN_BLOCK_CLASSES: BlockComponents = {
	"benyakir-syntax-highlighter": SyntaxHighlighter,
};

const BLOCKS_TO_REMOVE: string[] = ["sharedaddy", "sd-sharing-enbaled"];

export function preprocessWPBlocks(content: string): JSX.Element[] {
	const doc = new DOMParser().parseFromString(content, "text/html");
	const body = doc.children[0].children[1] as HTMLBodyElement;

	const children = Array.from(body.children);
	const els: JSX.Element[] = [];

	outer: for (const child of children) {
		for (let i = 0; i < child.classList.length; i++) {
			const cls = child.classList[i];

			if (cls in KNOWN_BLOCK_CLASSES) {
				const innerHTML = child.firstElementChild?.innerHTML;
				if (!innerHTML) {
					continue outer;
				}

				// Custom Gutenberg blocks are stored as a
				// set of JSON parseable properties
				// in a hidden pre tag within the block
				const Block = KNOWN_BLOCK_CLASSES[cls];
				const properties = JSON.parse(innerHTML);

				els.push(<Block {...properties} />);
				continue outer;
			}

			if (BLOCKS_TO_REMOVE.includes(cls)) {
				continue outer;
			}
		}

		els.push(
			<WpContent dangerouslySetInnerHTML={{ __html: child.outerHTML }} />,
		);
	}

	return els;
}
