import { graphql } from "gatsby";
import * as React from "react";
import { styled } from "styled-components";

import { HeadBase } from "@/components/General";
import { PortfolioHeader, RandomizedBackground } from "@/components/Portfolio";
import { NormalPageContents, Page } from "@/styles/general-components";
import type { RecentProjectItem } from "@/types/portfolio";
import { getFirstParagraphOfContent } from "@/utils/project";
import type { ProjectsQuery } from "@Types/query";
import { portfolioDescription, projects } from "@/data/search";
import {
	AboutMe,
	RecentProjects,
	WorkHistory,
	Tabs,
} from "@/components/Portfolio";
import { SIZE_LG } from "@/styles/variables";
import { TabData } from "@/types/general";

export const Head: React.FC = () => (
	<HeadBase title="Portfolio" description={portfolioDescription} />
);

const CentralizedItem = styled.div`
	margin: ${SIZE_LG} auto;
	width: 80%;
`;

const Portfolio: React.FC<ProjectsQuery> = ({ data }) => {
	const portfolioProjects = React.useMemo<RecentProjectItem[]>(() => {
		const mappedProjects = projects
			.map((node) => ({
				...node,
				content: getFirstParagraphOfContent(node.content),
				image: data.allFile.nodes.find(
					(imageNode) =>
						imageNode.name.toLowerCase() ===
						node.title.replace(/\s/g, "_").toLowerCase(),
				),
			}))
			.filter(
				(node) =>
					node.title === "Benyakir Writes" ||
					node.firstReleased.date.valueOf() > new Date("2023-01-01").valueOf(),
			);
		return mappedProjects;
	}, [data]);

	const tabs: TabData[] = React.useMemo(
		() => [
			{
				id: "projects",
				label: "Recent Projects",
				content: <RecentProjects projects={portfolioProjects} />,
			},
			{
				id: "history",
				label: "Work History",
				content: <WorkHistory />,
			},
			{
				id: "bio",
				label: "About Me",
				content: (
					<AboutMe
						liIcon={data.liIcon.publicURL}
						ghIcon={data.ghIcon.publicURL}
						resume={data.resume.publicURL}
					/>
				),
			},
		],
		[portfolioProjects, data],
	);

	const [selectedId, setSelectedId] = React.useState<string>("bio");

	return (
		<Page>
			<NormalPageContents>
				<PortfolioHeader />
				<RandomizedBackground>
					<CentralizedItem>
						<Tabs
							tabs={tabs}
							label="Portfolio Sections"
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
    allFile(filter: { relativePath: { regex: "^/projects/" } }) {
      nodes {
        publicURL
        name
        childImageSharp {
          gatsbyImageData(height: 200, formats: [AVIF, WEBP, AUTO])
        }
      }
    }
    resume: file(extension: { eq: "pdf" }) {
		publicURL
    }
	ghIcon: file(name: { eq: "Github" }) {
		publicURL
	}
	liIcon: file(name: { eq: "LinkedIn" }) {
		publicURL
	}
  }
`;

export default Portfolio;
