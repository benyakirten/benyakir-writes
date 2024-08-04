import React from "react";

import { FlattenedBookCard } from "@/types/posts";

const BookResult: React.FC<{
	book: FlattenedBookCard;
	onView: (slug: string) => void;
}> = ({ book, onView }) => {
	return (
		<div>
			<h2>{book.title}</h2>
		</div>
	);
};

export default BookResult;
