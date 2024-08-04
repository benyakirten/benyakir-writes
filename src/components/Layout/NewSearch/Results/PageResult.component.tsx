import React from "react";

import { PageSearch } from "@/data/search";

const PageResult: React.FC<{ page: PageSearch }> = ({ page }) => {
	return (
		<div>
			<h2>{page.title}</h2>
		</div>
	);
};

export default PageResult;
