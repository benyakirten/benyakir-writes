import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";

import { FlattenedBookCard } from "@/types/posts";
import { ImageContainer, SpanOneContent, SpanOneTitle } from "./Card.styles";
import CardExterior from "./CardExterior.component";
import { PublishedDate } from "./IconedText.component";

const BookCard: React.FC<{ book: FlattenedBookCard }> = ({ book }) => {
	return (
		<CardExterior slug={`/book/${book.slug}`} columns="1fr 67px">
			{book.cover && (
				<ImageContainer>
					<GatsbyImage image={book.cover} alt={book.title} />
				</ImageContainer>
			)}
			<SpanOneTitle>{book.title}</SpanOneTitle>
			<SpanOneContent dangerouslySetInnerHTML={{ __html: book.content }} />
			<PublishedDate span={2} date={book.published.date} />
		</CardExterior>
	);
};

export default BookCard;
