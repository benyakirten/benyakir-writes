import React from "react";

import { FlattenedProjectCard } from "@/types/posts";
import {
	ContentContainer,
	InnerContainer,
	ItemTitle,
	ResultContainer,
	SlubTitle,
	TitleContainer,
} from "./Result.styles";
import { WpContentDescription } from "@/styles/general-components";
import { getPrettyDate } from "@/utils/dates";
import { ProjectTech, TechContainer } from "@/components/General";
import { TechPill } from "@/components/General/Project/ProjectTech.component";

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
						<TechPill>
							{otherIcons} other{otherIcons > 1 && "s"}
						</TechPill>
					)}
				</TechContainer>
			</InnerContainer>
		</ResultContainer>
	);
};

export default ProjectResult;
