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
} from "./Result.styles";
import { getActiveCategory } from "@/utils/blog";
import { getPrettyDate } from "@/utils/dates";
import { FONT_SM, SANS_SERIF_FONT, SIZE_SM, SIZE_XS } from "@/styles/variables";
import {
	PillContainer,
	WpContentDescription,
} from "@/styles/general-components";
import { truncate } from "@/utils/strings";

const PostTitleContainer = styled.div`
	display: grid;
	gap: ${SIZE_SM};
	font-family: ${SANS_SERIF_FONT};
`;

const MetadataContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: ${SIZE_XS};
`;

const CategoryContainer = styled.p`
	font-size: ${FONT_SM};
`;
const TagContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 2px;
`;

const MAX_TAGS = 2;

const PostResult: React.FC<{
	post: FlattenedBlogCard;
	onView: (slug: string) => void;
}> = ({ post, onView }) => {
	const activeCategory = getActiveCategory(post.categories);
	const tags = post.tags?.slice(0, MAX_TAGS) ?? [];
	const otherTags = post.tags ? post.tags.length - MAX_TAGS : 0;
	return (
		<ResultContainer role="link" onClick={() => onView(`/post/${post.slug}`)}>
			<InnerContainer>
				<ContentContainer>
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
							<PillContainer key={tag}>{tag}</PillContainer>
						))}
						{otherTags > 0 && (
							<PillContainer>
								{otherTags} other{otherTags > 1 && "s"}
							</PillContainer>
						)}
					</TagContainer>
				</MetadataContainer>
			</InnerContainer>
		</ResultContainer>
	);
};

export default PostResult;
