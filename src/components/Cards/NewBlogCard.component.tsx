import React from "react";

import { FlattenedBlogCard } from "@/types/posts";
import { getActiveCategory } from "@/utils/blog";
import { PillContainer } from "@/styles/general-components";
import CardExterior from "./CardExterior.component";
import {
	CardTitle,
	CategoryContainer,
	FullContainer,
	TagContainer,
} from "./Card.styles";
import { PublishedDate } from "./IconedText.component";

const MAX_TAGS = 2;

const NewBlogCard: React.FC<{ post: FlattenedBlogCard }> = ({ post }) => {
	const activeCategory = getActiveCategory(post.categories);
	const tags = post.tags?.slice(0, MAX_TAGS) ?? [];
	const otherTags = post.tags ? post.tags.length - MAX_TAGS : 0;

	return (
		<CardExterior slug={`/post/${post.slug}`} columns="auto 1fr">
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
			<FullContainer
				dangerouslySetInnerHTML={{
					__html: post.excerpt ?? post.content ?? "Click to read more.",
				}}
			/>
			<PublishedDate span={2} date={post.published.date} />
		</CardExterior>
	);
};

export default NewBlogCard;
