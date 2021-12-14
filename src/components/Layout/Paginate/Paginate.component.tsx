import * as React from "react";

import { Column } from "@Styles/general-components";
import { NoResults, PaginateColumn } from "./Paginate.styles";

import PaginateMenu from "./PaginateMenu/PaginateMenu.component";

const Paginate: React.FC<PaginateProps> = ({
    items,
    El,
    currentPage,
    onPageChange,
}) => {
    const [itemsPerPage, setItemsPerPage] = React.useState(4);
    const maxPages = Math.floor(items.length / itemsPerPage);

    const adjustItemsPerPage = (perPage: number) => {
        if (perPage <= items.length) {
            onPageChange(0);
            setItemsPerPage(perPage);
        }
    };

    const secondCriteria = (currentPage + 1) * itemsPerPage >= items.length;

    const nextPage = () => currentPage < maxPages && !secondCriteria && onPageChange(currentPage + 1);
    const lastPage = () => currentPage > 0 && onPageChange(currentPage - 1);

    return (
        <PaginateColumn>
            <PaginateMenu
                maxPages={maxPages}
                currentPage={currentPage}
                onLeft={lastPage}
                onRight={nextPage}
                limit={itemsPerPage}
                setLimit={adjustItemsPerPage}
                disableRight={secondCriteria}
                name="top"
            />
            <Column style={{ margin: "1rem 0" }}>
                {items.length > 0 ? (
                    items
                        .slice(
                            itemsPerPage * currentPage,
                            currentPage < maxPages
                                ? itemsPerPage * (currentPage + 1)
                                : items.length
                        )
                        .map((i) => <El key={i.slug || i.title} item={i} />)
                ) : (
                    <NoResults>No items matching that query found</NoResults>
                )}
            </Column>
            <PaginateMenu
                maxPages={maxPages}
                currentPage={currentPage}
                onLeft={lastPage}
                onRight={nextPage}
                limit={itemsPerPage}
                setLimit={adjustItemsPerPage}
                disableRight={secondCriteria}
                name="bottom"
            />
        </PaginateColumn>
    );
};

export default Paginate;
