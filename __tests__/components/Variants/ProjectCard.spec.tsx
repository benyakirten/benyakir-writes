import * as React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import { navigate } from "gatsby";

import ProjectCard from "@Variant/ProjectCard/ProjectCard.component";
import { FlattenedProject } from "@Types/posts";

import { allIcons } from "../../props";

describe("ProjectCard component", () => {
    jest.mock("gatsby");

    const flattenedProjects: FlattenedProject[] = [
        {
            title: "project title A",
            content:
                "project content A project content A project content A project content A project content A project content A project content A project content A project content A project content A project content A project content A project content A project content A project content A project content A project content A project content A project content A project content A project content A ",
            slug: "projectaslug",
            shortTechnologies: ["py", "ng"],
            longTechnologies: ["Python", "Angular"],
            firstReleased: {
                date: new Date("09/15/2019"),
                short: "SEP",
                full: "September",
                month: 9,
                year: 2019,
            },
            meta: "python py sep september 2019 project content a projectaslug project title a",
        },
        {
            title: "project title B",
            content:
                "project content B project content A project content A project content A project content A project content A project content A project content A project content A project content A project content A project content A project content A project content A project content A project content A project content A project content A project content A project content A project content A ",
            slug: "projectbslug",
            shortTechnologies: ["vue", "react", "ts", "gql"],
            longTechnologies: ["Vue", "React", "TypeScript", "GraphQL"],
            firstReleased: {
                date: new Date("10/15/2019"),
                short: "OCT",
                full: "October",
                month: 10,
                year: 2019,
            },
            mainLink: 'https://www.google.com',
            repoLink: 'https://www.github.com/example',
            hostedOn: 'Google',
            meta: "python py sep september 2019 project content a projectaslug project title a",
        }
    ];

    beforeEach((navigate as any).mockClear);

    afterEach(cleanup);

    const projectAIcons = allIcons.filter(i => flattenedProjects[0].shortTechnologies.includes(i.name))
    const projectBIcons = allIcons.filter(i => flattenedProjects[1].shortTechnologies.includes(i.name))

    it("should render correctly", () => {
        expect(() =>
            render(<ProjectCard icons={projectAIcons} project={flattenedProjects[0]} />)
        ).not.toThrow();
        cleanup()
        expect(() =>
            render(<ProjectCard icons={projectBIcons} project={flattenedProjects[1]} />)
        ).not.toThrow();
    });

    it("should render a title that links to the project page", async () => {
        render(<ProjectCard icons={projectAIcons} project={flattenedProjects[0]} />);
        const titleOne = await screen.findByText("project title A");
        expect(titleOne).toBeTruthy();
        expect(titleOne.getAttribute("href")).toEqual("/project/projectaslug");
        expect(titleOne.parentElement?.tagName).toEqual("H3");

        cleanup()

        render(<ProjectCard icons={projectBIcons} project={flattenedProjects[1]} />);
        const titleTwo = await screen.findByText("project title B");
        expect(titleTwo).toBeTruthy();
        expect(titleTwo.getAttribute("href")).toEqual("/project/projectbslug");
        expect(titleTwo.parentElement?.tagName).toEqual("H3");
    });

    it("should render a div with a portion of the content next to the title", async () => {
        render(<ProjectCard icons={projectAIcons} project={flattenedProjects[0]} />);
        const titleOne = await screen.findByText("project title A");
        const contentOne = titleOne.parentElement?.nextElementSibling!;
        expect(contentOne.textContent!.indexOf("project content A")).not.toEqual(
            -1
        );
        expect(contentOne.textContent!.length).toBeGreaterThan(150);
        expect(contentOne.textContent!.length).toBeLessThan(210);

        cleanup()

        render(<ProjectCard icons={projectBIcons} project={flattenedProjects[1]} />);
        const titleTwo = await screen.findByText("project title B");
        const contentTwo = titleTwo.parentElement?.nextElementSibling!;
        expect(contentTwo.textContent!.indexOf("project content B")).not.toEqual(
            -1
        );
        expect(contentTwo.textContent!.length).toBeGreaterThan(150);
        expect(contentTwo.textContent!.length).toBeLessThan(210);
    });

    describe("buttons", () => {
        it("should render a button that navigates to the project page", async () => {
            render(<ProjectCard icons={projectAIcons} project={flattenedProjects[0]} />);
            const buttonOne = await screen.getByText("More Information")
            fireEvent.click(buttonOne)
            expect(navigate).toHaveBeenCalledTimes(1)
            expect(navigate).toHaveBeenCalledWith('/project/projectaslug')

            cleanup()

            render(<ProjectCard icons={projectBIcons} project={flattenedProjects[1]} />);
            const buttonTwo = await screen.getByText("More Information")
            fireEvent.click(buttonTwo)
            expect(navigate).toHaveBeenCalledTimes(2)
            expect(navigate).toHaveBeenCalledWith('/project/projectbslug')
        });

        it('should render a button if the project is hosted to it that navigates to the link', async () => {
            render(<ProjectCard icons={projectBIcons} project={flattenedProjects[1]} />);
            const button = await screen.getByText("On Google")
            fireEvent.click(button)
            expect(navigate).toHaveBeenCalledTimes(1)
            expect(navigate).toHaveBeenCalledWith('https://www.google.com')
        })

        it('should render a button if it has a repo to it that navigates to it', async () => {
            render(<ProjectCard icons={projectBIcons} project={flattenedProjects[1]} />);
            const button = await screen.getByText("On GitHub")
            fireEvent.click(button)
            expect(navigate).toHaveBeenCalledTimes(1)
            expect(navigate).toHaveBeenCalledWith('https://www.github.com/example')
        })

        it('should not render either button if there is no repo and no host', async () => {
            render(<ProjectCard icons={projectAIcons} project={flattenedProjects[0]} />);
            const buttons = await screen.findAllByRole("button")
            expect(buttons.length).toEqual(1)
        })
    })

    it('should render a title with an icon for every technology the project uses', async () => {
        render(<ProjectCard icons={projectAIcons} project={flattenedProjects[0]} />);
        const titleOne = await screen.findByText("Technologies Used")
        expect(titleOne.tagName).toEqual("H3")
        const iconsOne = await screen.findAllByRole("img")
        expect(iconsOne.length).toEqual(2)

        cleanup()

        render(<ProjectCard icons={projectBIcons} project={flattenedProjects[1]} />);
        const titleTwo = await screen.findByText("Technologies Used")
        expect(titleTwo.tagName).toEqual("H3")
        const iconsTwo = await screen.findAllByRole("img")
        expect(iconsTwo.length).toEqual(4)
    })
});
