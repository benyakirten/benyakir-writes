import * as React from "react";

import {
	Grouping,
	LeadHeading,
	Page,
	PaginatedPageContents,
} from "@Styles/general-components";

import { usePagination } from "@Hooks";

import type { AuthoredItemCard } from "@Types/posts";
import { authorDescription, books, stories } from "@/data/search";
import { CardContainer, NewBookCard, NewStoryCard } from "@/components/Cards";

export const Head: React.FC = () => (
	<>
		<title>Benyakir Writes - Author</title>
		<meta name="description" content={authorDescription} />
	</>
);

const AuthorCard: React.FC<{ item: AuthoredItemCard }> = ({ item }) => {
	if ("book" in item) {
		return <NewStoryCard story={item} />;
	}
	return <NewBookCard book={item} />;
};

const AuthorPage: React.FC = () => {
	const items = React.useMemo<AuthoredItemCard[]>(() => {
		return [...books, ...stories].sort(
			(a, b) => b.published.date.valueOf() - a.published.date.valueOf(),
		);
	}, []);
	const itemPagination = usePagination<AuthoredItemCard>(items);

	return (
		<Page>
			<PaginatedPageContents>
				<LeadHeading>Written Work</LeadHeading>
				<Grouping>
					<CardContainer>
						{itemPagination.visibleItems.map((item) => (
							<AuthorCard item={item} key={item.slug} />
						))}
					</CardContainer>
				</Grouping>
			</PaginatedPageContents>
		</Page>
	);
};

export default AuthorPage;
