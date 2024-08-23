import * as React from "react";

import { HeadBase } from "@Gen";
import {
	Grouping,
	LeadHeading,
	NormalPageContents,
	Page,
} from "@Styles/general-components";
import { homeDescription, latestTwentyItems } from "@/data/search";
import {
	FlattenedBlogCard,
	FlattenedBookCard,
	FlattenedProjectCard,
	FlattenedStoryCard,
} from "@/types/posts";
import {
	CardContainer,
	NewBlogCard,
	NewBookCard,
	NewProjectCard,
	NewStoryCard,
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
		return <NewBlogCard post={item} />;
	}

	if ("firstReleased" in item) {
		return <NewProjectCard project={item} />;
	}

	if ("stories" in item) {
		return <NewBookCard book={item} />;
	}

	return <NewStoryCard story={item} />;
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
