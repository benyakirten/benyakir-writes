import React from "react";

import { KNOWN_BLOCK_CLASSES } from "@Constants";
import { WpContent } from "@Styles/general-components";

const END_DIV_STRING = "</div>";
const END_DIV_LENGTH = 6;

const END_PRE_STRING = "</pre>";
const BEGINNING_PRE_LENGTH = 28;
// The initial string is always: <pre style=\"display: none;\">

function createDefaultBlock(content: string): DefaultBlock {
	return {
		type: "default",
		content,
	};
}

export function findBlock<T extends BaseBlock>(
	block: DefaultBlock,
	blockClass: string,
): (DefaultBlock | T)[] {
	const { content } = block;
	// Because content can either be a string
	const splitContent = content.split(`<div class=\"${blockClass}">`);

	// If it doesn't exist, the split will generate length 1 item
	// If it does exist, index 0 will be an empty string
	if (splitContent.length === 1) return [createDefaultBlock(content)];
	const finalEntries: (DefaultBlock | T)[] = [
		createDefaultBlock(splitContent[0]),
	];
	for (const potentialBlock of splitContent.slice(1)) {
		const closingIndex = potentialBlock.indexOf(END_DIV_STRING);
		if (closingIndex === -1) return [createDefaultBlock(content)]; // This shouldn't be possible

		const insideBlock = potentialBlock.slice(0, closingIndex).trim();
		const outsideBlock = potentialBlock
			.slice(closingIndex + END_DIV_LENGTH)
			.trim();

		const endPreIndex = insideBlock.indexOf(END_PRE_STRING);
		const encodedInfo = {
			type: blockClass,
			...JSON.parse(insideBlock.slice(BEGINNING_PRE_LENGTH, endPreIndex)),
		} as T;

		finalEntries.push(encodedInfo);

		if (outsideBlock) {
			finalEntries.push(createDefaultBlock(outsideBlock));
		}
	}
	return finalEntries;
}

// This could easily be refactored to be recursive
// The most confusing part is that if a block ends up split
// as in an identified specialty block is found within
// it ends up in 2 pieces, the pre and the current piece.
// In turn, each of those have to be examined
export function preprocessWPEntry(content: string) {
	let finalResults: (DefaultBlock | BaseBlock)[] = [
		createDefaultBlock(content),
	];

	console.log(finalResults);
	for (const BLOCK_CLASS of Object.keys(KNOWN_BLOCK_CLASSES)) {
		for (let i = 0; i < finalResults.length; i++) {
			// We only want to process these items if they're strings or default blocks
			// and not the items in the block
			if (finalResults[i].type && finalResults[i].type === "default") {
				const innerResults = findBlock(
					finalResults[i] as DefaultBlock,
					BLOCK_CLASS,
				);
				// If the length is 1, there was nothing found
				// or we're searching a previously parsed object
				if (innerResults.length === 1) continue;

				// If we've gotten here, there are results.
				// The returned arraywill have length 1 + n
				// We will be inserting those values into the array
				// However, for the first result, we want to keep that array index
				// So we could either carve an exception into the following loop
				// or just write it out then have the loop start at 1
				finalResults[i] = innerResults[0];
				for (let j = 1; j < innerResults.length; j++) {
					// We insert array indeces corresponding to the amount
					// of new blocks and items between we find
					finalResults.splice(i + j, 0, innerResults[j]);
				}
				// This removes all empty default blocks that would enter otherwise if there are two
				// custom blocks right in a row
				finalResults = finalResults.filter(
					(r) => r.type === "default" && !r.content,
				);
			}
		}
	}
	return finalResults;
}

// Gatsby doesn't like React.Suspense on SSR rendering
// Therefore, in any page that uses the block
// You need to have a special check for server-side rendering
// CF src/templates/Post.template.tsx
export function createBlocks<T extends BaseBlock>(blocks: T[]): JSX.Element[] {
	if (blocks.length === 0)
		return [<div key={Math.random()}>Nothing to see here</div>];
	const elements: JSX.Element[] = [];
	for (const block of blocks) {
		const El = KNOWN_BLOCK_CLASSES[block.type];
		if (El) {
			elements.push(<El {...block} />);
		} else if (block.content) {
			elements.push(
				<WpContent dangerouslySetInnerHTML={{ __html: block.content }} />,
			);
		}
	}
	return elements;
}
