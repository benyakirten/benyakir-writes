import * as React from "react";

import { BlogCard, CardContainer } from "@/components/Cards";
import { Filter } from "@/components/Filters";
import { HeadBase } from "@/components/SEO";
import {
  blogDescription,
  postCategories,
  postTags,
  posts,
} from "@/data/search";
import usePagination from "@/hooks/usePagination.hook";
import {
  Grouping,
  LeadHeading,
  Page,
  PaginatedPageContents,
} from "@/styles/general-components";
import { FilterOption, ItemFilter } from "@/types/filters";
import type { FlattenedBlogCard } from "@/types/posts";
import {
  createAddDateFilterFn,
  createAddKeywordFilterFn,
  createAddSearchFilterFn,
  createFilterByDateFn,
  createFilterByKeywordFn,
  createFilterBySearchFn,
} from "@/utils/filter";
import { useFilter } from "@/hooks";

export const Head: React.FC = () => (
  <HeadBase title="Blog" description={blogDescription} />
);

const createFilterOptionsFn = (
  setFilters: React.Dispatch<React.SetStateAction<ItemFilter[]>>
) => [
  {
    match: "date",
    fn: createAddDateFilterFn(
      posts[posts.length - 1].published.date,
      posts[0].published.date,
      setFilters
    ),
  },
  {
    match: "tags",
    fn: createAddKeywordFilterFn("tags", postTags, setFilters),
  },
  {
    match: "categories",
    fn: createAddKeywordFilterFn("categories", postCategories, setFilters),
  },
  {
    match: "search",
    fn: createAddSearchFilterFn(setFilters),
  },
];

const filterBySearch = createFilterBySearchFn<FlattenedBlogCard>(
  (post, word) => {
    const lcWord = word.toLocaleLowerCase();
    return (
      !!post.meta[word] ||
      post.title.toLocaleLowerCase().includes(lcWord) ||
      post.excerpt?.toLocaleLowerCase().includes(lcWord) ||
      post.content?.toLocaleLowerCase().includes(lcWord) ||
      !!post.tags?.find((tag) => tag.toLocaleLowerCase().includes(lcWord)) ||
      !!post.categories?.find((cat) => cat.toLocaleLowerCase().includes(lcWord))
    );
  }
);
const filterByKeywords = createFilterByKeywordFn<FlattenedBlogCard>(
  (post, id) => (id === "tags" ? post.tags : post.categories) ?? []
);
const filterByDate = createFilterByDateFn<FlattenedBlogCard>(
  (post) => post.published.date
);

const BlogPage: React.FC = () => {
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
    posts,
    posts[posts.length - 1].published.date,
    posts[0].published.date,
    [
      { id: "tags", allKeywords: postTags },
      { id: "categories", allKeywords: postCategories },
    ],
    createFilterOptionsFn,
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
      label: "Tags",
      id: "tags",
      disabled: filters.some((filter) => filter.id === "tags"),
    },
    {
      label: "Categories",
      id: "categories",
      disabled: filters.some((filter) => filter.id === "categories"),
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
        <LeadHeading>Blog Posts</LeadHeading>
        <Filter
          options={options}
          filters={filters}
          onCreate={createFilter}
          onModifyKeywords={modifyKeywords}
          onModifyDate={modifyDate}
          onRemove={removeFilter}
          onModifyWordFilterType={modifyFilterType}
          onModifySearch={modifySearch}
          currentPage={pagination.page}
          numPages={pagination.numPages}
          setPage={pagination.setPage}
        />
        <Grouping>
          <CardContainer
            Card={BlogCard}
            items={pagination.visibleItems}
            type="post"
          />
        </Grouping>
      </PaginatedPageContents>
    </Page>
  );
};

export default BlogPage;
