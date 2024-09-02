import React from "react";

import { ProjectTech, TechContainer } from "@/components/General";
import { TechPill } from "@/components/General/Project/ProjectTech.component";
import { WpContentDescription } from "@/styles/general-components";
import { FlattenedProjectCard } from "@/types/posts";
import { getPrettyDate } from "@/utils/dates";
import {
	ContentContainer,
	InnerContainer,
	ItemTitle,
	ResultContainer,
	SlubTitle,
	TitleContainer,
} from "./Result.styles";
import { MODAL_BACKGROUND_COLOR, MODAL_TEXT_COLOR } from "@/styles/variables";

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
						<ProjectTech
							override={{
								borderColor: MODAL_TEXT_COLOR,
								keepIconColor: true,
								textColor: MODAL_TEXT_COLOR,
							}}
							key={i.name}
							tech={i.name}
							publicURL={i.publicURL}
						/>
					))}
					{otherIcons > 0 && (
						<TechPill $borderColor={MODAL_TEXT_COLOR}>
							{otherIcons} other{otherIcons > 1 && "s"}
						</TechPill>
					)}
				</TechContainer>
			</InnerContainer>
		</ResultContainer>
	);
};

export default ProjectResult;
