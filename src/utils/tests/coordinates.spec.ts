import { describe, expect, it } from "vitest";

import * as coordinates from "@/utils/coordinates";

describe("coordinates util", () => {
	describe("getFourCorners", () => {
		it("should give known results for known inputs", () => {
			const rects: { rectangle: DOMRect; answer: Corners }[] = [
				{
					rectangle: {
						top: 0,
						right: 100,
						bottom: 100,
						left: 0,
					} as DOMRect,
					answer: [
						{
							x: 0,
							y: 0,
						},
						{
							x: 100,
							y: 0,
						},
						{
							x: 100,
							y: 100,
						},
						{
							x: 0,
							y: 100,
						},
					],
				},
				{
					rectangle: {
						top: 100,
						right: 300,
						bottom: 400,
						left: 200,
					} as DOMRect,
					answer: [
						{
							x: 200,
							y: 100,
						},
						{
							x: 300,
							y: 100,
						},
						{
							x: 300,
							y: 400,
						},
						{
							x: 200,
							y: 400,
						},
					],
				},
			];

			for (const rect of rects) {
				expect(coordinates.getFourCorners(rect.rectangle)).toEqual(rect.answer);
			}
		});
	});

	describe("getNearestCornerIdx", () => {
		it("should give known results for known inputs", () => {
			const movements: { mouse: Coord; corners: Corners; answer: number }[] = [
				{
					mouse: {
						x: 10,
						y: 10,
					},
					corners: [
						{
							x: 0,
							y: 0,
						},
						{
							x: 100,
							y: 0,
						},
						{
							x: 100,
							y: 100,
						},
						{
							x: 0,
							y: 100,
						},
					],
					answer: 0,
				},
				{
					mouse: {
						x: 90,
						y: 90,
					},
					corners: [
						{
							x: 0,
							y: 0,
						},
						{
							x: 100,
							y: 0,
						},
						{
							x: 100,
							y: 100,
						},
						{
							x: 0,
							y: 100,
						},
					],
					answer: 2,
				},
				{
					mouse: {
						x: 90,
						y: 10,
					},
					corners: [
						{
							x: 0,
							y: 0,
						},
						{
							x: 100,
							y: 0,
						},
						{
							x: 100,
							y: 100,
						},
						{
							x: 0,
							y: 100,
						},
					],
					answer: 1,
				},
				{
					mouse: {
						x: 10,
						y: 90,
					},
					corners: [
						{
							x: 0,
							y: 0,
						},
						{
							x: 100,
							y: 0,
						},
						{
							x: 100,
							y: 100,
						},
						{
							x: 0,
							y: 100,
						},
					],
					answer: 3,
				},
				{
					mouse: {
						x: 5,
						y: 5,
					},
					corners: [
						{
							x: 0,
							y: 0,
						},
						{
							x: 10,
							y: 0,
						},
						{
							x: 10,
							y: 10,
						},
						{
							x: 0,
							y: 10,
						},
					],
					answer: 0,
				},
			];

			for (const move of movements) {
				expect(
					coordinates.getNearestCornerIdx(move.mouse, move.corners),
				).toEqual(move.answer);
			}
		});
	});
});
