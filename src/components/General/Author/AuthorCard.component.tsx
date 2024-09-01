import React from "react";

import { StoryCard, BookCard } from "@/components/Cards";
import { AuthoredItemCard } from "@/types/posts";

const AuthorCard: React.FC<AuthoredItemCard> = (props) => {
	if ("book" in props) {
		return <StoryCard story={props} />;
	}
	return <BookCard book={props} />;
};

export default AuthorCard;
