import { graphql } from "gatsby";
import * as React from "react";
import { styled } from "styled-components";

import { HeadBase } from "@/components/General";
import { PortfolioHeader, RandomizedBackground } from "@/components/Portfolio";
import { NormalPageContents, Page } from "@/styles/general-components";
import type { RecentProjectItem } from "@/types/portfolio";
import { getFirstParagraphOfContent } from "@/utils/project";
import type { ProjectsQuery } from "@Types/query";
import { portfolioDescription } from "@/data/search";
import {
	AboutMe,
	RecentProjects,
	WorkHistory,
} from "@/components/Portfolio/Sections";
import Tabs from "@/components/Portfolio/Tabs.component";
import { SIZE_LG } from "@/styles/variables";

export const Head: React.FC = () => (
	<HeadBase title="Portfolio" description={portfolioDescription} />
);

const CentralizedItem = styled.div`
	margin: ${SIZE_LG} auto;
	width: 80%;
`;

const Portfolio: React.FC<ProjectsQuery> = ({ data }) => {
	const projects = React.useMemo<RecentProjectItem[]>(() => {
		const mappedProjects = data.allWpProject.nodes
			.map((node) => ({
				title: node.title,
				description: getFirstParagraphOfContent(node.content),
				...node.project,
				firstReleased: new Date(node.project.firstReleased),
				technologies: node.project.technologies.split(", "),
				image: data.allFile.nodes.find(
					(imageNode) =>
						imageNode.name.toLowerCase() ===
						node.title.replace(/\s/g, "_").toLowerCase(),
				),
			}))
			.filter(
				(node) =>
					node.title === "Benyakir Writes" ||
					node.firstReleased.valueOf() > new Date("2023-01-01").valueOf(),
			);
		return mappedProjects;
	}, [data]);

	const [selectedId, setSelectedId] = React.useState<string>("bio");
	const tabs: TabData[] = [
		{
			id: "projects",
			label: "Recent Projects",
			content: <RecentProjects projects={projects} />,
		},
		{
			id: "history",
			label: "Work History",
			content: <WorkHistory />,
		},
		{
			id: "bio",
			label: "About Me",
			content: <AboutMe />,
		},
	];

	return (
		<Page>
			<NormalPageContents>
				<PortfolioHeader />
				<RandomizedBackground>
					<CentralizedItem>
						<Tabs
							tabs={tabs}
							label="Biographical Section"
							selectedId={selectedId}
							onSelect={setSelectedId}
						/>
					</CentralizedItem>
				</RandomizedBackground>
			</NormalPageContents>
		</Page>
	);
};

export const query = graphql`
  query MyQuery {
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
    allFile(filter: { relativePath: { regex: "^/projects/" } }) {
      nodes {
        publicURL
        name
        childImageSharp {
          gatsbyImageData(height: 300, formats: [AVIF, WEBP, AUTO])
        }
      }
    }
    file(extension: { eq: "pdf" }) {
      publicURL
      name
    }
  }
`;

export default Portfolio;
