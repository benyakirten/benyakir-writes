import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { styled } from "styled-components";

import { FlattenedProjectCard } from "@/types/posts";
import CardExterior from "./CardExterior.component";
import { FullContainer, TagContainer } from "./Card.styles";
import {
	LatestUpdate,
	ProjectHost,
	ProjectTech,
	TechContainer,
} from "../General";
import { PublishedDate } from "./IconedText.component";
import { useFetchRepoUpdatedDate } from "@/hooks";
import { ProjectImage } from "@/types/portfolio";
import { SIZE_XS } from "@/styles/variables";

const ProjectCardInterior: React.FC<{
	project: FlattenedProjectCard;
	image?: ProjectImage;
}> = ({ project, image }) => {
	const latestUpdateState = useFetchRepoUpdatedDate(project.repoLink);
	return (
		<>
			<FullContainer>{project.title}</FullContainer>
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

const ProjectCard: React.FC<
	FlattenedProjectCard & {
		image?: ProjectImage;
	}
> = ({ image, ...props }) => {
	return (
		<CardExterior slug={`/project/${props.slug}`} columns="1fr 1fr">
			<ProjectCardInterior project={props} image={image} />
		</CardExterior>
	);
};

const ExtraMarginedContainer = styled.div`
	margin: ${SIZE_XS} 0;
	grid-column: span 2;
`;

export default ProjectCard;
