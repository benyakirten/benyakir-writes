import React from "react";
import {
    cleanup,
    render,
    screen,
    fireEvent,
    act,
} from "@testing-library/react";

import BookFilter from "@/components/Posts/WritingFilters/BookFilter/BookFilter.component";

import { cover } from "../../props";
import { createLookupMeta } from "@Utils/posts";

import { FlattenedBookCard } from "@Types/posts";

describe("BookFilter component", () => {
    const testBooks = [
        {
            title: "Test book A",
            content: "Test book A content",
            slug: "test-book-a",
            cover: null,
            meta: createLookupMeta("2019 sep september test book content a test book a"),
            project: null,
            published: {
                date: new Date("2019/09/15"),
                full: "September",
                month: 9,
                short: "SEP",
                year: 2019,
            },
            purchaseLinks: [
                {
                    link: "https://www.a.com",
                    name: "A",
                },
                {
                    link: "https://www.b.com",
                    name: "B",
                },
            ],
            stories: null,
        },
        {
            title: "Test book B",
            content: "test book B content",
            slug: "test-book-b",
            cover,
            meta: createLookupMeta("test story a test project desc a test project name a 2019 oct october test book content b test book b"),
            project: {
                description: "test project desc A",
                title: "test project name A",
                slug: "testprojectAslug",
            },
            published: {
                date: new Date("2019/10/15"),
                full: "October",
                month: 10,
                short: "OCT",
                year: 2019,
            },
            purchaseLinks: [
                {
                    link: "https://www.c.com",
                    name: "C",
                },
                {
                    link: "https://www.d.com",
                    name: "D",
                },
            ],
            stories: [
                {
                    title: "test story A",
                    slug: "teststorysluga",
                },
            ],
        },
    ].sort(
        (a, b) => b.published.date.getTime() - a.published.date.getTime()
    ) as FlattenedBookCard[];

    const filterSpy = jest.fn();

    const props = {
        books: testBooks,
        onFilter: filterSpy,
    };

    beforeEach(() => {
        jest.useFakeTimers();
        filterSpy.mockClear();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
        cleanup();
    });

    it("should render correctly", () => {
        expect(() => render(<BookFilter {...props} />)).not.toThrow();
    });

    it("should render a text element and one foldout that contain means of filtering the elements", async () => {
        render(<BookFilter {...props} />);
        const text = await screen.findByRole("textbox");
        expect(text).toBeTruthy();

        const buttons = await screen.findAllByRole("button");
        expect(buttons.length).toEqual(1);

        fireEvent.click(buttons[0]);
        const datePickerOne = (await screen.findByText("Published before"))
            .nextElementSibling! as HTMLInputElement;
        expect(datePickerOne).toBeTruthy();
        expect(datePickerOne.value).toEqual("2019-10-15");
        const datePickerTwo = (await screen.findByText("Published after"))
            .nextElementSibling! as HTMLInputElement;
        expect(datePickerTwo).toBeTruthy();
        expect(datePickerTwo.value).toEqual("2019-09-15");
    });

    it("should filter the elements based on their meta values if the text input has its value changed", async () => {
        render(<BookFilter {...props} />);
        const text = await screen.findByRole("textbox");

        await act(async () => {
            fireEvent.change(text, { target: { value: "september" } });
            jest.runAllTimers();

            expect(filterSpy).toHaveBeenCalledTimes(2);
            const itemsFiltered = filterSpy.mock.calls[1][0];
            expect(itemsFiltered.length).toEqual(1);
            expect(itemsFiltered[0]).toEqual(testBooks[1]);
        });

        await act(async () => {
            fireEvent.change(text, { target: { value: "october" } });
            jest.runAllTimers();

            expect(filterSpy).toHaveBeenCalledTimes(3);
            const itemsFiltered = filterSpy.mock.calls[2][0];
            expect(itemsFiltered.length).toEqual(1);
            expect(itemsFiltered[0]).toEqual(testBooks[0]);
        });
    });

    it("should filter the elements based on their date of publication if the date pickers have their values changed", async () => {
        render(<BookFilter {...props} />);
        const datePickerBefore = (await screen.findByText("Published before"))
            .nextElementSibling! as HTMLInputElement;
        const datePickerAfter = (await screen.findByText("Published after"))
            .nextElementSibling! as HTMLInputElement;

        await act(async () => {
            fireEvent.change(datePickerAfter, {
                target: { value: "2019-09-30" },
            });
            jest.runAllTimers();

            expect(filterSpy).toHaveBeenCalledTimes(2);
            const itemsFiltered = filterSpy.mock.calls[1][0];
            expect(itemsFiltered.length).toEqual(1);
            expect(itemsFiltered[0]).toEqual(testBooks[0])
        });

        await act(async () => {
            fireEvent.change(datePickerBefore, {
                target: { value: "2019-10-10" },
            });
            jest.runAllTimers();

            expect(filterSpy).toHaveBeenCalledTimes(3);
            const itemsFiltered = filterSpy.mock.calls[2][0];
            expect(itemsFiltered.length).toEqual(0);
        });
    });

    it('should be able to filter the elements in multiple ways at the same time', async () => {
        render(<BookFilter {...props} />);
        const text = await screen.findByRole("textbox");
        const datePickerAfter = (await screen.findByText("Published after")).nextElementSibling! as HTMLInputElement;

        await act(async () => {
            fireEvent.change(datePickerAfter, {
                target: { value: "2019-09-30" },
            });
            jest.runAllTimers();

            expect(filterSpy).toHaveBeenCalledTimes(2);
            const itemsFiltered = filterSpy.mock.calls[1][0];
            expect(itemsFiltered.length).toEqual(1);
            expect(itemsFiltered[0]).toEqual(testBooks[0])
        });

        await act(async () => {
            fireEvent.change(text, { target: { value: "september" } });
            jest.runAllTimers();

            expect(filterSpy).toHaveBeenCalledTimes(3);
            const itemsFiltered = filterSpy.mock.calls[2][0];
            expect(itemsFiltered.length).toEqual(0);
        });
    })
});