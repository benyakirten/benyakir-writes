import * as React from 'react';

import { BigParagraph, Grouping, Page } from '@Styles/general-components';

import { CustomLink, Loading } from '@Gen';
import { LeadPage, Paginate } from '@Layout';
import { CategoryFilter } from '@Posts';
import { BlogCard } from '@Variants';

import { usePagination } from '@Hooks';
import { titleToKebab } from '@Utils/strings';

import { FlattenedBlogCard } from '@Types/posts';
import { WpPostByCategory } from '@Types/query';

export const Head: React.FC<WpPostByCategory> = ({ pageContext }) => (
  <>
    <title>Benyakir Writes - {pageContext.name}</title>
    <meta
      name="description"
      content={`Browse a list of all blog posts in ${pageContext.name}, ordered by most recent publication to least recent. Users can
                    filter the blog results by publication date and tags.`}
    />
  </>
);

const CategoryTemplate: React.FC<WpPostByCategory> = ({ pageContext }) => {
  const [loading, setLoading] = React.useState(true);
  const [catPosts, setCatPosts] = React.useState<FlattenedBlogCard[]>([]);

  React.useEffect(() => {
    const catName = titleToKebab(pageContext.name);
    import(`@WPData/Posts/${catName}.json`).then((posts) => {
      setCatPosts(
        posts.default.map((b: FlattenedBlogCard) => ({
          ...b,
          published: {
            ...b.published,
            date: new Date(b.published.date),
          },
        })),
      );
      // The loading should come at the end because then the dates will be properly loaded.
      // Even though the category filter has a backup and can handle an empty array, the dates
      // will be set for a moment to today's date then go to the correct one
      // Or maybe not! Gatsby's static generation might do some magic that I don't understand
      setLoading(false);
    });
  }, []);

  const postPagination = usePagination<FlattenedBlogCard>(catPosts);

  return (
    <Page>
      <LeadPage
        title={pageContext.name}
        filter={
          loading ? (
            <Loading />
          ) : (
            <CategoryFilter allPosts={catPosts} onFilter={postPagination.setCurrentItems} />
          )
        }
      >
        {loading ? (
          <Loading size="4rem" />
        ) : (
          <>
            <Grouping>
              {catPosts.length > 0 ? (
                <Paginate {...postPagination} El={BlogCard} />
              ) : (
                <BigParagraph>
                  There are no posts in the category {pageContext.name}. Maybe you want to check out
                  the general <CustomLink to="/blog">blog page</CustomLink> instead?
                </BigParagraph>
              )}
            </Grouping>
          </>
        )}
      </LeadPage>
    </Page>
  );
};

export default CategoryTemplate;
