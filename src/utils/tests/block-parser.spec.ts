import { describe, expect, it } from "vitest";
import { BlockParser } from "../blocks/block-parser";

describe("BlockParser", () => {
	it("should correctly identify HTML blocks", () => {
		const content = `
			<div class="block">Block 1</div>
			<p class="par">Paragraph 1</p>
			<div class="block">Block 2<p>Paragraph 2</p></div>
		`;
		const parser = new BlockParser(content);
		const expectedBlocks = [
			{
				tag: "div",
				classes: ["block"],
				html: '<div class="block">Block 1</div>',
			},
			{
				tag: "p",
				classes: ["par"],
				html: '<p class="par">Paragraph 1</p>',
			},
			{
				tag: "div",
				classes: ["block"],
				html: '<div class="block">Block 2<p>Paragraph 2</p></div>',
			},
		];
		expect(parser.blocks).toEqual(expectedBlocks);
	});

	it("should handle self-closing HTML tags", () => {
		const content = `
			<img src="image.jpg" alt="Image" />
			<br />
      <div class="block"><label>Search:<input /></label></div>
		`;
		const parser = new BlockParser(content);
		const expectedBlocks = [
			{
				tag: "img",
				classes: [],
				html: '<img src="image.jpg" alt="Image" />',
			},
			{
				tag: "br",
				classes: [],
				html: "<br />",
			},
			{
				tag: "div",
				classes: ["block"],
				html: '<div class="block"><label>Search:<input /></label></div>',
			},
		];
		expect(parser.blocks).toEqual(expectedBlocks);
	});
});
