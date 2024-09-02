import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";

import { WpContentDescription } from "@/styles/general-components";
import { FlattenedBookCard } from "@/types/posts";
import { getPrettyDate } from "@/utils/dates";
import {
	BookCoverContainer,
	ContentContainer,
	InnerContainer,
	ItemTitle,
	ResultContainer,
	SlubTitle,
	TitleContainer,
} from "./Result.styles";

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
