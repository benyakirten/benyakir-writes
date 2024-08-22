import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import { FlattenedBlogCard } from "@/types/posts";
import { getActiveCategory } from "@/utils/blog";
import { PillContainer } from "@/styles/general-components";
import {
	FONT_SM,
	FONT_XS,
	FONT_XXS,
	SHADOW_CARD_HOVER,
	SHADOW_CARD_NORMAL,
	SIZE_SM,
	SIZE_XS,
	TRANSITION_FAST,
	TRANSITION_SLOW,
} from "@/styles/variables";
import { getPrettyDate } from "@/utils/dates";

const BlogCardExterior = styled.div`
	display: grid;
	position: relative;
	grid-template-columns: 1fr 1fr;
	height: 100%;
	gap: ${SIZE_SM};

	padding: ${SIZE_SM};

	border: 1px solid ${(props) => props.theme.base.border};
	border-radius: ${SIZE_XS};
	
	transition: box-shadow ${TRANSITION_SLOW} ease;

	box-shadow: ${SHADOW_CARD_NORMAL};
	&:hover {
		box-shadow: ${SHADOW_CARD_HOVER};

		& > [data-arrow] {
			opacity: 1;
			clip-path: polygon(0% 35%, 99% 35%, 99% 0, 100% 50%, 99% 100%, 99% 65%, 0% 65%);
		}
	}
`;

const ExternalArrow = styled.div`
	position: absolute;
	display: inline-block;

	bottom: -12px;
	left: 4px;

	width: 97%;
	height: 8px;
	background-color: white;

	opacity: 0;
	clip-path: polygon(0% 35%, 15% 35%, 15% 0, 100% 50%, 15% 100%, 15% 65%, 0% 65%);
	transition: clip-path ${TRANSITION_SLOW} ease ${TRANSITION_FAST};
	transition: opacity: ${TRANSITION_FAST} ease;
`;

const BlogTitle = styled.h3`
	font-size: ${FONT_SM};
	font-weight: bold;
	grid-column: span 2;
`;

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
	align-items: center;
	gap: ${SIZE_XS};
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
		<li>
			<Link to={`/post/${post.slug}`}>
				<BlogCardExterior>
					<ExternalArrow data-arrow />
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
					<BlogTitle>{post.title}</BlogTitle>
					<ContentContainer>
						{post.excerpt ?? post.content ?? "Click to read more."}
					</ContentContainer>
					<PublishedContainer>
						Published on {getPrettyDate(post.published.date)}
					</PublishedContainer>
				</BlogCardExterior>
			</Link>
		</li>
	);
};

export default NewBlogCard;
