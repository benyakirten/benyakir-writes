import React from "react";

import {
    cleanup,
    render,
    screen,
    fireEvent,
    act,
} from "@TestUtils";
import ProjectFilter from "@Posts/ProjectFilter/ProjectFilter.component";
import { createLookupMeta } from "@Utils/posts";

import { FlattenedProjectCard } from "@Types/posts";

describe("ProjectFilter component", () => {
    const testProjects = [
        {
            title: 'project title A',
            content: 'project content A',
            slug: 'projectaslug',
            shortTechnologies: ['py'],
            longTechnologies: ['Python'],
            firstReleased: {
                date: new Date('09/15/2019'),
                short: 'SEP',
                full: 'September',
                month: 9,
                year: 2019
            },
            meta: createLookupMeta('python py sep september 2019 project content a projectaslug project title a')
        },
        {
            title: 'project title B',
            content: 'project content B',
            slug: 'projectbslug',
            shortTechnologies: ['gql', 'ng'],
            longTechnologies: ['GraphQL', 'Angular'],
            mainLink: 'https://www.google.com',
            hostedOn: 'Google',
            repoLink: 'https://www.github.com/',
            firstReleased: {
                date: new Date('10/15/2019'),
                short: 'OCT',
                full: 'October',
                month: 10,
                year: 2019
            },
            latestUpdate: {
                date: new Date('11/15/2019'),
                short: 'NOV',
                full: 'November',
                month: 11,
                year: 2019
            },

            meta: createLookupMeta('repo github angular graphql ng gql oct october 2019 google project content b projectbslug project title b')
        }
    ].sort(
        (a, b) => b.firstReleased.date.getTime() - a.firstReleased.date.getTime()
    ) as FlattenedProjectCard[];

    const filterSpy = jest.fn();

    const props = {
        allProjects: testProjects,
        allHosts: ['Google'],
        allTechs: ['Python', 'GraphQL', 'Angular'],
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
        expect(() => render(<ProjectFilter {...props} />)).not.toThrow();
    });

    it("should render a text element and three foldout that contain means of filtering the elements", async () => {
        render(<ProjectFilter {...props} />);
        const text = await screen.findByRole("textbox");
        expect(text).toBeTruthy();

        const buttons = await screen.findAllByRole("button");
        expect(buttons.length).toEqual(4);

        fireEvent.click(buttons[1]);
        const datePickerOne = (await screen.findByText("Published before"))
            .nextElementSibling! as HTMLInputElement;
        expect(datePickerOne).toBeTruthy();
        expect(datePickerOne.value).toEqual("2019-10-15");
        const datePickerTwo = (await screen.findByText("Published after"))
            .nextElementSibling! as HTMLInputElement;
        expect(datePickerTwo).toBeTruthy();
        expect(datePickerTwo.value).toEqual("2019-09-15");

        fireEvent.click(buttons[2]);
        const hostChoice = await screen.findByText("Google");
        expect(hostChoice).toBeTruthy();

        fireEvent.click(buttons[3]);
        const techChoiceOne = await screen.findByText("Python");
        expect(techChoiceOne).toBeTruthy();
        const techChoiceTwo = await screen.findByText("GraphQL");
        expect(techChoiceTwo).toBeTruthy();
        const techChoiceThree = await screen.findByText("Angular");
        expect(techChoiceThree).toBeTruthy();
    });

    it("should filter the elements based on their meta values if the text input has its value changed", async () => {
        render(<ProjectFilter {...props} />);
        const text = await screen.findByRole("textbox");

        await act(async () => {
            fireEvent.change(text, { target: { value: "september" } });
            jest.runAllTimers();

            expect(filterSpy).toHaveBeenCalledTimes(2);
            const itemsFiltered = filterSpy.mock.calls[1][0];
            expect(itemsFiltered.length).toEqual(1);
            expect(itemsFiltered[0]).toEqual(testProjects[1]);
        });

        await act(async () => {
            fireEvent.change(text, { target: { value: "october" } });
            jest.runAllTimers();

            expect(filterSpy).toHaveBeenCalledTimes(3);
            const itemsFiltered = filterSpy.mock.calls[2][0];
            expect(itemsFiltered.length).toEqual(1);
            expect(itemsFiltered[0]).toEqual(testProjects[0]);
        });
    });

    it("should filter the elements based on their date of publication if the date pickers have their values changed", async () => {
        render(<ProjectFilter {...props} />);
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
            expect(itemsFiltered[0]).toEqual(testProjects[0])
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

    it('should be able to filter the elements based on their host', async () => {
        render(<ProjectFilter {...props} />);
        const buttons = await screen.findAllByRole("button");
        fireEvent.click(buttons[2])

        const hostChoice = await screen.findByText("Google");
        await act(async () => {
            fireEvent.click(hostChoice)
            jest.runAllTimers();

            expect(filterSpy).toHaveBeenCalledTimes(2);
            const itemsFiltered = filterSpy.mock.calls[1][0];
            expect(itemsFiltered.length).toEqual(1);
            expect(itemsFiltered[0]).toEqual(testProjects[0])
        })
    })

    it('should be able to filter the elements based on the technology used', async () => {
        render(<ProjectFilter {...props} />);
        const buttons = await screen.findAllByRole("button");
        fireEvent.click(buttons[3])
        const techPython = await screen.findByText("Python");
        const techAngular = await screen.findByText("Angular");
        await act(async () => {
            fireEvent.click(techPython)
            jest.runAllTimers();

            expect(filterSpy).toHaveBeenCalledTimes(2);
            const itemsFiltered = filterSpy.mock.calls[1][0];
            expect(itemsFiltered.length).toEqual(1);
            expect(itemsFiltered[0]).toEqual(testProjects[1])
        })

        await act(async () => {
            fireEvent.click(techPython)
            jest.runAllTimers();

            expect(filterSpy).toHaveBeenCalledTimes(3);
            const itemsFiltered = filterSpy.mock.calls[2][0];
            expect(itemsFiltered.length).toEqual(2);
        })

        await act(async () => {
            fireEvent.click(techAngular)
            jest.runAllTimers();

            expect(filterSpy).toHaveBeenCalledTimes(4);
            const itemsFiltered = filterSpy.mock.calls[3][0];
            expect(itemsFiltered.length).toEqual(1);
            expect(itemsFiltered[0]).toEqual(testProjects[0])
        })
    })

    it('should be able to filter the elements in multiple ways at the same time', async () => {
        render(<ProjectFilter {...props} />);
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
            expect(itemsFiltered[0]).toEqual(testProjects[0])
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