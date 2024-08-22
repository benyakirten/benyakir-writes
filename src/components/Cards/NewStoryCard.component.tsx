import React from "react";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";

import { FlattenedStoryCard } from "@/types/posts";
import CardExterior from "./CardExterior.component";
import {
	HalfTitle,
	CategoryContainer,
	AuthorContent,
	ImageContainer,
	PublishedContainer,
} from "./Card.styles";
import { getPrettyDate } from "@/utils/dates";

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
			<HalfTitle>{story.title}</HalfTitle>
			<AuthorContent dangerouslySetInnerHTML={{ __html: story.content }} />
			<PublishedContainer>
				Published on {getPrettyDate(story.published.date)}
			</PublishedContainer>
		</CardExterior>
	);
};

export default NewStoryCard;
