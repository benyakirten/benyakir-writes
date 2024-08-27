import { graphql } from "gatsby";
import * as React from "react";

import {
	Grouping,
	LeadHeading,
	NormalPageContents,
	Page,
} from "@Styles/general-components";

import { createBlocks, preprocessWPEntry } from "@Utils/blocks/identify-blocks";
import { formatBlogPost } from "@Utils/blog";
import { formatWpText } from "@Utils/posts";
import { truncate } from "@Utils/strings";

import type { WpPost } from "@Types/query";
import { PostHeader } from "@Variants";
import { HeadBase } from "@/components/General";

export const Head: React.FC<WpPost> = ({ data }) => {
	const post = formatBlogPost(data.wpPost);
	const description = truncate(formatWpText(post.excerpt ?? ""), 150);

	return <HeadBase title={post.title} description={description} />;
};

const Post: React.FC<WpPost> = ({ data }) => {
	const entry = preprocessWPEntry(data.wpPost.content ?? "");
	const blocks = createBlocks(entry);
	const post = formatBlogPost(data.wpPost);

	return (
		<Page>
			<NormalPageContents>
				<LeadHeading>{post.title}</LeadHeading>
				<PostHeader post={post} />
				<Grouping>
					{blocks.map((block) => (
						<div key={block.key}>{block}</div>
					))}
				</Grouping>
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
