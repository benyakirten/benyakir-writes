import * as React from "react";

import { Column } from "@Styles/general-components";
import { NoResults, PaginateColumn } from "./Paginate.styles";

import PaginateMenu from "./PaginateMenu/PaginateMenu.component";
import { PaginatableItem, PaginateProps } from "@/types/props/layout";

function Paginate<T extends PaginatableItem>({
	items,
	El,
	currentPage,
	onPageChange,
}: PaginateProps<T>) {
	const [itemsPerPage, setItemsPerPage] = React.useState(4);
	const maxPages = React.useMemo(
		() => Math.ceil(items.length / itemsPerPage),
		[items, itemsPerPage],
	);

	const adjustItemsPerPage = React.useCallback(
		(perPage: number) => {
			if (perPage <= items.length) {
				onPageChange(0);
				setItemsPerPage(perPage);
			}
		},
		[items, onPageChange],
	);

	const secondCriteria = (currentPage + 1) * itemsPerPage >= items.length;

	const nextPage = React.useCallback(
		() =>
			currentPage < maxPages &&
			!secondCriteria &&
			onPageChange(currentPage + 1),
		[currentPage, maxPages, secondCriteria, onPageChange],
	);
	const lastPage = React.useCallback(
		() => currentPage > 0 && onPageChange(currentPage - 1),
		[currentPage, onPageChange],
	);

	const paginateMenuProps = React.useMemo(
		() => ({
			maxPages,
			currentPage,
			onLeft: lastPage,
			onRight: nextPage,
			limit: itemsPerPage,
			setLimit: adjustItemsPerPage,
			disableRight: secondCriteria,
		}),
		[
			maxPages,
			currentPage,
			itemsPerPage,
			secondCriteria,
			adjustItemsPerPage,
			lastPage,
			nextPage,
		],
	);

	return (
		<PaginateColumn>
			<PaginateMenu {...paginateMenuProps} name="top" />
			<Column style={{ margin: "1rem 0" }}>
				{items.length > 0 ? (
					items
						.slice(
							itemsPerPage * currentPage,
							currentPage < maxPages
								? itemsPerPage * (currentPage + 1)
								: items.length,
						)
						.map((i) => <El key={i.slug || i.title} item={i} />)
				) : (
					<NoResults>No items matching that query found</NoResults>
				)}
			</Column>
			<PaginateMenu {...paginateMenuProps} name="bottom" />
		</PaginateColumn>
	);
}

export default Paginate;
