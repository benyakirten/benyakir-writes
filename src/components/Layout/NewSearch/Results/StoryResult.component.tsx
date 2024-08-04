import React from "react";

import { FlattenedStoryCard } from "@/types/posts";

const PostStory: React.FC<{ story: FlattenedStoryCard }> = ({ story }) => {
	return (
		<div>
			<h2>{story.title}</h2>
		</div>
	);
};

export default PostStory;
