import { useState } from 'react'

const usePagination: PaginationHook = <T>(initialItems: T[]) => {
    const [currentPage, setCurrentPage] = useState(0)
    const [currentItems, _setCurrentItems] = useState(initialItems)

    const setCurrentItems = (_items: T[]) => {
        setCurrentPage(0)
        _setCurrentItems(_items)
    }

    return {
        currentPage,
        onPageChange: setCurrentPage,
        items: currentItems,
        setCurrentItems
    }
}

export default usePagination