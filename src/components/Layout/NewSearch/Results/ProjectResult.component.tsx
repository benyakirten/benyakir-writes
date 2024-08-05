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
import ProjectTech from "./ProjectTech.component";
import { SIZE_XS } from "@/styles/variables";
import { WpContentDescription } from "@/styles/general-components";
import { getPrettyDate } from "@/utils/dates";

const TechContainer = styled.div`
	flex: 1;
	display: flex;
	gap ${SIZE_XS};
	flex-wrap: wrap;
`;

const ProjectResult: React.FC<{
	project: FlattenedProjectCard;
	onView: (slug: string) => void;
}> = ({ project, onView }) => {
	return (
		<ResultContainer role="link" onClick={() => onView(project.slug ?? "")}>
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
					{project.icons.map((i) => (
						<ProjectTech key={i.name} tech={i.name} publicURL={i.publicURL} />
					))}
				</TechContainer>
			</InnerContainer>
		</ResultContainer>
	);
};

export default ProjectResult;
