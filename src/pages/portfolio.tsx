import { graphql } from "gatsby";
import * as React from "react";

import { HeadBase } from "@/components/General";
import { PortfolioHeader, RandomizedBackground } from "@/components/Portfolio";
import { NormalPageContents, Page } from "@/styles/general-components";
import type { ProjectGridDatum } from "@/types/portfolio";
import { downloadFile } from "@/utils/dom";
import { getFirstParagraphOfContent } from "@/utils/project";
import type { ProjectsQuery } from "@Types/query";
import { portfolioDescription } from "@/data/search";

export const Head: React.FC = () => (
	<HeadBase title="Portfolio" description={portfolioDescription} />
);

const Portfolio: React.FC<ProjectsQuery> = ({ data }) => {
	const projects = React.useMemo<ProjectGridDatum[]>(() => {
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

	return (
		<Page>
			<NormalPageContents>
				<PortfolioHeader />
				<RandomizedBackground>{/*  */}</RandomizedBackground>
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
