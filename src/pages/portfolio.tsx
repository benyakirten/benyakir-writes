import * as React from "react";
import { Helmet } from "react-helmet";

import { Grouping, LeadHeading } from "@Styles/general-components";

import LeadPage from "@Layout/LeadPage/LeadPage.component";
import Paginate from "@Layout/Paginate/Paginate.component";
import ProjectCard from "@Variant/ProjectCard/ProjectCard.component";
import ProjectFilter from "@Posts/ProjectFilter/ProjectFilter.component";

import usePagination from "@Hooks/usePagination";

import projectsJson from "@WPData/Projects/projects.json";
import projectsMisc from "@WPData/Projects/misc.json";

import { FlattenedProjectCard } from "@Types/posts";

const ProjectsPage: React.FC = () => {
    const allHosts = React.useMemo<string[]>(
        () => projectsMisc.hosts,
        [projectsMisc]
    );
    const allTechs = React.useMemo<string[]>(
        () => projectsMisc.longTechs,
        [projectsMisc]
    );

    // JSON stringify makes a date into a string - so we need to convert it back here
    const preparedProjects = React.useMemo<FlattenedProjectCard[]>(
        () => (
            projectsJson.map((p: FlattenedProjectCard) => ({
                ...p,
                firstReleased: {
                    ...p.firstReleased,
                    date: new Date(p.firstReleased.date),
                },
            }))
        ),
        [projectsJson]
    );

    const projectPagination = usePagination<FlattenedProjectCard>(preparedProjects);

    return (
        <LeadPage
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
            <LeadHeading>Projects</LeadHeading>
            <Grouping>
                <Paginate {...projectPagination} El={ProjectCard} />
            </Grouping>
        </LeadPage>
    );
};

export default ProjectsPage;
