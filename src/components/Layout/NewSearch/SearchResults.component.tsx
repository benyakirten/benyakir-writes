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
import {
	SIZE_SM,
	Z_ABOVE,
	SANS_SERIF_FONT,
	FONT_SM,
	HORIZONTAL_XS,
} from "@/styles/variables";

const SearchResultsContainer = styled.ul`
    display: grid;
    gap: ${SIZE_SM};

    width: 100%;
    max-height: 35vh;
    padding-top: ${SIZE_SM};

    overflow-y: auto;
`;

const StyledSearchResultGroup = styled.li<{ title: string }>`
    position: relative;

    border-top: 2px solid #000;
    padding: ${SIZE_SM};

    &::after {
        content: "${(props) => props.title}";
        position: absolute;
        top: calc(-${SIZE_SM} + 2px);
        left: ${SIZE_SM};
        z-index: ${Z_ABOVE};

        font-family: ${SANS_SERIF_FONT};
        font-size: ${FONT_SM};

        background-color: ${(props) => props.theme.base.background};
        padding: ${HORIZONTAL_XS};
    }
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
			<StyledSearchResultGroup title="Pages">
				{results.pages.map((page) => (
					<PageResult onView={handleView} key={page.slug} page={page} />
				))}
			</StyledSearchResultGroup>
		);

	const bookResults =
		results.books.length === 0 ? null : (
			<StyledSearchResultGroup title="Books">
				{results.books.map((book) => (
					<BookResult onView={handleView} key={book.slug} book={book} />
				))}
			</StyledSearchResultGroup>
		);

	const storyResults =
		results.stories.length === 0 ? null : (
			<StyledSearchResultGroup title="Stories">
				{results.stories.map((story) => (
					<StoryResult onView={handleView} key={story.slug} story={story} />
				))}
			</StyledSearchResultGroup>
		);

	const projectResults =
		results.projects.length === 0 ? null : (
			<StyledSearchResultGroup title="Projects">
				{results.projects.map((project) => (
					<ProjectResult
						onView={handleView}
						key={project.slug}
						project={project}
					/>
				))}
			</StyledSearchResultGroup>
		);

	const postResults =
		results.posts.length === 0 ? null : (
			<StyledSearchResultGroup title="Blog Posts">
				{results.posts.map((post) => (
					<PostResult onView={handleView} key={post.slug} post={post} />
				))}
			</StyledSearchResultGroup>
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
