import React from "react";

import { FlattenedBlogCard } from "@/types/posts";

const PostResult: React.FC<{ post: FlattenedBlogCard }> = ({ post }) => {
	return (
		<div>
			<h2>{post.title}</h2>
		</div>
	);
};

export default PostResult;
