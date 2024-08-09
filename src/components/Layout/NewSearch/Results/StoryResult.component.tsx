import React from "react";
import styled from "styled-components";

import { FlattenedStoryCard } from "@/types/posts";
import { WpContentDescription } from "@/styles/general-components";
import { getPrettyDate } from "@/utils/dates";
import { GatsbyImage } from "gatsby-plugin-image";
import {
	ResultContainer,
	InnerContainer,
	ContentContainer,
	TitleContainer,
	ItemTitle,
	SlubTitle,
	BookCoverContainer,
} from "./Result.styles";
import { SIZE_XS } from "@/styles/variables";

const SubtitleText = styled.p`
	text-align: right;
`;

const PostStory: React.FC<{
	story: FlattenedStoryCard;
	onView: (slug: string) => void;
}> = ({ story, onView }) => {
	const relatedBook = story.book;
	const subtitle =
		relatedBook && `${relatedBook.relationship} to ${relatedBook.title}`;
	return (
		<ResultContainer role="link" onClick={() => onView(story.slug ?? "")}>
			<InnerContainer>
				<ContentContainer>
					<TitleContainer>
						<ItemTitle>{story.title}</ItemTitle>
						<SlubTitle>{getPrettyDate(story.published.date)}</SlubTitle>
					</TitleContainer>
					<WpContentDescription
						fontSize="1rem"
						dangerouslySetInnerHTML={{ __html: story.content }}
					/>
					{subtitle && <SubtitleText>{subtitle}</SubtitleText>}
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
