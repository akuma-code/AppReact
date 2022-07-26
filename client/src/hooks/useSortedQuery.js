import { useMemo } from "react"
import { useCombineProdQuery } from "./useCombineData"


export const useSortedQuery = (prodquery, sort_field) => {

    const sortedQuery = useMemo(() => {


        if (sort_field) {
            return [...prodquery].sort((a, b) => (`${a[sort_field]}`.localeCompare(b[sort_field])))
        }

        return prodquery;
    }, [prodquery, sort_field])


    return sortedQuery
}

