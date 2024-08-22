import React from "react";

import { FlattenedBookCard } from "@/types/posts";
import CardExterior from "./CardExterior.component";
import {
	AuthorContent,
	AuthorTitle,
	ImageContainer,
	PublishedContainer,
} from "./Card.styles";
import { getPrettyDate } from "@/utils/dates";
import { GatsbyImage } from "gatsby-plugin-image";

const NewBookCard: React.FC<{ book: FlattenedBookCard }> = ({ book }) => {
	return (
		<CardExterior slug={`/book/${book.slug}`} columns="1fr 67px">
			{book.cover && (
				<ImageContainer>
					<GatsbyImage image={book.cover} alt={book.title} />
				</ImageContainer>
			)}
			<AuthorTitle>{book.title}</AuthorTitle>
			<AuthorContent dangerouslySetInnerHTML={{ __html: book.content }} />
			<PublishedContainer>
				Published on {getPrettyDate(book.published.date)}
			</PublishedContainer>
		</CardExterior>
	);
};

export default NewBookCard;
