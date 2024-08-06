import React from "react";

import { SearchModal } from "./Search.styles";
import SearchBar from "./SearchBar.component";
import SearchResults from "./SearchResults.component";
import { SearchProps, SearchResultItems } from "./types";
import { search } from "./search";
import {
	blogDescription,
	contactDescription,
	homeDescription,
} from "@/data/search";

const sample: SearchResultItems = {
	books: [],
	projects: [],
	posts: [
		{
			title: "Where I Have Been – Future changes",
			slug: "where-i-have-been-future-changes",
			excerpt:
				"Over a month ago I wrote a post about starting the Writers IDE At the end of the post I implied that I would shortly be writing about something else...",
			published: {
				year: 2024,
				month: 5,
				full: "May",
				short: "MAY",
				date: new Date("2024-05-16T10:22:42.000Z"),
			},
			categories: ["Ben's Blogs", "Ben's Thoughts"],
			tags: ["accessibility", "redesign", "rust", "tauri", "ui", "ux"],
			meta: {
				"2024": true,
				"bens blogs": true,
				"bens thoughts": true,
				accessibility: true,
				redesign: true,
				rust: true,
				tauri: true,
				ui: true,
				ux: true,
				may: true,
				where: true,
				i: true,
				have: true,
				been: true,
				"–": true,
				future: true,
				changes: true,
				over: true,
				a: true,
				month: true,
				ago: true,
				wrote: true,
				post: true,
				about: true,
				starting: true,
				the: true,
				writers: true,
				ide: true,
				at: true,
				end: true,
				of: true,
				implied: true,
				that: true,
				would: true,
				shortly: true,
				be: true,
				writing: true,
				something: true,
				else: true,
			},
		},
		{
			title:
				"The Writer’s IDE, Part 1: Writing some Git functionality in Rust.",
			slug: "the-writers-ide-part-1-writing-some-git-functionality-in-rust",
			excerpt:
				"Table of Contents The Larger Project I had an epiphany while working on other things: I miss writing But every time I write I dont have the tools I...",
			published: {
				year: 2024,
				month: 4,
				full: "April",
				short: "APR",
				date: new Date("2024-04-01T20:25:44.000Z"),
			},
			categories: ["Ben's Blogs", "Ben's Thoughts"],
			tags: [
				"bit",
				"bitwise",
				"blob",
				"git",
				"ide",
				"javascript",
				"packfile",
				"rust",
				"sha1",
				"ui",
				"vcs",
				"version control",
				"writing",
				"zlib",
			],
			meta: {
				"2024": true,
				"bens blogs": true,
				"bens thoughts": true,
				bit: true,
				bitwise: true,
				blob: true,
				git: true,
				ide: true,
				javascript: true,
				packfile: true,
				rust: true,
				sha1: true,
				ui: true,
				vcs: true,
				"version control": true,
				writing: true,
				zlib: true,
				april: true,
				apr: true,
				the: true,
				"writer’s": true,
				part: true,
				"1:": true,
				some: true,
				functionality: true,
				in: true,
				table: true,
				of: true,
				contents: true,
				larger: true,
				project: true,
				i: true,
				had: true,
				an: true,
				epiphany: true,
				while: true,
				working: true,
				on: true,
				other: true,
				"things:": true,
				miss: true,
				but: true,
				every: true,
				time: true,
				write: true,
				dont: true,
				have: true,
				tools: true,
			},
		},
	],
	stories: [],
	pages: [],
};

const Search = React.forwardRef<HTMLDialogElement, SearchProps>(
	({ onClose }, ref) => {
		const handleClick = (e: React.MouseEvent<HTMLDialogElement>) => {
			if (e.target === e.currentTarget) {
				onClose();
			}
		};

		const [results, setResults] = React.useState<SearchResultItems | null>(
			sample,
		);

		const onSearch = React.useCallback((query: string) => {
			const results = search(query);
			setResults(results);
		}, []);
		return (
			<SearchModal ref={ref} onClick={handleClick}>
				<SearchBar onSearch={onSearch} onClose={onClose} />
				<SearchResults results={results} onClose={onClose} />
			</SearchModal>
		);
	},
);

export default Search;
