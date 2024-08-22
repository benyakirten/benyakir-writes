import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";

import { FlattenedBookCard } from "@/types/posts";
import CardExterior from "./CardExterior.component";
import { SpanOneContent, SpanOneTitle, ImageContainer } from "./Card.styles";
import { PublishedDate } from "./IconedText.component";

const NewBookCard: React.FC<{ book: FlattenedBookCard }> = ({ book }) => {
	return (
		<CardExterior slug={`/book/${book.slug}`} columns="1fr 67px">
			{book.cover && (
				<ImageContainer>
					<GatsbyImage image={book.cover} alt={book.title} />
				</ImageContainer>
			)}
			<SpanOneTitle>{book.title}</SpanOneTitle>
			<SpanOneContent dangerouslySetInnerHTML={{ __html: book.content }} />
			<PublishedDate date={book.published.date} />
		</CardExterior>
	);
};

export default NewBookCard;
