import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import { FlattenedBlogCard } from "@/types/posts";
import { getActiveCategory } from "@/utils/blog";
import { PillContainer } from "@/styles/general-components";
import { FONT_SM, SIZE_SM, SIZE_XS } from "@/styles/variables";

const BlogCardExterior = styled.div`
	display: grid;
	padding: ${SIZE_SM};
	grid-template-columns: 1fr 9rem;
	gap: ${SIZE_SM};
`;

const WordContainer = styled.div`
	display: grid;
	gap: ${SIZE_SM};
	grid-template-rows: min-content 1fr;
`;

const BlogTitle = styled.h3`
	font-size: ${FONT_SM};
`;

const SideContainer = styled.div`
	display: grid;
	gap: ${SIZE_SM};
`;

const OtherTagContainer = styled.div`
	display: grid;
	gap: ${SIZE_XS};
`;

const OtherCategoryContainer = styled.div`
	font-size: ${FONT_SM};
	white-space: nowrap;
`;

const ContentContainer = styled.p`
`;

const MAX_TAGS = 1;

const NewBlogCard: React.FC<{ post: FlattenedBlogCard }> = ({ post }) => {
	const activeCategory = getActiveCategory(post.categories);
	const tags = post.tags?.slice(0, MAX_TAGS) ?? [];
	const otherTags = post.tags ? post.tags.length - MAX_TAGS : 0;
	return (
		<li>
			<Link to={`/post/${post.slug}`}>
				<BlogCardExterior>
					<WordContainer>
						<BlogTitle>{post.title}</BlogTitle>
						<ContentContainer>
							{post.excerpt ?? post.content ?? "Click to read more."}
						</ContentContainer>
					</WordContainer>
					<SideContainer>
						<OtherCategoryContainer>{activeCategory}</OtherCategoryContainer>
						<OtherTagContainer>
							{tags.map((tag) => (
								<PillContainer key={tag}>{tag}</PillContainer>
							))}
							{otherTags > 0 && (
								<PillContainer>
									{otherTags} other{otherTags > 1 && "s"}
								</PillContainer>
							)}
						</OtherTagContainer>
					</SideContainer>
				</BlogCardExterior>
			</Link>
		</li>
	);
};

export default NewBlogCard;
