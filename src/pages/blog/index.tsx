import * as React from 'react';

import { Grouping } from '@Styles/general-components';

import { LeadPage, Paginate } from '@Layout';
import { AllFilter } from '@Posts';
import { BlogCard } from '@Variants';

import usePagination from '@/hooks/usePagination.hook';

import postsJson from '@WPData/Posts/all.json';

import { FlattenedBlogCard } from '@Types/posts';

export const Head = () => (
  <>
    <title>Benyakir Writes - Blogs</title>
    <meta
      name="description"
      content="Browse a list of all my blog posts ordered by most recent publication to least recent. Users can
            filter the blog results by publication date, category and tags."
    />
  </>
);

const BlogPage: React.FC = () => {
  const posts = React.useMemo(
    () =>
      postsJson.map((b: FlattenedBlogCard) => ({
        ...b,
        published: { ...b.published, date: new Date(b.published.date) },
      })),
    [postsJson],
  );
  const postPagination = usePagination<FlattenedBlogCard>(posts);

  return (
    <LeadPage
      title="Blog Posts"
      filter={<AllFilter allPosts={posts} onFilter={postPagination.setCurrentItems} />}
    >
      <Grouping>
        <Paginate {...postPagination} El={BlogCard} />
      </Grouping>
    </LeadPage>
  );
};

export default BlogPage;
