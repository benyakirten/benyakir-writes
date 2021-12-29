import * as React from "react";

import { SubHeading } from "@Styles/general-components";

import { Filter, DatePicker, MultipleChoice } from "@Input";
import { Foldout } from "@Gen";

import { useAlternation } from "@Hooks";
import { getValuesForSelected } from "@Utils/filter";
import { hasSomeContent } from "@Utils/search";

import { AuthorFilterProps } from "@Types/props/post-components";

const AuthorFilter: React.FC<AuthorFilterProps> = ({
  allBooks,
  allStories,
  onFilter,
}) => {
  const [dropdownOpen, setDropdown] = useAlternation();

  // Min and max date are determined by what's the first book or story published and idem for the latest one published
  const earliestPubDate = React.useMemo(
    () =>
      Math.min(
        allBooks[allBooks.length - 1].published.date.getTime(),
        allStories[allStories.length - 1].published.date.getTime()
      ),
    allBooks
  );
  const latestPubDate = React.useMemo(
    () =>
      Math.max(
        allBooks[0].published.date.getTime(),
        allStories[0].published.date.getTime()
      ),
    allBooks
  );

  const [publishedBefore, setPublishedBefore] = React.useState<Date>(
    new Date(latestPubDate)
  );
  const [publishedAfter, setPublishedAfter] = React.useState<Date>(
    new Date(earliestPubDate)
  );

  const [filterWords, setFilterWords] = React.useState<string[]>([]);
  const [bookChoices, setBookChoices] = React.useState<PotentialChoice[]>(
    allBooks.map((b) => ({
      value: b.title,
      selected: false,
    }))
  );

  React.useEffect(() => {
    let filteredBooks = allBooks
      .filter((b) => b.published.date.getTime() <= publishedBefore.getTime())
      .filter((b) => b.published.date.getTime() >= publishedAfter.getTime());

    let filteredStories = allStories
      .filter((s) => s.published.date.getTime() <= publishedBefore.getTime())
      .filter((s) => s.published.date.getTime() >= publishedAfter.getTime());

    if (hasSomeContent(filterWords)) {
      filteredBooks = filteredBooks.filter((b) =>
        filterWords.every((w) => b.meta[w] || b.meta[w.toLowerCase()])
      );
      filteredStories = filteredStories.filter((s) =>
        filterWords.every((w) => s.meta[w] || s.meta[w.toLowerCase()])
      );
    }

    if (bookChoices.some((b) => b.selected)) {
      const _bookChoices = getValuesForSelected(bookChoices);
      filteredBooks = filteredBooks.filter((b) =>
        _bookChoices.some((c) => c === b.title)
      );
      filteredStories = filteredStories.filter((s) =>
        _bookChoices.some((c) => c === s.book?.title)
      );
    }

    onFilter(filteredBooks, filteredStories);
  }, [publishedBefore, publishedAfter, filterWords, bookChoices]);

  function setSearchString(filterString: string) {
    // This first line is redundant because there are already checks for empty strings
    // However, testing fails otherwise because the useDebounce hook will
    // cause an internal state change as the component is rendering
    // This line prevents that state change and allows the tests to work
    if (!filterString && !hasSomeContent(filterWords)) return;
    setFilterWords(filterString ? filterString.split(" ") : [""]);
  }

  return (
    <Filter name="author" onSearch={setSearchString}>
      <Foldout
        topbar={<SubHeading>Filter by date</SubHeading>}
        open={dropdownOpen === "date"}
        onClick={() => setDropdown("date")}
        height="10rem"
        cyId="foldout-dates"
      >
        <DatePicker
          name="proect-published-before"
          value={publishedBefore}
          label="Published before"
          onChange={setPublishedBefore}
          tabIndex={dropdownOpen === "date" ? 0 : -1}
        />
        <DatePicker
          name="project-published-after"
          value={publishedAfter}
          label="Published after"
          onChange={setPublishedAfter}
          tabIndex={dropdownOpen === "date" ? 0 : -1}
        />
      </Foldout>
      <Foldout
        topbar={<SubHeading>Filter by book</SubHeading>}
        open={dropdownOpen === "book"}
        onClick={() => setDropdown("book")}
        height="auto"
        cyId="foldout-book"
      >
        <MultipleChoice
          choices={bookChoices}
          onSelect={setBookChoices}
          tabIndex={dropdownOpen === "book" ? 0 : -1}
        />
      </Foldout>
    </Filter>
  );
};

export default AuthorFilter;
