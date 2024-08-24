import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { styled } from "styled-components";

import { FlattenedProjectCard } from "@/types/posts";
import CardExterior from "./CardExterior.component";
import { FullContainer, SpanOneTitle, TagContainer } from "./Card.styles";
import { ProjectTech, TechContainer } from "../General";
import { PublishedDate } from "./IconedText.component";
import { useFetchRepoUpdatedDate } from "@/hooks";
import LatestUpdate from "../General/Project/LatestUpdate.component";
import { ProjectImage } from "@/types/portfolio";
import { SIZE_XS } from "@/styles/variables";

type IconQuery = {
	file: null | {
		publicURL: string;
	};
};
const ProjectHost: React.FC<{ host: string }> = ({ host }) => {
	const iconQuery = useStaticQuery<IconQuery>(graphql`
		query {
			file (name: { eq: "Globe" }) {
				publicURL
			}
		}
	`);
	return (
		<ProjectTech tech={host} publicURL={iconQuery.file?.publicURL ?? ""} />
	);
};

const NewProjectCard: React.FC<{ project: FlattenedProjectCard }> = ({
	project,
}) => {
	return (
		<CardExterior slug={`/project/${project.slug}`} columns="1fr 1fr">
			<ProjectCardInterior project={project} />
		</CardExterior>
	);
};

const ExtraMarginedContainer = styled.div`
	margin: ${SIZE_XS} 0;
	grid-column: span 2;
`;

export const ProjectCardInterior: React.FC<{
	project: FlattenedProjectCard;
	image?: ProjectImage;
}> = ({ project, image }) => {
	const latestUpdateState = useFetchRepoUpdatedDate(project.repoLink);
	return (
		<>
			<SpanOneTitle>{project.title}</SpanOneTitle>
			{project.hostedOn && (
				<TagContainer>
					<ProjectHost host={project.hostedOn} />
				</TagContainer>
			)}
			<FullContainer dangerouslySetInnerHTML={{ __html: project.content }} />
			<TechContainer>
				{project.icons.map((i) => (
					<ProjectTech key={i.name} tech={i.name} publicURL={i.publicURL} />
				))}
			</TechContainer>
			{image && (
				<ExtraMarginedContainer>
					<GatsbyImage
						image={image.childImageSharp.gatsbyImageData}
						alt={image.name}
					/>
				</ExtraMarginedContainer>
			)}
			<PublishedDate span={1} date={project.firstReleased.date} />
			<LatestUpdate state={latestUpdateState} />
		</>
	);
};

export default NewProjectCard;
