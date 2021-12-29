import * as React from "react";
import { Helmet } from "react-helmet";

import { Grouping, SubHeading } from "@Styles/general-components";

import { LeadPage, Paginate } from "@Layout";
import { AuthorFilter } from "@Posts";
import { BookCard, StoryCard } from "@Variants";

import { usePagination } from "@Hooks";

import booksJson from "@WPData/Author/books.json";
import storiesJson from "@WPData/Author/stories.json";

import { FlattenedBookCard, FlattenedStoryCard } from "@Types/posts";

const AuthorPage: React.FC = () => {
  const books = React.useMemo<FlattenedBookCard[]>(
    () =>
      booksJson.map((b: FlattenedBookCard) => ({
        ...b,
        published: { ...b.published, date: new Date(b.published.date) },
      })),
    [booksJson]
  );

  const stories = React.useMemo<FlattenedStoryCard[]>(
    () =>
      storiesJson.map((s: FlattenedStoryCard) => ({
        ...s,
        published: { ...s.published, date: new Date(s.published.date) },
      })),
    [storiesJson]
  );

  const bookPagination = usePagination<FlattenedBookCard>(books);
  const storyPagination = usePagination<FlattenedStoryCard>(stories);

  function handleFilter(
    newBooks: FlattenedBookCard[],
    newStories: FlattenedStoryCard[]
  ) {
    bookPagination.setCurrentItems(newBooks);
    storyPagination.setCurrentItems(newStories);
  }

  return (
    <LeadPage
      title="Author"
      filter={
        <AuthorFilter
          allBooks={books}
          allStories={stories}
          onFilter={handleFilter}
        />
      }
    >
      <Helmet>
        <title>Benyakir Writes - Author</title>
        <meta
          name="description"
          content="A view of all of my short stories and published books. They can be filtered by keyword, date of publication,
                    or by relation to an individual book."
        />
      </Helmet>
      <Grouping marginVertical="2rem">
        <SubHeading>Books</SubHeading>
        <Paginate {...bookPagination} El={BookCard} />
      </Grouping>
      <Grouping marginVertical="2rem">
        <SubHeading>Short Stories</SubHeading>
        <Paginate {...storyPagination} El={StoryCard} />
      </Grouping>
    </LeadPage>
  );
};

export default AuthorPage;
