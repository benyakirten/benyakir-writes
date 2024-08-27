import * as React from "react";

import { HeadBase } from "@/components/General";
import {
	Grouping,
	LeadHeading,
	NormalPageContents,
	Page,
} from "@/styles/general-components";
import { homeDescription, latestTwentyItems } from "@/data/search";
import {
	FlattenedBlogCard,
	FlattenedBookCard,
	FlattenedProjectCard,
	FlattenedStoryCard,
} from "@/types/posts";
import {
	CardContainer,
	BlogCard,
	BookCard,
	ProjectCard,
	StoryCard,
} from "@/components/Cards";

export const Head: React.FC = () => (
	<HeadBase title="Home" description={homeDescription} />
);

const ItemCard: React.FC<{
	item:
		| FlattenedBlogCard
		| FlattenedProjectCard
		| FlattenedBookCard
		| FlattenedStoryCard;
}> = ({ item }) => {
	if ("categories" in item) {
		return <BlogCard post={item} />;
	}

	if ("firstReleased" in item) {
		return <ProjectCard project={item} />;
	}

	if ("stories" in item) {
		return <BookCard book={item} />;
	}

	return <StoryCard story={item} />;
};

const IndexPage: React.FC = () => {
	return (
		<Page>
			<NormalPageContents>
				<LeadHeading>Latest Posts</LeadHeading>
				<Grouping>
					<CardContainer>
						{latestTwentyItems.map((item) => (
							<ItemCard key={item.slug} item={item} />
						))}
					</CardContainer>
				</Grouping>
			</NormalPageContents>
		</Page>
	);
};

export default IndexPage;
