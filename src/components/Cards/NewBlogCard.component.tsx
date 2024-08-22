import React from "react";
import styled from "styled-components";

import { FlattenedBlogCard } from "@/types/posts";
import { getActiveCategory } from "@/utils/blog";
import { PillContainer } from "@/styles/general-components";
import { FONT_XS, FONT_XXS, SIZE_XS } from "@/styles/variables";
import { getPrettyDate } from "@/utils/dates";
import { media } from "@/styles/queries";
import CardExterior from "./CardExterior.component";
import { CardTitle } from "./Card.styles";

const CategoryContainer = styled.p`
	grid-column: 1 / 2;
	align-self: center;
	font-size: ${FONT_XS};
	font-weight: bold;
`;

const TagContainer = styled.div`
	grid-column: 2 / 3;

	display: flex;
	justify-content: flex-end;
	flex-wrap: wrap;
	align-items: center;
	gap: ${SIZE_XS};

	${media.phone} {
		gap: 2px;
	}
`;

const ContentContainer = styled.p`
	grid-column: span 2;
`;

const PublishedContainer = styled.p`
	grid-column: span 2;
	color: ${(props) => props.theme.base.pillText};
	font-size: ${FONT_XXS};
`;

const MAX_TAGS = 2;

const NewBlogCard: React.FC<{ post: FlattenedBlogCard }> = ({ post }) => {
	const activeCategory = getActiveCategory(post.categories);
	const tags = post.tags?.slice(0, MAX_TAGS) ?? [];
	const otherTags = post.tags ? post.tags.length - MAX_TAGS : 0;

	return (
		<CardExterior slug={`/post/${post.slug}`}>
			<CategoryContainer>{activeCategory}</CategoryContainer>
			<TagContainer>
				{tags.map((t) => (
					<PillContainer key={t}>{t}</PillContainer>
				))}
				{otherTags > 0 && (
					<PillContainer>
						{otherTags} other{otherTags > 1 && "s"}
					</PillContainer>
				)}
			</TagContainer>
			<CardTitle>{post.title}</CardTitle>
			<ContentContainer>
				{post.excerpt ?? post.content ?? "Click to read more."}
			</ContentContainer>
			<PublishedContainer>
				Published on {getPrettyDate(post.published.date)}
			</PublishedContainer>
		</CardExterior>
	);
};

export default NewBlogCard;
