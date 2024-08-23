import React from "react";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";

import { FlattenedStoryCard } from "@/types/posts";
import CardExterior from "./CardExterior.component";
import {
	SpanOneTitle,
	CategoryContainer,
	SpanOneContent,
	ImageContainer,
} from "./Card.styles";
import { PublishedDate } from "./IconedText.component";

const NewStoryCard: React.FC<{ story: FlattenedStoryCard }> = ({ story }) => {
	function determineRelatedStory(
		story: FlattenedStoryCard,
	): { relationship: string; cover: IGatsbyImageData | null } | null {
		if (!story.book) {
			return null;
		}

		const relationship = `${story.book.relationship} to ${story.book.title}`;
		const cover = story.book.snapshotCover;
		return { relationship, cover };
	}

	const relatedBook = determineRelatedStory(story);

	return (
		<CardExterior slug={`/story/${story.slug}`} columns="1fr 67px">
			{relatedBook && (
				<CategoryContainer>{relatedBook.relationship}</CategoryContainer>
			)}
			{relatedBook?.cover && (
				<ImageContainer>
					<GatsbyImage image={relatedBook.cover} alt={story.title} />
				</ImageContainer>
			)}
			<SpanOneTitle>{story.title}</SpanOneTitle>
			<SpanOneContent dangerouslySetInnerHTML={{ __html: story.content }} />
			<PublishedDate span={2} date={story.published.date} />
		</CardExterior>
	);
};

export default NewStoryCard;
