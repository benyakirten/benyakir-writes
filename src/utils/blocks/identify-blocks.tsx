import React from "react";

import { SyntaxHighlighter } from "@Blocks";
import { WpContent } from "@Styles/general-components";

const KNOWN_BLOCK_CLASSES: BlockComponents = {
	"benyakir-syntax-highlighter": SyntaxHighlighter,
};

const BLOCKS_TO_REMOVE: string[] = ["sharedaddy", "sd-sharing-enbaled"];

function parseChildToBlocks(child: Element): JSX.Element | null {
	for (let i = 0; i < child.classList.length; i++) {
		const cls = child.classList[i];
		if (cls in KNOWN_BLOCK_CLASSES) {
			const innerHTML = child.firstElementChild?.innerHTML;
			if (!innerHTML) {
				return null;
			}
			try {
				const properties = JSON.parse(innerHTML);

				// Custom Gutenberg blocks are stored as a
				// set of JSON parseable properties
				// in a hidden pre tag within the block
				const Block = KNOWN_BLOCK_CLASSES[cls];

				return <Block {...properties} />;
			} catch (e) {
				console.error(`Failed to parse ${cls} properties`, e, innerHTML);
				continue;
			}
		}

		if (BLOCKS_TO_REMOVE.includes(cls)) {
			return null;
		}
	}

	return <WpContent dangerouslySetInnerHTML={{ __html: child.outerHTML }} />;
}

export function preprocessWPBlocks(content: string): JSX.Element[] {
	const doc = new DOMParser().parseFromString(content, "text/html");
	const body = doc.children[0].children[1] as HTMLBodyElement;

	const blocks: JSX.Element[] = [];
	for (const child of Array.from(body.children)) {
		const block = parseChildToBlocks(child);
		if (block) {
			blocks.push(block);
		}
	}

	return blocks;
}
