import type * as React from "react";

import {
	BigParagraph,
	Column,
	GroupingBox,
	Paragraph,
	Row,
} from "@Styles/general-components";

import { getPrettyDate } from "@Utils/dates";

import type { PostHeaderProps } from "@Types/props/post-components";

const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
	return (
		<GroupingBox>
			<Row style={{ justifyContent: "space-between" }}>
				{post.categories && (
					<Column>
						<BigParagraph>
							{post.categories.length > 1 ? "Categories" : "Category"}
						</BigParagraph>
						<Paragraph>{post.categories.join(", ")}</Paragraph>
					</Column>
				)}
				{post.tags && (
					<Column>
						{post.tags.length > 0 && (
							<>
								<BigParagraph>
									{post.tags.length > 1 ? "Tags" : "Tag"}
								</BigParagraph>
								<Paragraph>{post.tags.join(", ")}</Paragraph>
							</>
						)}
					</Column>
				)}
				<Column>
					<BigParagraph>Posted</BigParagraph>
					<Paragraph>{getPrettyDate(post.published.date)}</Paragraph>
				</Column>
			</Row>
		</GroupingBox>
	);
};

export default PostHeader;
