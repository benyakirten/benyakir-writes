import * as React from "react";

import {
	BlogCard,
	BookCard,
	CardContainer,
	ProjectCard,
	StoryCard,
} from "@/components/Cards";
import { HeadBase } from "@/components/SEO";
import { homeDescription, latestTwentyItems } from "@/data/search";
import {
	Grouping,
	LeadHeading,
	NormalPageContents,
	Page,
} from "@/styles/general-components";
import {
	FlattenedBlogCard,
	FlattenedBookCard,
	FlattenedProjectCard,
	FlattenedStoryCard,
} from "@/types/posts";
import { AuthorCard } from "@/components/General";

export const Head: React.FC = () => (
	<HeadBase title="Home" description={homeDescription} />
);

const ItemCard: React.FC<
	| FlattenedBlogCard
	| FlattenedProjectCard
	| FlattenedBookCard
	| FlattenedStoryCard
> = (props) => {
	if ("categories" in props) {
		return <BlogCard {...props} />;
	}

	if ("firstReleased" in props) {
		return <ProjectCard {...props} />;
	}

	return <AuthorCard {...props} />;
};

const IndexPage: React.FC = () => {
	return (
		<Page>
			<NormalPageContents>
				<LeadHeading>Latest Posts</LeadHeading>
				<Grouping>
					<CardContainer
						items={latestTwentyItems}
						Card={ItemCard}
						type="recent item"
					/>
				</Grouping>
			</NormalPageContents>
		</Page>
	);
};

export default IndexPage;
