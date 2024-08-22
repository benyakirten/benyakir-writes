import React from "react";
import styled from "styled-components";

import { FlattenedProjectCard } from "@/types/posts";
import {
	ContentContainer,
	InnerContainer,
	ItemTitle,
	ResultContainer,
	SlubTitle,
	TitleContainer,
} from "./Result.styles";
import { SIZE_XS } from "@/styles/variables";
import {
	PillContainer,
	WpContentDescription,
} from "@/styles/general-components";
import { getPrettyDate } from "@/utils/dates";
import { ProjectTech } from "@/components/General";

const TechContainer = styled.div`
	flex: 1;
	display: flex;
	gap ${SIZE_XS};
	flex-wrap: wrap;
`;

const MAX_TECHS = 2;

const ProjectResult: React.FC<{
	project: FlattenedProjectCard;
	onView: (slug: string) => void;
}> = ({ project, onView }) => {
	const firstIcons = project.icons.slice(0, 2);
	const otherIcons = project.icons.length - MAX_TECHS;

	return (
		<ResultContainer
			role="link"
			onClick={() => onView(`/project/${project.slug}`)}
		>
			<InnerContainer>
				<ContentContainer>
					<TitleContainer>
						<ItemTitle>{project.title}</ItemTitle>
						<SlubTitle>{getPrettyDate(project.firstReleased.date)}</SlubTitle>
					</TitleContainer>
					<WpContentDescription
						fontSize="1rem"
						dangerouslySetInnerHTML={{ __html: project.content }}
					/>
				</ContentContainer>
				<TechContainer>
					{firstIcons.map((i) => (
						<ProjectTech key={i.name} tech={i.name} publicURL={i.publicURL} />
					))}
					{otherIcons > 0 && (
						<PillContainer>
							{otherIcons} other{otherIcons > 1 && "s"}
						</PillContainer>
					)}
				</TechContainer>
			</InnerContainer>
		</ResultContainer>
	);
};

export default ProjectResult;
