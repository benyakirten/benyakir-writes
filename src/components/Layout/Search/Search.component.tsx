import * as React from "react";

import { Centered, Column, SubHeading } from "@Styles/general-components";
import { ResultsContainer, SingleResult } from "./Search.styles";

import { Text, Checkbox } from "@Input";
import { Foldout, CustomLink } from "@Gen";

import { useLookup, useDebounce } from "@Hooks";
import { firstWords, capitalize } from "@Utils/strings";

import data from "@Data/searchData.json";

import { SearchableItem } from "@Types/posts";

const Search: React.FC<SearchProps> = ({ open, onClick }) => {
  const allResults = React.useMemo<SearchableItem[]>(() => data, [data]);

  const [search, setSearch] = useDebounce(filterResults);
  const [filteredResults, setFilteredResults] = React.useState<
    SearchableItem[]
  >([]);

  const [showState, showDispatch] = useLookup({
    post: true,
    project: true,
    book: true,
    story: true,
  });

  const togglePostType = (postType: string) =>
    showDispatch({ type: "TOGGLE", payload: postType });

  function filterResults(val: string) {
    // This is unnecessary for the component to function,
    // but it causes the component not to re-render on initial render
    // It really annoys me
    if (filteredResults.length === 0 && !val) return;

    const _search = val.toLowerCase().split(" ");
    if (!val) setFilteredResults([]);
    const _results = allResults.filter(
      (r) => showState[r.type] && _search.every((s) => r.meta[s])
    );
    setFilteredResults(_results);
  }

  React.useEffect(() => {
    filterResults(search);
  }, [showState]);

  return (
    <Foldout
      open={open}
      topbar={
        <SubHeading style={{ transition: "color 0.8s ease" }}>
          Search
        </SubHeading>
      }
      onClick={onClick}
      height={filteredResults.length === 0 ? "25rem" : "32rem"}
    >
      <Text
        value={search}
        onChange={setSearch}
        label="Search"
        name="global-search"
        width="65%"
        tabIndex={open ? 0 : -1}
        cyId="search-text-input"
      />
      <div style={{ marginLeft: "2px", marginTop: "1rem" }}>
        <Checkbox
          value={showState["post"]}
          onToggle={() => togglePostType("post")}
          label="Show Posts"
          name="global-search-show-post"
          tabIndex={open ? 0 : -1}
        />
        <Checkbox
          value={showState["project"]}
          onToggle={() => togglePostType("project")}
          label="Show Projects"
          name="global-search-show-project"
          tabIndex={open ? 0 : -1}
        />
        <Checkbox
          value={showState["book"]}
          onToggle={() => togglePostType("book")}
          label="Show Books"
          name="global-search-show-book"
          tabIndex={open ? 0 : -1}
        />
        <Checkbox
          value={showState["story"]}
          onToggle={() => togglePostType("story")}
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
              <SingleResult data-navtoggle="no-toggle" key={r.slug + idx}>
                <CustomLink inheritColor={true} to={`/${r.type}/${r.slug}`}>
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
