import React from "react";
import styled from "styled-components";

import { FlattenedProjectCard } from "@/types/posts";
import { ItemTitle, ResultContainer } from "./Result.styles";
import ProjectTech from "./ProjectTech.component";
import { SIZE_SM, SIZE_XS } from "@/styles/variables";
import { WpContentDescription } from "@/styles/general-components";

const InnerContainer = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	gap: ${SIZE_SM};
`;

const ContentContainer = styled.div`
	flex: 2;
`;

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
					<ItemTitle>{project.title}</ItemTitle>
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
