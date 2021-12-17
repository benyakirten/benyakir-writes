import React from "react";

import {
    render,
    screen,
    cleanup,
    waitFor,
    fireEvent,
} from "@TestUtils";

import { navigate } from "gatsby";

import Project from "@/templates/Project.template";
import { WpProject } from "@Types/query";

import { allIcons } from "@TestProps";

describe("project template", () => {
    const dummyProjects: WpProject[] = [
        {
            data: {
                wpProject: {
                    title: "test project A",
                    content: "test project A content",
                    slug: "test-project-a-slug",
                    project: {
                        technologies: "py, svelte",
                        firstReleased: "09/15/2019",
                        latestUpdate: "11/15/2019",
                    },
                },
                allFile: {
                    nodes: allIcons
                },
            },
        },
        {
            data: {
                wpProject: {
                    title: "test project B",
                    content: "test project B content",
                    slug: "test-project-b-slug",
                    project: {
                        technologies: "sass, ng",
                        firstReleased: "10/15/2019",
                        hostedOn: "Google",
                        mainLink: "https://www.google.com",
                        repoLink: "test-repo-link",
                    },
                },
                allFile: {
                    nodes: allIcons,
                },
            },
        },
    ];
    (global as any).fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ pushed_at: "2011-01-26T19:06:43Z" }),
        })
    );

    jest.mock("gatsby");

    beforeEach(() => {
        (fetch as any).mockClear();
        (navigate as any).mockClear();
    });

    afterEach(cleanup);

    it("should render correctly", () => {
        expect(() =>
            render(<Project data={dummyProjects[0].data} />)
        ).not.toThrow();
    });

    it('should render a LeadHeading with the title of the project', async () => {
        render(<Project data={dummyProjects[0].data} />)
        const titleOne = await screen.findByText("test project A")
        expect(titleOne).toBeTruthy()
        expect(titleOne.tagName).toEqual('H1')

        cleanup()

        render(<Project data={dummyProjects[1].data} />)
        const titleTwo = await screen.findByText("test project B")
        expect(titleTwo).toBeTruthy()
        expect(titleTwo.tagName).toEqual('H1')
    })

    describe("the latest update", () => {
        describe("with repo", () => {
            it("should make a call to fetch with the repoLink if it exists as soon as the component renders", async () => {
                render(<Project data={dummyProjects[1].data} />);
                expect(fetch).toHaveBeenCalled();
                expect(fetch).toHaveBeenCalledWith("test-repo-link");
            });

            it("should display the latest update information if the information was successfully retrieved", async () => {
                render(<Project data={dummyProjects[1].data} />);
                const updated = await waitFor(() =>
                    screen.getByText("Latest Update: January 26, 2011")
                );
                expect(updated).toBeTruthy();
            });

            it("should display the error message if the information cannot be successfully retrieved", async () => {
                (fetch as jest.Mock).mockImplementationOnce(() => {
                    Promise.resolve({
                        ok: false,
                    });
                });
                render(<Project data={dummyProjects[1].data} />);
                const err = await waitFor(() =>
                    screen.getByText("Latest Update: Unable to fetch data")
                );
                expect(err).toBeTruthy();
            });

            it("should display the error message if fetch function raises an error", async () => {
                (fetch as jest.Mock).mockImplementationOnce(() => {
                    throw new Error("An error!");
                });
                render(<Project data={dummyProjects[1].data} />);
                const err = await waitFor(() =>
                    screen.getByText("Latest Update: Unable to fetch data")
                );
                expect(err).toBeTruthy();
            });
        });

        describe("without a repo", () => {
            it("should not make a call to fetch if there is no repo link", () => {
                render(<Project data={dummyProjects[0].data} />);
                expect(fetch).not.toHaveBeenCalled();
            });
        });
    });

    it('should render a div that contains the content of the project', async () => {
        render(<Project data={dummyProjects[0].data} />);
        const contentOne = await screen.findByText("test project A content")
        expect(contentOne).toBeTruthy()
        expect(contentOne.tagName).toEqual("DIV")

        cleanup()

        render(<Project data={dummyProjects[1].data} />);
        const contentTwo = await screen.findByText("test project B content")
        expect(contentTwo).toBeTruthy()
        expect(contentTwo.tagName).toEqual("DIV")
    })

    describe("buttons", () => {
        it("should render buttons that navigate to the main link and repo link if they exist", async () => {
            render(<Project data={dummyProjects[1].data} />);
            const generalInfo = await screen.findByText("Links");
            const buttonRow = generalInfo.nextElementSibling!
            expect(buttonRow.childElementCount).toEqual(2);

            const buttonOne = buttonRow?.children[0];
            const labelOne = buttonOne?.querySelector("span");
            expect(labelOne?.textContent).toEqual("On Google");
            fireEvent.click(buttonOne!);
            expect(navigate).toHaveBeenCalledTimes(1);
            expect(navigate).toHaveBeenCalledWith("https://www.google.com");

            const buttonTwo = buttonRow?.children[1];
            const labelTwo = buttonTwo?.querySelector("span");
            expect(labelTwo?.textContent).toEqual("On GitHub");
            fireEvent.click(buttonTwo!);
            expect(navigate).toHaveBeenCalledTimes(2);
            expect(navigate).toHaveBeenCalledWith("test-repo-link");
        });

        it("should not render the above buttons if they don't exist", async () => {
            render(<Project data={dummyProjects[0].data} />);
            const generalInfo = await screen.findByText("Information");
            expect(generalInfo.parentElement?.childElementCount).toEqual(2);
        });
    });

    describe("icons", () => {
        it("should render one or more rows of icons for the technologies", async () => {
            render(<Project data={dummyProjects[0].data} />);
            let icons = await screen.findAllByRole('img')
            const iconsOne = icons.slice(1)
            expect(iconsOne[0].getAttribute('alt')).toEqual('Python')
            expect(iconsOne[0].getAttribute('src')?.endsWith('py.svg')).toBe(true)

            expect(iconsOne[1].getAttribute('alt')).toEqual('Svelte')
            expect(iconsOne[1].getAttribute('src')?.endsWith('svelte.svg')).toBe(true)

            cleanup()
            render(<Project data={dummyProjects[1].data} />);
            icons = await screen.findAllByRole('img')
            const iconsTwo = icons.slice(1)
            expect(iconsTwo[0].getAttribute('alt')).toEqual('Angular')
            expect(iconsTwo[0].getAttribute('src')?.endsWith('ng.svg')).toBe(true)

            expect(iconsTwo[1].getAttribute('alt')).toEqual('Sass')
            expect(iconsTwo[1].getAttribute('src')?.endsWith('sass.svg')).toBe(true)
        });
    });
});
