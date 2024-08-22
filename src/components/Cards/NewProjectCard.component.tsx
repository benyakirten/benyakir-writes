import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { styled } from "styled-components";

import { FlattenedProjectCard } from "@/types/posts";
import CardExterior from "./CardExterior.component";
import { FullContainer, SpanOneTitle, TagContainer } from "./Card.styles";
import { ProjectTech, TechContainer } from "../General";
import { PublishedDate } from "./IconedText.component";
import { useFetchRepoUpdatedDate } from "@/hooks";
import LatestUpdate from "../General/Project/LatestUpdate.component";

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

const SecondItemContainer = styled.div`
	grid-column: 2 / 3;

	display: flex;
	align-items: center;
`;

const NewProjectCard: React.FC<{ project: FlattenedProjectCard }> = ({
	project,
}) => {
	const latestUpdateState = useFetchRepoUpdatedDate(project.repoLink);
	return (
		<CardExterior slug={`/project/${project.slug}`} columns="1fr 1fr">
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
			<PublishedDate date={project.firstReleased.date} />
			<LatestUpdate state={latestUpdateState} />
		</CardExterior>
	);
};

export default NewProjectCard;
