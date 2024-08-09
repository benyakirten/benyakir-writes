import React from "react";
import { navigate } from "gatsby";
import styled from "styled-components";

import { SearchResultsProps } from "./types";
import {
	BookResult,
	EmptyResults,
	PageResult,
	PostResult,
	ProjectResult,
	StoryResult,
} from "./Results";
import { SIZE_SM } from "@/styles/variables";
import SearchResultGroup from "./SearchResultGroup.component";

const SearchResultsContainer = styled.ul`
    display: grid;
    gap: ${SIZE_SM};

    width: 100%;
    max-height: 45vh;
    padding-top: ${SIZE_SM};

    overflow-y: auto;
	scroll-snap-type: block;
	scroll-margin: 0.2rem;
`;

const SearchResults: React.FC<SearchResultsProps> = ({
	results,
	alternatives,
	onClose,
	onSetQuery,
}) => {
	if (results === null) {
		return null;
	}

	function handleView(slug: string) {
		onClose();
		navigate(slug);
	}

	const pageResults =
		results.pages.length === 0 ? null : (
			<SearchResultGroup title="Pages">
				{results.pages.map((page) => (
					<PageResult onView={handleView} key={page.slug} page={page} />
				))}
			</SearchResultGroup>
		);

	const bookResults =
		results.books.length === 0 ? null : (
			<SearchResultGroup title="Books">
				{results.books.map((book) => (
					<BookResult onView={handleView} key={book.slug} book={book} />
				))}
			</SearchResultGroup>
		);

	const storyResults =
		results.stories.length === 0 ? null : (
			<SearchResultGroup title="Stories">
				{results.stories.map((story) => (
					<StoryResult onView={handleView} key={story.slug} story={story} />
				))}
			</SearchResultGroup>
		);

	const projectResults =
		results.projects.length === 0 ? null : (
			<SearchResultGroup title="Projects">
				{results.projects.map((project) => (
					<ProjectResult
						onView={handleView}
						key={project.slug}
						project={project}
					/>
				))}
			</SearchResultGroup>
		);

	const postResults =
		results.posts.length === 0 ? null : (
			<SearchResultGroup title="Blog Posts">
				{results.posts.map((post) => (
					<PostResult onView={handleView} key={post.slug} post={post} />
				))}
			</SearchResultGroup>
		);

	const contents =
		postResults === null &&
		projectResults === null &&
		storyResults === null &&
		bookResults === null &&
		pageResults === null ? (
			<EmptyResults alternatives={alternatives} onSelect={onSetQuery} />
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
