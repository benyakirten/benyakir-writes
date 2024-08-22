import React from "react";

import { FlattenedBookCard } from "@/types/posts";
import CardExterior from "./CardExterior.component";
import { CardTitle } from "./Card.styles";

const NewBookCard: React.FC<{ book: FlattenedBookCard }> = ({ book }) => {
	return (
		<CardExterior slug={`/book/${book.slug}`}>
			<CardTitle>{book.title}</CardTitle>
		</CardExterior>
	);
};

export default NewBookCard;
