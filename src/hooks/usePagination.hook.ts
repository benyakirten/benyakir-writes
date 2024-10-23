import { useCallback, useMemo, useState } from "react";

import type { PaginationHook } from "@/types/hooks";

const DEFAULT_ITEMS_PER_PAGE = 10;
const usePagination: PaginationHook = <T>(
  initialItems: T[],
  defaultItemsPerPage = DEFAULT_ITEMS_PER_PAGE
) => {
  const [page, _setPage] = useState(0);
  const [items, _setItems] = useState(initialItems);
  const [itemsPerPage, _setItemsPerPage] = useState(defaultItemsPerPage);

  const numPages = useMemo(
    () => Math.floor(items.length / itemsPerPage),
    [items, itemsPerPage]
  );

  const setPage: React.Dispatch<React.SetStateAction<number>> = useCallback(
    (pageOrPageFn) => {
      _setPage((prevPage) => {
        const newPage =
          typeof pageOrPageFn === "function"
            ? pageOrPageFn(prevPage)
            : pageOrPageFn;
        if (newPage < 0 || newPage >= numPages) {
          return prevPage;
        }

        return newPage;
      });
    },
    [numPages]
  );

  const setItemsPerPage = useCallback(
    (itemsPerPage: number) => {
      setPage(0);
      _setItemsPerPage(itemsPerPage);
    },
    [setPage]
  );

  const setItems = useCallback(
    (items: T[]) => {
      setPage(0);
      _setItems(items);
    },
    [setPage]
  );

  const visibleItems: T[] = useMemo(
    () =>
      items.slice(
        itemsPerPage * page,
        page < numPages ? itemsPerPage * (page + 1) : items.length
      ),
    [items, page, itemsPerPage, numPages]
  );

  return {
    page,
    setPage,
    items,
    setItems,
    itemsPerPage,
    setItemsPerPage,
    numPages,
    visibleItems,
  };
};

export default usePagination;
