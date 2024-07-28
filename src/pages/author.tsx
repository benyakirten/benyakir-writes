import * as React from "react";

import { Grouping, Page } from "@Styles/general-components";

import { LeadPage, Paginate } from "@Layout";
import { AuthorFilter } from "@Posts";
import { BookCard, StoryCard } from "@Variants";

import { usePagination } from "@Hooks";

import booksJson from "@WPData/Author/books.json";
import storiesJson from "@WPData/Author/stories.json";

import type {
	FlattenedBookCard,
	FlattenedStoryCard,
	AuthoredItemCard,
} from "@Types/posts";

export const Head: React.FC = () => (
	<>
		<title>Benyakir Writes - Author</title>
		<meta
			name="description"
			content="A view of all of my published books and short stories. They can be filtered by keyword or date of publication.."
		/>
	</>
);

const AuthorCard: React.FC<{ item: AuthoredItemCard }> = ({ item }) => {
	if ("book" in item) {
		return <StoryCard item={item} />;
	}
	return <BookCard item={item} />;
};

const AuthorPage: React.FC = () => {
	const items = React.useMemo<AuthoredItemCard[]>(() => {
		// @ts-ignore
		const books = booksJson.map((b: FlattenedBookCard) => ({
			...b,
			published: { ...b.published, date: new Date(b.published.date) },
		}));

		// @ts-ignore
		const stories = storiesJson.map((s: FlattenedStoryCard) => ({
			...s,
			published: { ...s.published, date: new Date(s.published.date) },
		}));

		const items = [...books, ...stories].sort(
			(a, b) => a.published.date.valueOf() - b.published.date.valueOf(),
		);

		return items;
	}, []);

	const itemPagination = usePagination<AuthoredItemCard>(items);

	return (
		<Page>
			<LeadPage
				title="Books and Stories"
				filter={
					<AuthorFilter
						items={items}
						onFilter={itemPagination.setCurrentItems}
					/>
				}
			>
				<Grouping>
					<Paginate {...itemPagination} El={AuthorCard} />
				</Grouping>
			</LeadPage>
		</Page>
	);
};

export default AuthorPage;
