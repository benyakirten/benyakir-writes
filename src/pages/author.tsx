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
import { hasSomeContent } from "@/utils/search";

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

		return [...books, ...stories].sort(
			(a, b) => b.published.date.valueOf() - a.published.date.valueOf(),
		);
	}, []);

	const itemPagination = usePagination<AuthoredItemCard>(items);

	const [publishedBefore, setPublishedBefore] = React.useState<Date>(
		items[0].published.date,
	);
	const [publishedAfter, setPublishedAfter] = React.useState<Date>(
		items[items.length - 1].published.date,
	);

	const [filterWords, setFilterWords] = React.useState<string[]>([]);

	function changePublishedBefore(val: Date) {
		setPublishedBefore(val);
		triggerFilter({ newPublishedBefore: val });
	}

	function changePublishedAfter(val: Date) {
		setPublishedAfter(val);
		triggerFilter({ newPublishedAfter: val });
	}

	function changeFilterWords(words: string[]) {
		setFilterWords(words);
		triggerFilter({ newFilterWords: words });
	}

	function triggerFilter({
		newPublishedBefore,
		newPublishedAfter,
		newFilterWords,
	}: {
		newPublishedBefore?: Date;
		newPublishedAfter?: Date;
		newFilterWords?: string[];
	}) {
		const _publishedBefore = newPublishedBefore || publishedBefore;
		const _publishedAfter = newPublishedAfter || publishedAfter;
		const _filterWords = newFilterWords || filterWords;
		let filteredItems = items
			.filter((b) => b.published.date.getTime() <= _publishedBefore.getTime())
			.filter((b) => b.published.date.getTime() >= _publishedAfter.getTime());

		if (hasSomeContent(_filterWords)) {
			filteredItems = filteredItems.filter((b) =>
				_filterWords.every((w) => b.meta[w] || b.meta[w.toLowerCase()]),
			);
		}

		itemPagination.setCurrentItems(filteredItems);
	}

	return (
		<Page>
			<LeadPage
				title="Books and Stories"
				filter={
					<AuthorFilter
						publishedBefore={publishedBefore}
						publishedAfter={publishedAfter}
						filterWords={filterWords}
						changePublishedBefore={changePublishedBefore}
						changePublishedAfter={changePublishedAfter}
						changeFilterWords={changeFilterWords}
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
