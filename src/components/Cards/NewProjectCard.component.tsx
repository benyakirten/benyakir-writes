import React from "react";

import { FlattenedProjectCard } from "@/types/posts";
import CardExterior from "./CardExterior.component";
import { HalfTitle } from "./Card.styles";

const NewProjectCard: React.FC<{ project: FlattenedProjectCard }> = ({
	project,
}) => {
	return (
		<CardExterior slug={`/project/${project.slug}`} columns="1fr 1fr">
			<HalfTitle>{project.title}</HalfTitle>
		</CardExterior>
	);
};

export default NewProjectCard;
