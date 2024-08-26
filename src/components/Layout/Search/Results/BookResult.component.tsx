import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";

import { FlattenedBookCard } from "@/types/posts";
import {
	ResultContainer,
	InnerContainer,
	ContentContainer,
	TitleContainer,
	SlubTitle,
	ItemTitle,
	BookCoverContainer,
} from "./Result.styles";
import { getPrettyDate } from "@/utils/dates";
import { WpContentDescription } from "@/styles/general-components";

const BookResult: React.FC<{
	book: FlattenedBookCard;
	onView: (slug: string) => void;
}> = ({ book, onView }) => {
	return (
		<ResultContainer role="link" onClick={() => onView(`/book/${book.slug}`)}>
			<InnerContainer>
				<ContentContainer>
					<TitleContainer>
						<ItemTitle>{book.title}</ItemTitle>
						<SlubTitle>{getPrettyDate(book.published.date)}</SlubTitle>
					</TitleContainer>
					<WpContentDescription
						dangerouslySetInnerHTML={{ __html: book.content }}
					/>
				</ContentContainer>
				{book.snapshotCover && (
					<BookCoverContainer>
						<GatsbyImage image={book.snapshotCover} alt={book.title} />
					</BookCoverContainer>
				)}
			</InnerContainer>
		</ResultContainer>
	);
};

export default BookResult;
