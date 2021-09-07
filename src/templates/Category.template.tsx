import * as React from "react";
import { graphql } from "gatsby";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Helmet } from "react-helmet";

import { LeadHeading, Column } from "@Styles/general-components"

import LeadPage from "@Layout/LeadPage/LeadPage.component";
import CategoryFilter from "@Posts/BlogFilters/CategoryFilter/CategoryFilter.component";
import BlogCard from "@Variant/BlogCard/BlogCard.component";

import { formatAllBlogPosts } from "@Utils/blog";

import { AllWpPost, WpPostByCategory } from "@Types/query";
import { FlattenedBlogPost } from "@Types/posts";

const CategoryTemplate: React.FC<WpPostByCategory> = ({ data, pageContext }) => {
    const posts = formatAllBlogPosts(data.allWpPost.nodes)
    const [filteredPosts, setFilteredPosts] = React.useState<FlattenedBlogPost[]>(posts)
    return (
        <LeadPage
            filter={(
                <CategoryFilter
                    allPosts={posts}
                    onFilter={setFilteredPosts}
                />
            )}
        >
             <Helmet>
                <title>Benyakir Writes - {pageContext.name}</title>
                <meta
                    name="description"
                    content={`Browse a list of all blog posts in ${pageContext.name}, ordered by most recent publication to least recent. Users can
                    filter the blog results by publication date and tags.`}
                />
            </Helmet>
            <LeadHeading>{pageContext.name}</LeadHeading>
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
    )
};

export const query = graphql`
    query ($name: String) {
        allWpPost(
            filter: {
                categories: {
                    nodes: { elemMatch: { name: { eq: $name } } }
                }
            }
        ) {
            nodes {
                title
                slug
                categories {
                    nodes {
                        name
                    }
                }
                excerpt
                date
                tags {
                    nodes {
                        name
                    }
                }
            }
        }
    }
`;

export default CategoryTemplate
