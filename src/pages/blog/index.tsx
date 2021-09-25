import * as React from "react";
import { Helmet } from "react-helmet";

import { Grouping, LeadHeading } from "@Styles/general-components";

import LeadPage from "@Layout/LeadPage/LeadPage.component";
import AllFilter from "@Posts/BlogFilters/AllFilter/AllFilter.component";
import BlogCard from "@Variant/BlogCard/BlogCard.component";
import Paginate from "@Layout/Paginate/Paginate.component";

import usePagination from "@Hooks/usePagination";

import postsJson from "@WPData/Posts/all.json";

import { FlattenedBlogCard } from "@Types/posts";

const BlogPage: React.FC = () => {
    const posts = React.useMemo(
        () =>
            postsJson.map((b: FlattenedBlogCard) => ({
                ...b,
                published: { ...b.published, date: new Date(b.published.date) },
            })),
        [postsJson]
    );
    const postPagination = usePagination<FlattenedBlogCard>(posts);

    return (
        <LeadPage
            filter={
                <AllFilter
                    allPosts={posts}
                    onFilter={postPagination.setCurrentItems}
                />
            }
        >
            <Helmet>
                <title>Benyakir Writes - Blogs</title>
                <meta
                    name="description"
                    content="Browse a list of all my blog posts ordered by most recent publication to least recent. Users can
                    filter the blog results by publication date, category and tags."
                />
            </Helmet>
            <LeadHeading>Blog Posts</LeadHeading>
            <Grouping>
                <Paginate {...postPagination} El={BlogCard} />
            </Grouping>
        </LeadPage>
    );
};

export default BlogPage;
