import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

import {
    Centered,
    Column,
    SubHeading,
} from "@Styles/general-components";

import Text from "@Input/Text/Text.component";
import Checkbox from "@Input/Checkbox/Checkbox.component";
import Foldout from "@Gen/Foldout/Foldout.component";

import useLookup from "@Hooks/useLookup";
import { capitalize, prepareGlobalValues } from "@Utils/search";

import { SearchProps } from "@Types/props";
import { GlobalQuery } from "@Types/query";
import { SearchableItem } from "@Types/posts";
import { ResultsContainer, SingleResult } from "./Search.styles";
import { firstWords } from "@/utils/strings";
import CustomLink from "@/components/General/CustomLink/CustomLink.component";

const Search: React.FC<SearchProps> = ({ open, onClick }) => {
    const query = useStaticQuery<GlobalQuery>(graphql`
        query {
            allWpBook {
                nodes {
                    slug
                    title
                    content
                    book {
                        publishedOn
                        purchaseLinks
                        purchaseLinksNames
                        relatedStories {
                            ... on WpShortstory {
                                title
                                slug
                            }
                        }
                        relatedProject {
                            ... on WpProject {
                                title
                            }
                        }
                        relatedProjectDesc
                    }
                }
            }
            allWpShortstory {
                nodes {
                    title
                    content
                    slug
                    shortStory {
                        publishedOn
                        relatedBook {
                            ... on WpBook {
                                title
                                content
                                slug
                            }
                        }
                        relationshipToBook
                    }
                }
            }
            allWpProject {
                nodes {
                    project {
                        technologies
                        mainLink
                        repoLink
                        hostedOn
                        firstReleased
                        latestUpdate
                    }
                    title
                    content
                    slug
                }
            }
            allWpPost {
                nodes {
                    title
                    slug
                    date
                    excerpt
                    categories {
                        nodes {
                            name
                        }
                    }
                    tags {
                        nodes {
                            name
                        }
                    }
                }
            }
        }
    `);

    const allResults = React.useMemo(() => prepareGlobalValues(query), [query]);

    const SEARCH_TIMEOUT = 600;
    const [timer, setTimer] = React.useState<NodeJS.Timeout>();
    const [searchValue, setSearchValue] = React.useState<string>("");
    const [filteredResults, setFilteredResults] = React.useState<
        SearchableItem[]
    >([]);

    const [showState, showDispatch] = useLookup({
        post: true,
        project: true,
        book: true,
        story: true,
    });

    function onSearch(val: string) {
        const _search = val.toLowerCase().split(" ");
        const _results = allResults.filter(
            (r) => showState[r.type] && _search.every((s) => r.meta[s])
        );
        setFilteredResults(_results);
    }

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
        const _timeout = setTimeout(() => onSearch(val), SEARCH_TIMEOUT);
        setTimer(_timeout);
    }
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
            />
            <div style={{ marginLeft: "2px", marginTop: "1rem" }}>
                <Checkbox
                    value={showState["post"]}
                    onToggle={() =>
                        showDispatch({ type: "TOGGLE", payload: "post" })
                    }
                    label="Show Posts"
                    name="global-search-show-post"
                />
                <Checkbox
                    value={showState["project"]}
                    onToggle={() =>
                        showDispatch({ type: "TOGGLE", payload: "project" })
                    }
                    label="Show Projects"
                    name="global-search-show-project"
                />
                <Checkbox
                    value={showState["book"]}
                    onToggle={() =>
                        showDispatch({ type: "TOGGLE", payload: "book" })
                    }
                    label="Show Books"
                    name="global-search-show-book"
                />
                <Checkbox
                    value={showState["story"]}
                    onToggle={() =>
                        showDispatch({ type: "TOGGLE", payload: "story" })
                    }
                    label="Show Stories"
                    name="global-search-show-story"
                />
            </div>
            <ResultsContainer resultLength={filteredResults.length}>
                {filteredResults.length === 0 ? (
                    <Centered>No results yet!</Centered>
                ) : (
                    <>
                        {filteredResults.map((r) => (
                            <SingleResult id="no-toggle">
                                <CustomLink
                                    dark={false}
                                    to={`/${r.type}/${r.slug}`}
                                >
                                    <Column
                                        style={{
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <span>
                                            {firstWords(
                                                r.title,
                                                18
                                            )}
                                        </span>
                                        <span>
                                            {capitalize(r.type)}
                                        </span>
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
