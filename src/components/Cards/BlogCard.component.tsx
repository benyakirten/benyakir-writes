import React from "react";

import { PillContainer } from "@/styles/general-components";
import { FlattenedBlogCard } from "@/types/posts";
import { getActiveCategory } from "@/utils/blog";
import {
	CardTitle,
	CategoryContainer,
	FullContainer,
	TagContainer,
} from "./Card.styles";
import CardExterior from "./CardExterior.component";
import { PublishedDate } from "./IconedText.component";

const MAX_TAGS = 2;

const BlogCard: React.FC<FlattenedBlogCard> = (props) => {
	const activeCategory = getActiveCategory(props.categories);
	const tags = props.tags?.slice(0, MAX_TAGS) ?? [];
	const otherTags = props.tags ? props.tags.length - MAX_TAGS : 0;

	return (
		<CardExterior slug={`/post/${props.slug}`} columns="auto 1fr">
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
			<CardTitle>{props.title}</CardTitle>
			<FullContainer
				dangerouslySetInnerHTML={{
					__html: props.excerpt ?? props.content ?? "Click to read more.",
				}}
			/>
			<PublishedDate span={2} date={props.published.date} />
		</CardExterior>
	);
};

export default BlogCard;
