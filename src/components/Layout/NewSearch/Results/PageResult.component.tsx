import React from "react";

import { PageSearch } from "@/data/search";
import { truncate } from "@/utils/strings";
import { ItemTitle, ResultContainer } from "./Result.styles";

const PageResult: React.FC<{
	page: PageSearch;
	onView: (slug: string) => void;
}> = ({ page, onView }) => {
	return (
		<ResultContainer role="link" onClick={() => onView(page.slug)}>
			<ItemTitle>{page.title}</ItemTitle>
			<p>{page.description}</p>
		</ResultContainer>
	);
};

export default PageResult;
