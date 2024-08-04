import React from "react";

import { FlattenedProjectCard } from "@/types/posts";

const ProjectResult: React.FC<{
	project: FlattenedProjectCard;
	onView: (slug: string) => void;
}> = ({ project, onView }) => {
	return (
		<div>
			<h2>{project.title}</h2>
		</div>
	);
};

export default ProjectResult;
