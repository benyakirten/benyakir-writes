import * as React from "react";

import { CardContainer } from "@/components/Cards";
import { Filter } from "@/components/Filters";
import { AuthorCard } from "@/components/General";
import { HeadBase } from "@/components/SEO";
import { authorDescription, books, stories } from "@/data/search";
import { useFilter } from "@/hooks";
import {
  Grouping,
  LeadHeading,
  Page,
  PaginatedPageContents,
} from "@/styles/general-components";
import { FilterOption, KeywordFilter } from "@/types/filters";
import type { AuthoredItemCard } from "@/types/posts";
import { createFilterByDateFn, createFilterBySearchFn } from "@/utils/filter";

export const Head: React.FC = () => (
  <HeadBase title="Author" description={authorDescription} />
);

const items: AuthoredItemCard[] = [...books, ...stories].sort(
  (a, b) => b.published.date.valueOf() - a.published.date.valueOf()
);

const filterBySearch = createFilterBySearchFn<AuthoredItemCard>(
  (item, word) => {
    const lcWord = word.toLocaleLowerCase();
    return (
      item.meta[word] ||
      item.title.toLocaleLowerCase().includes(lcWord) ||
      item.content?.toLocaleLowerCase().includes(lcWord)
    );
  }
);

const filterByKeywords = (
  _: KeywordFilter,
  items: AuthoredItemCard[]
): AuthoredItemCard[] => items;

const filterByDate = createFilterByDateFn<AuthoredItemCard>(
  (item) => item.published.date
);

const AuthorPage: React.FC = () => {
  const {
    pagination,
    createFilter,
    removeFilter,
    modifyDate,
    modifyKeywords,
    modifyFilterType,
    modifySearch,
    filters,
  } = useFilter(
    items,
    items[items.length - 1].published.date,
    items[0].published.date,
    [],
    filterByDate,
    filterByKeywords,
    filterBySearch
  );

  const options: FilterOption[] = [
    {
      label: "Publish Date",
      id: "date",
      disabled: filters.some((filter) => filter.id === "date"),
    },
    {
      label: "Search",
      id: "search",
      disabled: false,
    },
  ];

  return (
    <Page>
      <PaginatedPageContents>
        <LeadHeading>Written Work</LeadHeading>
        <Filter
          onCreate={createFilter}
          onRemove={removeFilter}
          onModifyDate={modifyDate}
          onModifyKeywords={modifyKeywords}
          onModifyWordFilterType={modifyFilterType}
          onModifySearch={modifySearch}
          options={options}
          filters={filters}
          currentPage={pagination.page}
          numPages={pagination.numPages}
          setPage={pagination.setPage}
        />
        <Grouping>
          <CardContainer
            items={pagination.visibleItems}
            Card={AuthorCard}
            type="books or storie"
          />
        </Grouping>
      </PaginatedPageContents>
    </Page>
  );
};

export default AuthorPage;
