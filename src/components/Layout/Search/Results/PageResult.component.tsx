import React from "react";

import { PageSearch } from "@/data/search";
import { ContentContainer, ItemTitle, ResultContainer } from "./Result.styles";

const PageResult: React.FC<{
	page: PageSearch;
	onView: (slug: string) => void;
}> = ({ page, onView }) => {
	return (
		<ResultContainer role="link" onClick={() => onView(page.slug)}>
			<ContentContainer>
				<ItemTitle>{page.title}</ItemTitle>
				<p>{page.description}</p>
			</ContentContainer>
		</ResultContainer>
	);
};

export default PageResult;
