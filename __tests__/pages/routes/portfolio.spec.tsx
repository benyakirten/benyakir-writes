import * as React from "react";
import { cleanup, render, screen, act, fireEvent } from "@testing-library/react";

import ProjectsPage from "@/pages/portfolio";
import { ProjectsQuery } from "@Types/query";
import { allIcons } from "../../props";

describe("portfolio page", () => {
    const sampleData: ProjectsQuery = {
        data: {
            allWpProject: {
                nodes: [
                    {
                        title: "project A",
                        slug: "project-a",
                        content: "project A content",
                        project: {
                            technologies: "py, sass",
                            mainLink: "https://a.com",
                            repoLink: "https://github.com/example1",
                            hostedOn: "A",
                            firstReleased: "09/15/2019",
                            latestUpdate: "09/15/2020",
                        },
                    },
                    {
                        title: "project B",
                        slug: "project-b",
                        content: "project B content",
                        project: {
                            technologies: "ng, vue",
                            mainLink: "https://b.com",
                            repoLink: "https://github.com/example2",
                            hostedOn: "B",
                            firstReleased: "10/15/2019",
                        },
                    },
                    {
                        title: "project C",
                        slug: "project-c",
                        content: "project C content",
                        project: {
                            technologies: "py, ts, react",
                            mainLink: "https://c.com",
                            repoLink: "https://github.com/example3",
                            hostedOn: "C",
                            firstReleased: "11/15/2019",
                        },
                    },
                ],
            },
            allFile: {
                nodes: allIcons,
            },
        },
    };

    beforeEach(() => {
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.runOnlyPendingTimers()
        jest.useRealTimers()
        cleanup()
    })

    it("should render correctly", () => {
        expect(() => render(<ProjectsPage {...sampleData} />))
    });

    it('should render a main heading', async () => {
        render(<ProjectsPage {...sampleData} />)
        const title = await screen.getByText("Projects")
        expect(title).toBeTruthy()
        expect(title.tagName).toEqual("H1")
    })

    it('should render a project card for every project in the query', async () => {
        render(<ProjectsPage {...sampleData} />)
        const cards = await screen.findAllByRole("article")
        expect(cards.length).toEqual(3)
    })

    it('should render only the filtered items if a filter is applied', async () => {
        render(<ProjectsPage {...sampleData} />)

        await act(async () => {
            const input = await screen.findByRole("textbox")
            fireEvent.change(input, { target: { value: 'Python'} })

            jest.runAllTimers()
            
            const projects = await screen.findAllByRole('article')
            expect(projects.length).toEqual(2)
        })
    })
});
