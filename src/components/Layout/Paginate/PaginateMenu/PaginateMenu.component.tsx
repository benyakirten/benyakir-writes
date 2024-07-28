import * as React from "react";

import { Text } from "@Input";

import { Row } from "@Styles/general-components";
import { PageFlip, PageNumber } from "./PaginateMenu.styles";
import { PaginateMenuProps } from "@/types/props/layout";

const PaginateMenu: React.FC<PaginateMenuProps> = ({
	currentPage,
	maxPages,
	onLeft,
	onRight,
	limit,
	setLimit,
	disableRight,
	name,
}) => {
	const randId = Math.random().toString();
	const doNothing = () => {};
	const adjustLimit = (newLimit: string) => {
		const lim = +newLimit;
		if (
			Number.isFinite(lim) &&
			!Number.isNaN(lim) &&
			lim > 0 &&
			lim % 1 === 0
		) {
			setLimit(lim);
		}
	};

	const enableRightButton = currentPage < maxPages && !disableRight;

	return (
		<Row style={{ justifyContent: "space-between" }}>
			<Row style={{ margin: "2rem 0" }}>
				<PageFlip
					disabled={currentPage === 0}
					onClick={currentPage === 0 ? doNothing : onLeft}
					left={true}
					data-cy="page-flip-left"
					aria-label="Previous Page"
				>
					&#10148;
				</PageFlip>
				<PageNumber>
					Page {currentPage + 1} (of {maxPages})
				</PageNumber>
				<PageFlip
					disabled={!enableRightButton}
					onClick={enableRightButton ? onRight : doNothing}
					data-cy="page-flip-right"
					aria-label="Next Page"
				>
					&#10148;
				</PageFlip>
			</Row>
			<Text
				value={limit.toString()}
				onChange={adjustLimit}
				label="Items Per Page"
				name={`${name}-adjust-items-per-page-${randId}`}
				cyId="adjust-items-per-page"
			/>
		</Row>
	);
};

export default PaginateMenu;
