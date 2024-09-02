import React from "react";
import styled from "styled-components";
import { GatsbyImage } from "gatsby-plugin-image";

import { WpContentDescription } from "@/styles/general-components";
import { FlattenedStoryCard } from "@/types/posts";
import { getPrettyDate } from "@/utils/dates";
import {
	BookCoverContainer,
	ContentContainer,
	InnerContainer,
	ItemTitle,
	ResultContainer,
	SlubTitle,
	TitleContainer,
} from "./Result.styles";
import { FONT_SM, FONT_XS } from "@/styles/variables";

const PostStory: React.FC<{
	story: FlattenedStoryCard;
	onView: (slug: string) => void;
}> = ({ story, onView }) => {
	const relatedBook = story.book;
	const subtitle =
		relatedBook && `${relatedBook.relationship} to ${relatedBook.title}`;
	return (
		<ResultContainer role="link" onClick={() => onView(`/story/${story.slug}`)}>
			<InnerContainer>
				<ContentContainer>
					<TitleContainer>
						<ItemTitle>{story.title}</ItemTitle>
						<SlubTitle>
							{getPrettyDate(story.published.date)}
							{subtitle && <span>&nbsp;&mdash;&nbsp;{subtitle}</span>}
						</SlubTitle>
					</TitleContainer>
					<WpContentDescription
						fontSize="1rem"
						dangerouslySetInnerHTML={{ __html: story.content }}
					/>
				</ContentContainer>
				{relatedBook?.snapshotCover && (
					<BookCoverContainer>
						<GatsbyImage
							image={relatedBook.snapshotCover}
							alt={relatedBook?.title ?? "Cover of related book"}
						/>
					</BookCoverContainer>
				)}
			</InnerContainer>
		</ResultContainer>
	);
};

export default PostStory;
