import * as React from "react";

import { Grouping, Page, SubHeading } from "@Styles/general-components";

import { LeadPage, Paginate } from "@Layout";
import { AuthorFilter } from "@Posts";
import { BookCard, StoryCard } from "@Variants";

import { usePagination } from "@Hooks";

import booksJson from "@WPData/Author/books.json";
import storiesJson from "@WPData/Author/stories.json";

import type { FlattenedBookCard, FlattenedStoryCard } from "@Types/posts";

export const Head: React.FC = () => (
	<>
		<title>Benyakir Writes - Author</title>
		<meta
			name="description"
			content="A view of all of my short stories and published books. They can be filtered by keyword, date of publication,
                    or by relation to an individual book."
		/>
	</>
);

const AuthorPage: React.FC = () => {
	const books = React.useMemo<FlattenedBookCard[]>(
		() =>
			// @ts-ignore
			booksJson.map((b: FlattenedBookCard) => {
				b.published.date = new Date(b.published.date);
				return b;
			}),
		[],
	);

	const stories = React.useMemo<FlattenedStoryCard[]>(
		() =>
			// @ts-ignore
			storiesJson.map((s: FlattenedStoryCard) => {
				s.published.date = new Date(s.published.date);
				return s;
			}),
		[],
	);

	const bookPagination = usePagination<FlattenedBookCard>(books);
	const storyPagination = usePagination<FlattenedStoryCard>(stories);

	function handleFilter(
		newBooks: FlattenedBookCard[],
		newStories: FlattenedStoryCard[],
	) {
		bookPagination.setCurrentItems(newBooks);
		storyPagination.setCurrentItems(newStories);
	}

	return (
		<Page>
			<LeadPage
				title="Author"
				filter={
					<AuthorFilter
						allBooks={books}
						allStories={stories}
						onFilter={handleFilter}
					/>
				}
			>
				<Grouping marginVertical="2rem">
					<SubHeading>Books</SubHeading>
					<Paginate {...bookPagination} El={BookCard} />
				</Grouping>
				<Grouping marginVertical="2rem">
					<SubHeading>Short Stories</SubHeading>
					<Paginate {...storyPagination} El={StoryCard} />
				</Grouping>
			</LeadPage>
		</Page>
	);
};

export default AuthorPage;
