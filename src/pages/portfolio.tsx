import * as React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { Column, LeadHeading } from "@Styles/general-components";

import LeadPage from "@Layout/LeadPage/LeadPage.component";
import ProjectCard from "@Variant/ProjectCard/ProjectCard.component";
import ProjectFilter from "@Posts/ProjectFilter/ProjectFilter.component";

import { formatAllProjects, getFullTechName } from "@Utils/project";

import { FlattenedProject } from "@Types/posts";
import { ProjectsQuery } from "@Types/query";

const ProjectsPage: React.FC<ProjectsQuery> = ({ data }) => {
    const formattedProjects = formatAllProjects(data.allWpProject.nodes);

    // What these functions is they format arrays so they'll be a list of items, then we want unique items
    // But we still need them to be Arrays, so we have to convert back from sets to arrays
    const allHosts = Array.from(new Set(formattedProjects.filter((p) => !!p.hostedOn).map((p) => p.hostedOn!)))
    // We use flatmaps because each project has their long/short technologies as arrays. We just want all the names of the technologies
    const allTechs = Array.from(new Set(formattedProjects.flatMap((p) => p.longTechnologies)))
    const shortTechs = Array.from(new Set(formattedProjects.flatMap((p) => p.shortTechnologies)))

    const allIcons: FileNode[] = data.allFile.nodes.filter(f => shortTechs.includes(f.name)).map(f => ({ ...f, name: getFullTechName(f.name) }))

    // This will reduce memory complexity because the getIconsForProject function will get run multiple times
    const hashedIcons = allIcons.reduce((acc, next) => ({ ...acc, [next.name]: next.publicURL }), {})
    const getIconsForProject = (project: FlattenedProject): FileNode[] => project.longTechnologies.map(t => ({
        name: t,
        publicURL: hashedIcons[t as keyof typeof hashedIcons]
    }))

    const [filteredProjects, setFilteredProjects] = React.useState<FlattenedProject[]>(formattedProjects);

    return (
        <LeadPage
            filter={
                <ProjectFilter
                    allProjects={formattedProjects}
                    allHosts={allHosts}
                    allTechs={allTechs}
                    onFilter={setFilteredProjects}
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
            <Column>
                <TransitionGroup>
                    {filteredProjects.map((p) => (
                        <CSSTransition
                            key={p.slug}
                            timeout={800}
                            classNames="filterable-card"
                        >
                            <ProjectCard project={p} icons={getIconsForProject(p)} />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </Column>
        </LeadPage>
    );
};

export const query = graphql`
    query {
        allWpProject {
            nodes {
                project {
                    technologies
                    mainLink
                    repoLink
                    hostedOn
                    firstReleased
                    latestUpdate
                }
                title
                content
                slug
            }
        }
        allFile {
            nodes {
                publicURL
                name
            }
        }
    }
`;

export default ProjectsPage;
