import * as React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { Column, LeadHeading } from "@Styles/general-components";

import LeadPage from "@Layout/LeadPage/LeadPage.component";
import AllFilter from "@Posts/BlogFilters/AllFilter/AllFilter.component";
import BlogCard from "@Variant/BlogCard/BlogCard.component";

import { formatAllBlogPosts } from "@Utils/blog";

import { AllWpPost } from "@Types/query";
import { FlattenedBlogPost } from "@Types/posts";

const BlogPage: React.FC<AllWpPost> = ({ data }) => {
    const posts = formatAllBlogPosts(data.allWpPost.nodes);
    const [filteredPosts, setFilteredPosts] =
        React.useState<FlattenedBlogPost[]>(posts);
    return (
        <LeadPage
            filter={<AllFilter allPosts={posts} onFilter={setFilteredPosts} />}
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
            <Column>
                <TransitionGroup>
                    {filteredPosts.map((p) => (
                        <CSSTransition
                            key={p.slug}
                            timeout={800}
                            classNames="filterable-card"
                        >
                            <BlogCard post={p} />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </Column>
        </LeadPage>
    );
};

export const query = graphql`
    query {
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
`;

export default BlogPage;
