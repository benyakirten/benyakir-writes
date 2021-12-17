import * as React from "react";
import { Helmet } from "react-helmet";

import { BigParagraph, Grouping } from "@Styles/general-components";

import LeadPage from "@Layout/LeadPage/LeadPage.component";
import Paginate from "@Layout/Paginate/Paginate.component";
import ProjectCard from "@Variant/Cards/ProjectCard/ProjectCard.component";
import ProjectFilter from "@Posts/ProjectFilter/ProjectFilter.component";

import usePagination from "@/hooks/usePagination.hook";

import projectsJson from "@WPData/Projects/projects.json";
import projectsMisc from "@WPData/Projects/misc.json";

import { FlattenedProjectCard } from "@Types/posts";
import CustomLink from "@/components/General/CustomLink/CustomLink.component";

const ProjectsPage: React.FC = () => {
    const allHosts = React.useMemo<string[]>(
        () => projectsMisc.hosts,
        [projectsMisc]
    );
    const allTechs = React.useMemo<string[]>(
        () => projectsMisc.longTechs,
        [projectsMisc]
    );

    // JSON stringify makes a date into a string - so we need to convert it back
    const preparedProjects = React.useMemo<FlattenedProjectCard[]>(
        () =>
            projectsJson.map((p: FlattenedProjectCard) => ({
                ...p,
                firstReleased: {
                    ...p.firstReleased,
                    date: new Date(p.firstReleased.date),
                },
            })),
        [projectsJson]
    );

    const projectPagination =
        usePagination<FlattenedProjectCard>(preparedProjects);

    return (
        <LeadPage
            title="Projects"
            filter={
                <ProjectFilter
                    allProjects={preparedProjects}
                    allHosts={allHosts}
                    allTechs={allTechs}
                    onFilter={projectPagination.setCurrentItems}
                />
            }
        >
            <Helmet>
                <title>Benyakir Writes - Portfolio</title>
                <meta
                    name="description"
                    content="A view of all of my completed projects with various details. They can be sorted by a variety of means,
                    including dynamically-generated criteria such as web hosts and what technologies are used to power them."
                />
            </Helmet>
            <BigParagraph marginVertical="2rem">
                I am a fullstack engineer with a focus on frontend. I have
                experience with normal JavaScript as well as Angular, React,
                Vue, Svelte and their JAMStack equivalents, such as Gatsby and
                SvelteKit. I use different techniques and technologies for each of my
                projects so I'm always learning something new and have a wide arsenal of tools available.
                If you want to hire me for a project, visit the <CustomLink to="/contact">contact page</CustomLink>.
            </BigParagraph>
            <Grouping>
                <Paginate {...projectPagination} El={ProjectCard} />
            </Grouping>
        </LeadPage>
    );
};

export default ProjectsPage;
