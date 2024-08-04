import React from "react";

import {
	SearchResultsContainer,
	StyledSearchResultGroup,
} from "./Search.styles";
import { SearchResultsProps } from "./types";
import {
	BookResult,
	EmptyResults,
	PageResult,
	PostResult,
	ProjectResult,
	StoryResult,
} from "./Results";

const SearchResults: React.FC<SearchResultsProps> = ({ results, onClose }) => {
	if (results === null) {
		return null;
	}

	const pageResults =
		results.pages.length === 0 ? null : (
			<StyledSearchResultGroup title="Pages">
				{results.pages.map((page) => (
					<PageResult key={page.slug} page={page} />
				))}
			</StyledSearchResultGroup>
		);

	const bookResults =
		results.books.length === 0 ? null : (
			<StyledSearchResultGroup title="Books">
				{results.books.map((book) => (
					<BookResult key={book.slug} book={book} />
				))}
			</StyledSearchResultGroup>
		);

	const storyResults =
		results.stories.length === 0 ? null : (
			<StyledSearchResultGroup title="Books">
				{results.stories.map((story) => (
					<StoryResult key={story.slug} story={story} />
				))}
			</StyledSearchResultGroup>
		);

	const projectResults =
		results.projects.length === 0 ? null : (
			<StyledSearchResultGroup title="Projects">
				{results.projects.map((project) => (
					<ProjectResult key={project.slug} project={project} />
				))}
			</StyledSearchResultGroup>
		);

	const postResults =
		results.posts.length === 0 ? null : (
			<StyledSearchResultGroup title="Blog Posts">
				{results.posts.map((post) => (
					<PostResult key={post.slug} post={post} />
				))}
			</StyledSearchResultGroup>
		);

	const contents =
		postResults === null &&
		projectResults === null &&
		storyResults === null &&
		bookResults === null &&
		pageResults === null ? (
			<EmptyResults />
		) : (
			<>
				{pageResults}
				{bookResults}
				{storyResults}
				{projectResults}
				{postResults}
			</>
		);

	return <SearchResultsContainer>{contents}</SearchResultsContainer>;
};

export default SearchResults;
