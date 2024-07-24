import React from "react";

import { ReorderableItem } from "@Draggable";
import { cleanup, fireEvent, mockDispatch, render, screen } from "@TestUtils";

import { setDraggedValue } from "@/store/drag/drag.slice";
import { DraggedOverPosition } from "@/utils/enums";
import type { ReorderableItemProps } from "@Types/props/draggable";

describe("ReorderableItem component", () => {
	const dropSpy = jest.fn();
	const selectSpy = jest.fn();
	const getProps = (
		value = "test value",
		selected = false,
	): ReorderableItemProps => ({
		value,
		selected,
		onSelect: selectSpy,
		onDrop: dropSpy,
	});

	beforeEach(cleanup);

	afterEach(() => {
		dropSpy.mockClear();
		selectSpy.mockClear();
		mockDispatch.mockClear();
	});

	it("should render properly", () => {
		expect(() => render(<ReorderableItem {...getProps()} />)).not.toThrow();
	});

	it("should call selectSpy when the item is clicked", async () => {
		render(<ReorderableItem {...getProps()} />);
		const item = await screen.findByRole("listitem");
		fireEvent.click(item);
		expect(selectSpy).toHaveBeenCalledTimes(1);
		expect(selectSpy).toHaveBeenCalledWith("test value");
	});

	it("should dispatch the setDraggedValue method when the dragStart method is called", async () => {
		render(<ReorderableItem {...getProps()} />);
		expect(mockDispatch).toHaveBeenCalledTimes(1);

		const item = await screen.findByRole("listitem");

		fireEvent.dragStart(item, {
			dataTransfer: {
				setData: jest.fn(),
			},
		});

		expect(mockDispatch).toHaveBeenCalledTimes(2);
		expect(mockDispatch).toHaveBeenCalledWith(setDraggedValue("test value"));
	});

	it("should call drop spy with certain spies when it is dropped", async () => {
		render(<ReorderableItem {...getProps()} />);
		const item = await screen.findByRole("listitem");
		fireEvent.drop(item, {
			getAttribute: jest.fn((_) => "test-data-value"),
		});
		expect(dropSpy).toHaveBeenCalled();
		expect(dropSpy).toHaveBeenCalledWith(
			"",
			"test value",
			DraggedOverPosition.NONE,
		);
	});

	it("should set the dragged over position by the position of where the item is hovered over", async () => {
		render(<ReorderableItem {...getProps()} />);
		const item = (await screen.findByRole("listitem")) as any;

		fireEvent.dragOver(item, {
			clientY: 10,
			target: {
				getAttribute: jest.fn(() => "test value"),
				getBoundingClientRect: jest.fn(() => ({
					bottom: 100,
					height: 100,
					left: 0,
					right: 100,
					top: 0,
					width: 100,
					x: 0,
					y: 0,
				})),
			},
		});

		fireEvent.drop(item, {
			getAttribute: jest.fn((_) => "test-data-value"),
		});

		expect(dropSpy).toHaveBeenCalled();
		expect(dropSpy).toHaveBeenCalledWith(
			"",
			"test value",
			DraggedOverPosition.NORTH,
		);
	});

	it("should set the dragged over position to none if the data-value attribute is the same as state's dragged item", async () => {
		render(<ReorderableItem {...getProps()} />);
		const item = (await screen.findByRole("listitem")) as any;

		fireEvent.dragStart(item, {
			dataTransfer: {
				setData: () => jest.fn(),
			},
		});

		fireEvent.dragOver(item, {
			clientY: 10,
			target: {
				getAttribute: jest.fn(() => ""),
				getBoundingClientRect: jest.fn(() => ({
					bottom: 100,
					height: 100,
					left: 0,
					right: 100,
					top: 0,
					width: 100,
					x: 0,
					y: 0,
				})),
			},
		});

		fireEvent.drop(item, {
			getAttribute: jest.fn((_) => "test-data-value"),
		});

		expect(dropSpy).toHaveBeenCalled();
		expect(dropSpy).toHaveBeenCalledWith("", "", DraggedOverPosition.NONE);
	});
});
