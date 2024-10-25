import { graphql } from "gatsby";
import * as React from "react";
import { styled } from "styled-components";

import { PortfolioHeader, RandomizedBackground } from "@/components/Portfolio";
import {
	AboutMe,
	RecentProjects,
	Tabs,
	WorkHistory,
} from "@/components/Portfolio";
import { HeadBase } from "@/components/SEO";
import { portfolioDescription, projects } from "@/data/search";
import { NormalPageContents, Page } from "@/styles/general-components";
import { media } from "@/styles/queries";
import { SIZE_LG } from "@/styles/variables";
import { TabData } from "@/types/general";
import type { RecentProjectItem } from "@/types/portfolio";
import type { ProjectsQuery } from "@/types/query";
import { getFirstParagraphOfContent } from "@/utils/project";
import { getQueryParams, setQueryParams } from "@/utils/queries";

export const Head: React.FC = () => (
	<HeadBase title="Portfolio" description={portfolioDescription} />
);

const CentralizedItem = styled.div`
  margin: ${SIZE_LG} auto;
  width: 80%;

  ${media.tablet} {
    width: 100%;
  }
`;

const PortfolioPageContents = styled(NormalPageContents)`
  max-height: 100vh;
  overflow: scroll;
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

	const tabs: [TabData, TabData, TabData] = React.useMemo(
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
						// Let's not waste bandwidth
						resume="https://utfs.io/f/jl5ip7RNwFcAASylqLNhZviu5QWm7rMzboldeBIKnY39H1Sq"
					/>
				),
			},
		],
		[portfolioProjects, data],
	);

	const [selectedId, _setSelectedId] = React.useState<string>(
		getQueryParams().get("section") ?? "bio",
	);
	function setSelectedId(id: string) {
		_setSelectedId(id);
		setQueryParams({ section: id });
	}

	return (
		<RandomizedBackground>
			<Page>
				<PortfolioPageContents>
					<PortfolioHeader />
					<CentralizedItem>
						<Tabs
							tabs={tabs}
							label="Portfolio Sections"
							selectedId={selectedId}
							onSelect={setSelectedId}
						/>
					</CentralizedItem>
				</PortfolioPageContents>
			</Page>
		</RandomizedBackground>
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
    ghIcon: file(name: { eq: "Github" }) {
      publicURL
    }
    liIcon: file(name: { eq: "LinkedIn" }) {
      publicURL
    }
  }
`;

export default Portfolio;
