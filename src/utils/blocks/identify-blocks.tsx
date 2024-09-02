import React from "react";

import { SyntaxHighlighter } from "@/components/Blocks";
import { WpContent } from "@/styles/general-components";
import { HTMLBlock } from "@/types/posts";
import { BlockParser } from "./block-parser";

const syntaxHighlighterGetter = (content: string) => {
	const preBracketStart = content.indexOf("<pre");
	const preBracketEnd = content.indexOf(">", preBracketStart);
	const endPreEl = content.indexOf("</pre", preBracketEnd);

	const preContent = content.slice(preBracketEnd + 1, endPreEl);

	return JSON.parse(preContent);
};

const KNOWN_BLOCK_CLASSES: BlockComponents = {
	"benyakir-syntax-highlighter": {
		el: SyntaxHighlighter,
		propGetter: syntaxHighlighterGetter,
	},
};

const BLOCKS_TO_REMOVE: string[] = ["sharedaddy", "sd-sharing-enbaled"];

function parseChildToBlocks(child: HTMLBlock): JSX.Element | null {
	for (const cls of child.classes) {
		if (cls in KNOWN_BLOCK_CLASSES) {
			try {
				const propGetter = KNOWN_BLOCK_CLASSES[cls].propGetter;
				const properties = propGetter(child.html);

				// All attributes are stored as a json string in the innerHTML of a pre element.
				// https://github.com/benyakirten/gutenberg-syntax-highlighter/blob/main/bshg.php
				const Block = KNOWN_BLOCK_CLASSES[cls].el;

				return <Block {...properties} />;
			} catch (e) {
				console.error(`Failed to parse ${cls} properties`, e, child);
				continue;
			}
		}

		if (BLOCKS_TO_REMOVE.includes(cls)) {
			return null;
		}
	}

	return <WpContent dangerouslySetInnerHTML={{ __html: child.html }} />;
}

export function preprocessWPBlocks(content: string): JSX.Element[] {
	const parser = new BlockParser(content);
	const blocks = parser.blocks.reduce<JSX.Element[]>((acc, block) => {
		const parsedBlock = parseChildToBlocks(block);
		if (parsedBlock) {
			acc.push(parsedBlock);
		}

		return acc;
	}, []);

	return blocks;
}
