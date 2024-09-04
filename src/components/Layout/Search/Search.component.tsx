import React from "react";

import { autocomplete } from "@/data/search";
import { useDebounce } from "@/hooks";
import { SearchProps, SearchResultItems } from "@/types/search";
import Modal from "../Modal.component";
import SearchBar from "./SearchBar.component";
import SearchResults from "./SearchResults.component";

const Search = React.forwardRef<HTMLDialogElement, SearchProps>(
	({ onClose }, ref) => {
		const [showResultCount, setShowResultCount] = React.useState(false);
		const [results, setResults] = React.useState<SearchResultItems | null>(
			null,
		);

		const [searchWorker, setSearchWorker] = React.useState<Worker>();
		React.useEffect(() => {
			const worker = new Worker(
				new URL("../../../workers/search.worker.js", import.meta.url),
			);

			worker.addEventListener(
				"message",
				(e: MessageEvent<SearchResultItems>) => {
					setResults(e.data);
				},
			);

			setSearchWorker(worker);

			return () => {
				worker.terminate();
			};
		}, []);

		const onSearch = React.useCallback(
			(query: string) => {
				searchWorker?.postMessage({ query });
			},
			[searchWorker],
		);

		const [suggestions, setSuggestions] = React.useState<string[]>([]);
		const [searchAutocomplete, setSearchAutocomplete] = React.useState<
			string | undefined
		>();
		const [query, _setQuery] = useDebounce(onSearch);

		const setQuery = (query: string) => {
			_setQuery(query);
			if (query === "") {
				setShowResultCount(false);
				setSuggestions([]);
				setSearchAutocomplete(undefined);
				return;
			}

			const suggestions = autocomplete.suggest(query);
			if (suggestions === null || suggestions.length === 0) {
				setSearchAutocomplete(undefined);

				const randomSuggestions = autocomplete.getRandomSuggestions();
				setSuggestions(randomSuggestions);

				return;
			}
			const allSuggestions = suggestions.map((s) => s.word);

			setSearchAutocomplete(allSuggestions.at(0));
			setSuggestions(allSuggestions);
			setShowResultCount(true);
		};

		const numResults = results
			? results.books.length +
				results.stories.length +
				results.posts.length +
				results.projects.length +
				results.pages.length
			: 0;

		return (
			<Modal ref={ref} onClose={onClose}>
				<SearchBar
					showResultCount={showResultCount}
					numResults={numResults}
					suggestion={searchAutocomplete}
					search={query}
					setSearch={setQuery}
					onClose={onClose}
				/>
				<SearchResults
					results={results}
					onClose={onClose}
					onSetQuery={setQuery}
					alternatives={suggestions}
				/>
			</Modal>
		);
	},
);

export default Search;
