import * as React from "react";

import { Grouping, Page } from "@Styles/general-components";

import { LeadPage, Paginate } from "@Layout";
import { BlogFilter } from "@Posts";
import { BlogCard } from "@Variants";
import usePagination from "@/hooks/usePagination.hook";
import postsJson from "@WPData/Posts/all.json";
import type { FlattenedBlogCard } from "@/types/posts";
import { useMultiSelect } from "@/hooks";
import { createChoiceSet } from "@/utils/filter";
import { hasSomeContent } from "@/utils/search";

export const Head: React.FC = () => (
	<>
		<title>Benyakir Writes - Blogs</title>
		<meta
			name="description"
			content="Browse a list of all my blog posts ordered by most recent publication to least recent. Users can
            filter the blog results by publication date, category and tags."
		/>
	</>
);

const BlogPage: React.FC = () => {
	const posts = React.useMemo(
		() =>
			// @ts-ignore
			postsJson.map((b: FlattenedBlogCard) => ({
				...b,
				published: { ...b.published, date: new Date(b.published.date) },
			})),
		[],
	);
	const postPagination = usePagination<FlattenedBlogCard>(posts);

	const [publishedBefore, setPublishedBefore] = React.useState<Date>(
		posts[0].published.date,
	);
	const [publishedAfter, setPublishedAfter] = React.useState<Date>(
		posts[posts.length - 1].published.date,
	);

	const [filterWords, setFilterWords] = React.useState<string[]>([]);

	const categories = React.useMemo(
		() => createChoiceSet(posts, "categories"),
		[posts],
	);
	const tags = React.useMemo(() => createChoiceSet(posts, "tags"), [posts]);

	const [activeCategories, filterByCategories] = useMultiSelect();
	const [activeTags, filterByTags] = useMultiSelect();

	function triggerFilter({
		newPublishedBefore,
		newPublishedAfter,
		newFilterWords,
		newCategories,
		newTags,
	}: {
		newPublishedBefore?: Date;
		newPublishedAfter?: Date;
		newFilterWords?: string[];
		newCategories?: Set<string>;
		newTags?: Set<string>;
	}) {
		const _publishedBefore = newPublishedBefore ?? publishedBefore;
		const _publishedAfter = newPublishedAfter ?? publishedAfter;
		const _filterWords = newFilterWords ?? filterWords;
		const _categories = newCategories ?? activeCategories;
		const _tags = newTags ?? activeTags;

		let filteredPosts = posts
			.filter((p) => p.published.date.getTime() <= _publishedBefore.getTime())
			.filter((p) => p.published.date.getTime() >= _publishedAfter.getTime());

		if (hasSomeContent(_filterWords)) {
			filteredPosts = filteredPosts.filter((p) =>
				_filterWords.every((w) => p.meta[w] || p.meta[w.toLowerCase()]),
			);
		}

		filteredPosts = filterByCategories(
			_categories,
			filteredPosts,
			(post) => post.categories ?? [""],
		);
		filteredPosts = filterByTags(
			_tags,
			filteredPosts,
			(post) => post.tags ?? [""],
		);

		postPagination.setCurrentItems(filteredPosts);
	}

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

	function changeCategories(categories: PotentialChoice[]) {
		const choices = new Set(categories.map((category) => category.value));
		triggerFilter({ newCategories: choices });
	}

	function changeTags(tags: PotentialChoice[]) {
		const choices = new Set(tags.map((tag) => tag.value));
		triggerFilter({ newTags: choices });
	}

	return (
		<Page>
			<LeadPage
				title="Blog Posts"
				filter={
					<BlogFilter
						publishedBefore={publishedBefore}
						publishedAfter={publishedAfter}
						categories={categories}
						tags={tags}
						changePublishedBefore={changePublishedBefore}
						changePublishedAfter={changePublishedAfter}
						changeFilterWords={changeFilterWords}
						changeCategories={changeCategories}
						changeTags={changeTags}
					/>
				}
			>
				<Grouping>
					<Paginate {...postPagination} El={BlogCard} />
				</Grouping>
			</LeadPage>
		</Page>
	);
};

export default BlogPage;
