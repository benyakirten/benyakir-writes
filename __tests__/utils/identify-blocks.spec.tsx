import type * as React from "react";

import { WpContent } from "@Styles/general-components";
import * as idBlocks from "@Utils/blocks/identify-blocks";

// The function cannot be tested on divs so custom elements have to be made
const TestBlock1: React.FC<{ title?: string; lang?: string; type: string }> = ({
	title,
	lang,
}) => <div lang={lang} title={title} />;
const TestBlock2: React.FC<{ title?: string; lang?: string; type: string }> = ({
	title,
	lang,
}) => <div lang={lang} title={title} />;

const TestBlock3: React.FC<{ title?: string; lang?: string; type: string }> = ({
	title,
	lang,
}) => <div lang={lang} title={title} />;

const TestBlock4: React.FC<{ title?: string; lang?: string; type: string }> = ({
	title,
	lang,
}) => <div lang={lang} title={title} />;

jest.mock("@Constants", () => ({
	KNOWN_BLOCK_CLASSES: {
		"test-block-class-1": TestBlock1,
		"test-block-class-2": TestBlock2,
		"test-block-class-3": TestBlock3,
		"test-block-class-4": TestBlock4,
	},
}));

describe("identify-blocks util", () => {
	describe("findBlock", () => {
		it("should give known results for known input", () => {
			const expectations: {
				block: DefaultBlock;
				blockClass: string;
				result: any[];
			}[] = [
				{
					block: {
						type: "default",
						content: `<p>some content goes here</p><div class="testblockclass"><pre style=\"display: none;\">{\"lang\":\"python\"}</pre></div><p>continued content here</p>`,
					},
					blockClass: "testblockclass",
					result: [
						{
							type: "default",
							content: "<p>some content goes here</p>",
						},
						{
							type: "testblockclass",
							lang: "python",
						},
						{
							type: "default",
							content: "<p>continued content here</p>",
						},
					],
				},
				{
					block: {
						type: "default",
						content: `<p>some content goes here</p><div class="intermediate-block"><pre style=\"display: none;\">{\"test\":\"test\"}</pre></div><p>continued content here</p><div class="intermediate-block"><pre style=\"display: none;\">{\"test2\":\"test2\"}</pre></div><p>end content</p>`,
					},
					blockClass: "intermediate-block",
					result: [
						{
							type: "default",
							content: "<p>some content goes here</p>",
						},
						{
							type: "intermediate-block",
							test: "test",
						},
						{
							type: "default",
							content: "<p>continued content here</p>",
						},
						{
							type: "intermediate-block",
							test2: "test2",
						},
						{
							type: "default",
							content: "<p>end content</p>",
						},
					],
				},
			];

			for (const expectation of expectations) {
				expect(
					idBlocks.findBlock(expectation.block, expectation.blockClass),
				).toEqual(expectation.result);
			}
		});

		it("should throw errors for incorrectly formatted inputs", () => {
			const badInputs: { block: DefaultBlock; blockClass: string }[] = [
				{
					block: {
						type: "default",
						content: `<p>some content goes here</p><div class="intermediate-block"><pre style=\"dplay: none;\">{\"test\":\"test\"}</pre></div>`,
					},
					blockClass: "intermediate-block",
				},
				{
					block: {
						type: "default",
						content: `<p>some content goes here</p><div class="intermediate-block"><pre style=\"display: none;\">{ test: test }</pre></div>`,
					},
					blockClass: "intermediate-block",
				},
				{
					block: {
						type: "default",
						content: `<p>some content goes here</p><div class="intermediate-block"><pre>{ test: test }</pre></div><p>Some stuff!</p>`,
					},
					blockClass: "intermediate-block",
				},
			];

			for (const input of badInputs) {
				expect(() =>
					idBlocks.findBlock(input.block, input.blockClass),
				).toThrow();
			}
		});

		it("should not create an empty block if the last element is a custom block", () => {
			const block: DefaultBlock = {
				type: "default",
				content: `<p>some content goes here</p><div class="intermediate-block"><pre style=\"display: none;\">{\"test\":\"test\"}</pre></div>`,
			};
			const blockClass = "intermediate-block";
			const result = [
				{
					type: "default",
					content: "<p>some content goes here</p>",
				},
				{
					type: "intermediate-block",
					test: "test",
				},
			];

			expect(idBlocks.findBlock(block, blockClass)).toEqual(result);

			const incorrectResult = [
				{
					type: "default",
					content: "<p>some content goes here</p>",
				},
				{
					type: "intermediate-block",
					test: "test",
				},
				{
					type: "default",
					content: "",
				},
			];

			expect(idBlocks.findBlock(block, blockClass)).not.toEqual(
				incorrectResult,
			);
		});
	});

	describe("processWPEntry", () => {
		it("should process multiple separate blocks without creating intermediate empty blocks", () => {
			const expectations: { content: string; result: any[] }[] = [
				{
					content:
						'<p>some content goes here</p><div class="test-block-class-1"><pre style="display: none;">{"title":"test"}</pre></div><p>continued content here</p><div class="test-block-class-2"><pre style="display: none;">{"lang":"en"}</pre></div><p>end content</p>',
					result: [
						{
							type: "default",
							content: "<p>some content goes here</p>",
						},
						{
							type: "test-block-class-1",
							title: "test",
						},
						{
							type: "default",
							content: "<p>continued content here</p>",
						},
						{
							type: "test-block-class-2",
							lang: "en",
						},
						{
							type: "default",
							content: "<p>end content</p>",
						},
					],
				},
				{
					content:
						'<p>some content goes here</p><div class="test-block-class-1"><pre style="display: none;">{"title":"test"}</pre></div><p>continued content here</p><div class="test-block-class-2"><pre style="display: none;">{"lang":"en"}</pre></div><p>end content</p><div class="test-block-class-3"><pre style="display: none;">{"title":"block-3"}</pre></div><div class="test-block-class-4"><pre style="display: none;">{"title":"block-4"}</pre></div>',
					result: [
						{
							type: "default",
							content: "<p>some content goes here</p>",
						},
						{
							type: "test-block-class-1",
							title: "test",
						},
						{
							type: "default",
							content: "<p>continued content here</p>",
						},
						{
							type: "test-block-class-2",
							lang: "en",
						},
						{
							type: "default",
							content: "<p>end content</p>",
						},
						{
							type: "test-block-class-3",
							title: "block-3",
						},
						{
							type: "test-block-class-4",
							title: "block-4",
						},
					],
				},
			];

			for (const expectation of expectations) {
				expect(idBlocks.preprocessWPEntry(expectation.content)).toEqual(
					expectation.result,
				);
			}
		});
	});

	describe("createBlocks", () => {
		it("should return a simple div if the input has length 0", () => {
			expect(idBlocks.createBlocks([])).toEqual([
				<div>Nothing to see here</div>,
			]);
		});

		it("should return known results for known inputs", () => {
			const expectations: { content: any[]; results: JSX.Element[] }[] = [
				{
					content: [
						{
							type: "default",
							content: "<p>some content goes here</p>",
						},
						{
							type: "test-block-class-1",
							title: "test",
						},
						{
							type: "default",
							content: "<p>continued content here</p>",
						},
						{
							type: "test-block-class-2",
							lang: "en",
						},
						{
							type: "default",
							content: "<p>end content</p>",
						},
						{
							type: "test-block-class-3",
							title: "block-3",
						},
						{
							type: "test-block-class-4",
							title: "block-4",
						},
					],
					results: [
						<WpContent
							dangerouslySetInnerHTML={{
								__html: "<p>some content goes here</p>",
							}}
						/>,
						<TestBlock1 title="test" type="test-block-class-1" />,
						<WpContent
							dangerouslySetInnerHTML={{
								__html: "<p>continued content here</p>",
							}}
						/>,
						<TestBlock2 lang="en" type="test-block-class-2" />,
						<WpContent
							dangerouslySetInnerHTML={{ __html: "<p>end content</p>" }}
						/>,
						<TestBlock3 title="block-3" type="test-block-class-3" />,
						<TestBlock4 title="block-4" type="test-block-class-4" />,
					],
				},
			];

			for (const expectation of expectations) {
				expect(idBlocks.createBlocks(expectation.content)).toEqual(
					expectation.results,
				);
			}
		});

		it("should not create blocks for default blocks with empty content", () => {
			const expectations: { content: any[]; results: JSX.Element[] }[] = [
				{
					content: [
						{
							type: "default",
							content: "<p>some content goes here</p>",
						},
						{
							type: "default",
							content: "",
						},
						{
							type: "default",
							content: "",
						},
						{
							type: "test-block-class-1",
							title: "test",
						},
						{
							type: "default",
							content: "<p>continued content here</p>",
						},
						{
							type: "test-block-class-2",
							lang: "en",
						},
						{
							type: "default",
							content: "",
						},
						{
							type: "default",
							content: "<p>end content</p>",
						},
						{
							type: "test-block-class-3",
							title: "block-3",
						},
						{
							type: "default",
							content: "",
						},
						{
							type: "test-block-class-4",
							title: "block-4",
						},
						{
							type: "default",
							content: "",
						},
					],
					results: [
						<WpContent
							dangerouslySetInnerHTML={{
								__html: "<p>some content goes here</p>",
							}}
						/>,
						<TestBlock1 title="test" type="test-block-class-1" />,
						<WpContent
							dangerouslySetInnerHTML={{
								__html: "<p>continued content here</p>",
							}}
						/>,
						<TestBlock2 lang="en" type="test-block-class-2" />,
						<WpContent
							dangerouslySetInnerHTML={{ __html: "<p>end content</p>" }}
						/>,
						<TestBlock3 title="block-3" type="test-block-class-3" />,
						<TestBlock4 title="block-4" type="test-block-class-4" />,
					],
				},
			];

			for (const expectation of expectations) {
				expect(idBlocks.createBlocks(expectation.content)).toEqual(
					expectation.results,
				);
			}
		});
	});
});
