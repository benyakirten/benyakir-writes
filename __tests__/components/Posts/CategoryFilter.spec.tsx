import React from "react";

import {
    cleanup,
    render,
    screen,
    fireEvent,
    act,
} from "@TestUtils";
import CategoryFilter from "@Posts/BlogFilters/CategoryFilter/CategoryFilter.component";
import { createLookupMeta } from "@Utils/posts";
import { FlattenedBlogCard} from "@Types/posts";

describe("CategoryFilter component", () => {
    const testPosts = [
        {
            title: "blog post D",
            slug: "blog-post-d",
            content: 'irrelevant',
            excerpt: 'irrelevant',
            published: {
                month: 8,
                year: 2019,
                full: "August",
                short: "AUG",
                date: new Date("2019/08/15"),
            },
            categories: ["cat abcd"],
            tags: null,
            meta: createLookupMeta("2019 8 august blog-post-c blog post c"),
        },
        {
            title: "blog post A",
            slug: "blog-post-a",
            content: "irrelevant",
            excerpt: "irrelevant",
            published: {
                month: 9,
                year: 2019,
                full: "September",
                short: "SEP",
                date: new Date("2019/09/15"),
            },
            categories: null,
            tags: ["tag abc"],
            meta: createLookupMeta("2019 sep 9 september blogpostaslug blog post a tag abc"),
        },
        {
            title: "blog post E",
            slug: "blog-post-e",
            content: 'irrelevant',
            excerpt: 'irrelevant',
            published: {
                month: 8,
                year: 2020,
                full: "August",
                short: "AUG",
                date: new Date("2020/08/15"),
            },
            categories: ["cat abcd"],
            tags: ["tag abc"],
            meta: createLookupMeta("2020 8 august blog-post-e blog post e cat abcd tag abc"),
        },
        {
            title: "blog post B",
            slug: "blog-post-b",
            content: "irrelevant",
            excerpt: "irrelevant",
            published: {
                month: 9,
                year: 2020,
                full: "September",
                short: "SEP",
                date: new Date("2020/09/15"),
            },
            categories: ["cat abcd"],
            tags: null,
            meta: createLookupMeta("2020 sep 9 september blog-post-b blog post b cat abcd"),
        },
        {
            title: "blog post F",
            slug: "blog-post-f",
            content: 'irrelevant',
            excerpt: 'irrelevant',
            published: {
                month: 8,
                year: 2021,
                full: "August",
                short: "AUG",
                date: new Date("2021/08/15"),
            },
            categories: ["cat abcd"],
            tags: null,
            meta: createLookupMeta("2021 9 august blog-post-f blog post f cat abcd"),
        },
        {
            title: "blog post C",
            slug: "blog-post-c",
            content: 'irrelevant',
            excerpt: 'irrelevant',
            published: {
                month: 9,
                year: 2021,
                full: "September",
                short: "SEP",
                date: new Date("2021/09/15"),
            },
            categories: ["cat abcd"],
            tags: null,
            meta: createLookupMeta("2021 sep 9 september blog-post-c blog post c cat abcd"),
        },
    ].sort((a, b) => b.published.date.getTime() - a.published.date.getTime()) as FlattenedBlogCard[];

    const filterSpy = jest.fn();

    const props = {
        allPosts: testPosts,
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
        expect(() => render(<CategoryFilter {...props} />)).not.toThrow();
    });

    it("should render a text element and two foldouts that contain means of filtering the elements", async () => {
        render(<CategoryFilter {...props} />);
        const text = await screen.findByRole("textbox");
        expect(text).toBeTruthy();

        const buttons = await screen.findAllByRole("button");
        expect(buttons.length).toEqual(3);

        fireEvent.click(buttons[1]);
        const datePickerOne = (await screen.findByText("Published before")).nextElementSibling! as HTMLInputElement;
        expect(datePickerOne).toBeTruthy();
        expect(datePickerOne.value).toEqual('2021-09-15')
        const datePickerTwo = (await screen.findByText("Published after")).nextElementSibling! as HTMLInputElement;
        expect(datePickerTwo).toBeTruthy();
        expect(datePickerTwo.value).toEqual('2019-08-15')

        fireEvent.click(buttons[2]);
        const multipleChoiceTwo = await screen.findByText("tag abc");
        expect(multipleChoiceTwo).toBeTruthy();
    });

    it("should filter the elements based on their meta values if the text input has its value changed", async () => {
        render(<CategoryFilter {...props} />);
        const text = await screen.findByRole("textbox");

        await act(async () => {
            fireEvent.change(text, { target: { value: "september" } });
            jest.runAllTimers();
    
            expect(filterSpy).toHaveBeenCalledTimes(2);
            const itemsFiltered = filterSpy.mock.calls[1][0]
            expect(itemsFiltered.length).toEqual(3)
            expect(filterSpy).toHaveBeenCalledWith([
                testPosts[0],
                testPosts[2],
                testPosts[4],
            ]);
        })

        await act(async () => {
            fireEvent.change(text, { target: { value: "august" } });
            jest.runAllTimers();
    
            
            expect(filterSpy).toHaveBeenCalledTimes(3);
            const itemsFiltered = filterSpy.mock.calls[2][0]
            expect(itemsFiltered.length).toEqual(3)
            expect(filterSpy).toHaveBeenCalledWith([
                testPosts[1],
                testPosts[3],
                testPosts[5],
            ]);
        })
    });

    it('should filter the elements based on their date of publication if the date pickers have their values changed', async () => {
        render(<CategoryFilter {...props} />);
        const datePickerBefore = (await screen.findByText("Published before")).nextElementSibling! as HTMLInputElement;
        const datePickerAfter = (await screen.findByText("Published after")).nextElementSibling! as HTMLInputElement;

        await act(async () => {
            fireEvent.change(datePickerAfter, { target: { value: '2020-01-15' } })
            jest.runAllTimers()

            expect(filterSpy).toHaveBeenCalledTimes(2);
            const itemsFiltered = filterSpy.mock.calls[1][0]
            expect(itemsFiltered.length).toEqual(4)
        })

        await act(async () => {
            fireEvent.change(datePickerBefore, { target: { value: '2020-12-15' } })
            jest.runAllTimers()

            expect(filterSpy).toHaveBeenCalledTimes(3);
            const itemsFiltered = filterSpy.mock.calls[2][0]
            expect(itemsFiltered.length).toEqual(2)
        })
    })

    it('should filter the elements by tag if any of the tags are selected', async () => {
        render(<CategoryFilter {...props} />);
        const buttons = await screen.findAllByRole("button");
        fireEvent.click(buttons[2]);
        const multipleChoice = await screen.findByText("tag abc");

        await act(async () => {
            fireEvent.click(multipleChoice)
            jest.runAllTimers()

            expect(filterSpy).toHaveBeenCalledTimes(2);
            const itemsFiltered = filterSpy.mock.calls[1][0]
            expect(itemsFiltered.length).toEqual(2)
        })
    })

    it('should be able to filter the elements in multiple ways at the same time', async () => {
        render(<CategoryFilter {...props} />);
        const buttons = await screen.findAllByRole("button");
        const datePickerAfter = (await screen.findByText("Published after")).nextElementSibling! as HTMLInputElement;

        await act(async () => {
            fireEvent.change(datePickerAfter, { target: { value: '2020-01-15' } })
            jest.runAllTimers()

            expect(filterSpy).toHaveBeenCalledTimes(2);
            const itemsFiltered = filterSpy.mock.calls[1][0]
            expect(itemsFiltered.length).toEqual(4)
        })

        await act(async () => {
            fireEvent.click(buttons[2])
            const multipleChoiceTags = await screen.findByText("tag abc");
            fireEvent.click(multipleChoiceTags)
            jest.runAllTimers()

            expect(filterSpy).toHaveBeenCalledTimes(3);
            const itemsFiltered = filterSpy.mock.calls[2][0]
            expect(itemsFiltered.length).toEqual(1)
        })
    })
});
