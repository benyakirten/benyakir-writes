import React from "react";

import { PillContainer } from "@/styles/general-components";
import { PHONE_QUERY } from "@/styles/queries";
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

const BlogCardTagContainer = ({ tags }: { tags: string[] }) => {
	const [isPhoneScreen, setIsPhoneScreen] = React.useState(false);
	React.useEffect(() => {
		if (window?.matchMedia) {
			const phoneScreenQuery = window.matchMedia(PHONE_QUERY);
			setIsPhoneScreen(phoneScreenQuery.matches);

			const handlePhoneScreenChange = (e: MediaQueryListEvent) => {
				setIsPhoneScreen(e.matches);
			};
			phoneScreenQuery.addEventListener("change", handlePhoneScreenChange);
			return () =>
				phoneScreenQuery.removeEventListener("change", handlePhoneScreenChange);
		}
	}, []);

	if (isPhoneScreen) {
		return (
			<TagContainer>
				{tags.length > 0 && (
					<PillContainer>
						{tags.length} tag{tags.length > 1 && "s"}
					</PillContainer>
				)}
			</TagContainer>
		);
	}

	return (
		<TagContainer>
			{tags.slice(0, MAX_TAGS).map((t) => (
				<PillContainer key={t}>{t}</PillContainer>
			))}
			{tags.length - MAX_TAGS > 0 && (
				<PillContainer>
					{tags.length - MAX_TAGS} other{tags.length - MAX_TAGS > 1 && "s"}
				</PillContainer>
			)}
		</TagContainer>
	);
};

const BlogCard: React.FC<FlattenedBlogCard> = ({
	slug,
	tags,
	categories,
	published,
	excerpt,
	content,
	title,
}) => {
	const activeCategory = getActiveCategory(categories);

	return (
		<CardExterior slug={`/post/${slug}`} columns="auto 1fr">
			<CategoryContainer>{activeCategory}</CategoryContainer>
			<BlogCardTagContainer tags={tags ?? []} />
			<CardTitle>{title}</CardTitle>
			<FullContainer
				dangerouslySetInnerHTML={{
					__html: excerpt ?? content ?? "Click to read more.",
				}}
			/>
			<PublishedDate span={2} date={published.date} />
		</CardExterior>
	);
};

export default BlogCard;
