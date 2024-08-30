import { graphql } from "gatsby";
import * as React from "react";

import {
	NormalPageContents,
	Page,
	PillContainer,
	TemplateContent,
	TemplateHeaderContainer,
	TemplateHeaderTitle,
} from "@/styles/general-components";

import { preprocessWPBlocks } from "@/utils/blocks/identify-blocks";
import { formatBlogPost, getActiveCategory } from "@/utils/blog";
import { formatWpText } from "@/utils/posts";
import { truncate } from "@/utils/strings";

import type { WpPost } from "@/types/query";
import { HeadBase } from "@/components/SEO";
import {
	CategoryContainer,
	TagContainer,
} from "@/components/Cards/Card.styles";
import { PublishedDate } from "@/components/Cards/IconedText.component";

export const Head: React.FC<WpPost> = ({ data }) => {
	const post = formatBlogPost(data.wpPost);
	const description = truncate(formatWpText(post.excerpt ?? ""), 150);

	return <HeadBase title={post.title} description={description} />;
};

const PostHeader: React.FC<{
	title: string;
	category: string;
	tags: string[] | null;
	date: Date;
}> = ({ category, tags, title, date }) => {
	return (
		<TemplateHeaderContainer>
			<CategoryContainer style={{ alignSelf: "self-start" }}>
				{category}
			</CategoryContainer>
			{tags && (
				<TagContainer style={{ justifyContent: "start" }}>
					{tags.map((t) => (
						<PillContainer key={t}>{t}</PillContainer>
					))}
				</TagContainer>
			)}
			<TemplateHeaderTitle>{title}</TemplateHeaderTitle>
			<PublishedDate date={date} />
		</TemplateHeaderContainer>
	);
};

const Post: React.FC<WpPost> = ({ data }) => {
	const blocks = preprocessWPBlocks(data.wpPost.content ?? "");
	const post = formatBlogPost(data.wpPost);
	const activeCategory = getActiveCategory(post.categories);

	return (
		<Page>
			<NormalPageContents>
				<PostHeader
					title={post.title}
					category={activeCategory}
					tags={post.tags}
					date={post.published.date}
				/>
				<TemplateContent>
					{blocks.map((block) => (
						<div key={block.key ?? Math.random()}>{block}</div>
					))}
				</TemplateContent>
			</NormalPageContents>
		</Page>
	);
};

export default Post;

export const query = graphql`
  query ($id: String) {
    wpPost(id: { eq: $id }) {
      excerpt
      content
      title
      slug
      date
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
`;
