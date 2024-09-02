import { HTMLBlock } from "@/types/posts";

const OPEN_ANGLE_BRACKET = "<";
const CLOSE_ANGLE_BRACKET = ">";
const END_TAG = "/";

const EMPTY_SPACE_CHARS = [" ", "\n", "\t"];

export class BlockParser {
	public blocks: HTMLBlock[] = [];
	constructor(public content: string) {
		this.blocks = this.identifyHTMLBlocks(content);
	}

	getTagName(content: string, position: number): string {
		let tag = "";
		let pos = position;

		while (!EMPTY_SPACE_CHARS.includes(content[pos])) {
			pos++;
			if (content[pos] === CLOSE_ANGLE_BRACKET) {
				return tag;
			}

			tag += content[pos];
		}
		return tag.trim();
	}

	getBlockClasses(elOpen: string): string[] {
		const classAttr = elOpen.match(/class="([^"]*)"/);
		if (!classAttr || classAttr.length < 2) {
			return [];
		}

		const classString = classAttr[1];
		return classString.split(" ");
	}

	identifyHTMLBlocks(content: string): HTMLBlock[] {
		let currentBlock: HTMLBlock | null = null;

		const stack: string[] = [];
		const blocks: HTMLBlock[] = [];

		for (let i = 0; i < content.length; i++) {
			const char = content[i];
			if (!currentBlock) {
				if (char !== OPEN_ANGLE_BRACKET) {
					continue;
				}

				const tag = this.getTagName(content, i);

				currentBlock = {
					tag,
					classes: [],
					html: OPEN_ANGLE_BRACKET,
				};

				continue;
			}

			currentBlock.html += char;
			if (char === OPEN_ANGLE_BRACKET && content[i + 1] !== END_TAG) {
				const tag = this.getTagName(content, i);
				stack.push(tag);

				continue;
			}

			if (char === OPEN_ANGLE_BRACKET && content[i + 1] === END_TAG) {
				const tag = this.getTagName(content, i + 1);
				i += tag.length + 1;
				currentBlock.html += `/${tag}`;

				if (stack.length > 0 && stack.at(-1) === tag) {
					stack.pop();
					continue;
				}

				if (tag !== currentBlock.tag) {
					continue;
				}

				const endOpenTag = currentBlock.html.indexOf(CLOSE_ANGLE_BRACKET);
				const elOpen = currentBlock.html.slice(0, endOpenTag + 1);

				currentBlock.classes = this.getBlockClasses(elOpen);
				currentBlock.html = currentBlock.html.trim();

				blocks.push(currentBlock);

				currentBlock = null;
			}
		}

		return blocks;
	}
}
