import React from "react";
import styled from "styled-components";

import { FlattenedBlogCard } from "@/types/posts";
import {
	ResultContainer,
	ContentContainer,
	ItemTitle,
	SlubTitle,
	TitleContainer,
	InnerContainer,
	TagPill,
} from "./Result.styles";
import { getActiveCategory } from "@/utils/blog";
import { getPrettyDate } from "@/utils/dates";
import { FONT_SM, SANS_SERIF_FONT, SIZE_SM } from "@/styles/variables";
import { WpContentDescription } from "@/styles/general-components";
import { truncate } from "@/utils/strings";

const PostTitleContainer = styled.div`
	display: grid;
	gap: ${SIZE_SM};
	font-family: ${SANS_SERIF_FONT};
`;

const MetadataContainer = styled.div`
	flex: 1;
	display: grid;
`;

const PostTitleSubtitle = styled.span`
	font-size: ${FONT_SM};
`;

const CategoryContainer = styled.p`
	font-size: ${FONT_SM};
`;
const TagContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 2px;
`;

const MAX_TAGS = 4;

const PostResult: React.FC<{
	post: FlattenedBlogCard;
	onView: (slug: string) => void;
}> = ({ post, onView }) => {
	const activeCategory = getActiveCategory(post.categories);
	const tags = post.tags?.slice(0, MAX_TAGS) ?? [];
	const otherTags = post.tags ? post.tags.length - MAX_TAGS : 0;
	return (
		<ResultContainer role="link" onClick={() => onView(post.slug)}>
			<InnerContainer>
				<ContentContainer relativeSize={3}>
					<TitleContainer>
						<PostTitleContainer>
							<ItemTitle>{truncate(post.title, 30)}</ItemTitle>
						</PostTitleContainer>
						<SlubTitle>{getPrettyDate(post.published.date)}</SlubTitle>
					</TitleContainer>
					<WpContentDescription
						fontSize="1rem"
						dangerouslySetInnerHTML={{
							__html: post.content ?? post.excerpt ?? "",
						}}
					/>
				</ContentContainer>
				<MetadataContainer>
					<CategoryContainer>{activeCategory}</CategoryContainer>
					<TagContainer>
						{tags.map((tag) => (
							<TagPill key={tag}>{tag}</TagPill>
						))}
						{otherTags > 0 && (
							<TagPill>
								{otherTags} other{otherTags > 1 && "s"}
							</TagPill>
						)}
					</TagContainer>
				</MetadataContainer>
			</InnerContainer>
		</ResultContainer>
	);
};

export default PostResult;
