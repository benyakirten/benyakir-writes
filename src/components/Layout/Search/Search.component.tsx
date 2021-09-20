import * as React from "react";

import { Centered, Column, SubHeading } from "@Styles/general-components";
import { ResultsContainer, SingleResult } from "./Search.styles";

import Text from "@Input/Text/Text.component";
import Checkbox from "@Input/Checkbox/Checkbox.component";
import Foldout from "@Gen/Foldout/Foldout.component";
import CustomLink from "@Gen/CustomLink/CustomLink.component";

import useLookup from "@Hooks/useLookup";
import { firstWords, capitalize } from "@Utils/strings";

import { SearchProps } from "@Types/props";
import { SearchableItem } from "@Types/posts";

import data from "@/data/searchData.json";

const Search: React.FC<SearchProps> = ({ open, onClick }) => {
    const allResults = React.useMemo<SearchableItem[]>(() => data, [data]);

    const SEARCH_TIMEOUT = 600;
    const [timer, setTimer] = React.useState<NodeJS.Timeout>();
    const [searchValue, setSearchValue] = React.useState<string>("");
    const [finalSearchValue, setFinalSearchValue] = React.useState<string>("")
    const [filteredResults, setFilteredResults] = React.useState<
        SearchableItem[]
    >([]);

    const [showState, showDispatch] = useLookup({
        post: true,
        project: true,
        book: true,
        story: true,
    });

    function onSearchChange(val: string) {
        setSearchValue(val);
        if (timer) {
            clearTimeout(timer);
            setTimer(undefined);
        }
        if (!val) {
            setFilteredResults([]);
            return;
        }
        const _timeout = setTimeout(() => setFinalSearchValue(val), SEARCH_TIMEOUT);
        setTimer(_timeout);
    }

    const togglePostType = (postType: string) => showDispatch({ type: "TOGGLE", payload: postType })

    React.useEffect(() => {
        if (!finalSearchValue) return
        const _search = finalSearchValue.toLowerCase().split(" ");
        const _results = allResults.filter(
            (r) => showState[r.type] && _search.every((s) => r.meta[s])
        );
        setFilteredResults(_results);
    }, [finalSearchValue, showState])

    return (
        <Foldout
            open={open}
            topbar={<SubHeading>Search</SubHeading>}
            onClick={onClick}
            height="auto"
        >
            <Text
                value={searchValue}
                onChange={onSearchChange}
                label="Search"
                name="global-search"
                width="65%"
                tabIndex={open ? 0 : -1}
            />
            <div style={{ marginLeft: "2px", marginTop: "1rem" }}>
                <Checkbox
                    value={showState["post"]}
                    onToggle={() => togglePostType('post')}
                    label="Show Posts"
                    name="global-search-show-post"
                    tabIndex={open ? 0 : -1}
                />
                <Checkbox
                    value={showState["project"]}
                    onToggle={() => togglePostType('project')}
                    label="Show Projects"
                    name="global-search-show-project"
                    tabIndex={open ? 0 : -1}
                />
                <Checkbox
                    value={showState["book"]}
                    onToggle={() => togglePostType('book')}
                    label="Show Books"
                    name="global-search-show-book"
                    tabIndex={open ? 0 : -1}
                />
                <Checkbox
                    value={showState["story"]}
                    onToggle={() => togglePostType('story')}
                    label="Show Stories"
                    name="global-search-show-story"
                    tabIndex={open ? 0 : -1}
                />
            </div>
            <ResultsContainer resultLength={filteredResults.length}>
                {filteredResults.length === 0 ? (
                    <Centered>No results yet!</Centered>
                ) : (
                    <>
                        {filteredResults.map((r, idx) => (
                            <SingleResult id="no-toggle" key={r.slug + idx}>
                                <CustomLink
                                    dark={false}
                                    to={`/${r.type}/${r.slug}`}
                                >
                                    <Column
                                        style={{
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <span>{firstWords(r.title, 18)}</span>
                                        <span>{capitalize(r.type)}</span>
                                    </Column>
                                </CustomLink>
                            </SingleResult>
                        ))}
                    </>
                )}
            </ResultsContainer>
        </Foldout>
    );
};

export default Search;
