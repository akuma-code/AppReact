import { useMemo } from "react"

export const useSortedQuery = (prodquery, sort) => {
    const sortedQuery = useMemo(() => {
        if (sort) {
            return [...prodquery].sort((a, b) => (a[sort].localeCompare(b[sort])))
        }
        return prodquery;
    }, [sort, prodquery])
    return sortedQuery
}

