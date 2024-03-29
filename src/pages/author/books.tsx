import * as React from 'react'

import { Grouping, Page } from '@Styles/general-components'

import { LeadPage, Paginate } from '@Layout'
import { BookFilter } from '@Posts'
import { BookCard } from '@Variants'

import { usePagination } from '@Hooks'

import booksJson from '@WPData/Author/books.json'

import { FlattenedBookCard } from '@Types/posts'

export const Head: React.FC = () => (
  <>
    <title>Benyakir Writes - Books</title>
    <meta
      name="description"
      content="A view of all of my published books. They can be filtered by keyword or date of publication. Get a quick preview of all
            of the books before looking them up individually"
    />
  </>
)

const BooksPage: React.FC = () => {
  const books = React.useMemo<FlattenedBookCard[]>(
    () =>
      booksJson.map((b: FlattenedBookCard) => ({
        ...b,
        published: { ...b.published, date: new Date(b.published.date) },
      })),
    [booksJson]
  )
  const bookPagination = usePagination<FlattenedBookCard>(books)

  return (
    <Page>
      <LeadPage
        title="Books"
        filter={
          <BookFilter books={books} onFilter={bookPagination.setCurrentItems} />
        }
      >
        <Grouping>
          <Paginate {...bookPagination} El={BookCard} />
        </Grouping>
      </LeadPage>
    </Page>
  )
}

export default BooksPage
