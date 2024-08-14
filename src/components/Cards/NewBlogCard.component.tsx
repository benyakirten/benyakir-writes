import React from "react";
import styled from "styled-components";

import { FlattenedBlogCard } from "@/types/posts";

const BlogCardExterior = styled.li``;

const NewBlogCard: React.FC<{ post: FlattenedBlogCard }> = ({ post }) => {
	return (
		<BlogCardExterior>
			<h2>{post.title}</h2>
		</BlogCardExterior>
	);
};

export default NewBlogCard;
