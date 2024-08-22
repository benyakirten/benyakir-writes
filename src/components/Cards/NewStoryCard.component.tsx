import React from "react";

import { FlattenedStoryCard } from "@/types/posts";
import CardExterior from "./CardExterior.component";
import { CardTitle } from "./Card.styles";

const NewStoryCard: React.FC<{ story: FlattenedStoryCard }> = ({ story }) => {
	return (
		<CardExterior slug={`/story/${story.slug}`}>
			<CardTitle>{story.title}</CardTitle>
		</CardExterior>
	);
};

export default NewStoryCard;
