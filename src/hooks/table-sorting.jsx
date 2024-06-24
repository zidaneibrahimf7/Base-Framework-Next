import { useState } from "react";

export function useSorting(
    defaultSorting
) {
    const [sorting, setSorting] = useState([
        { id: defaultSorting.split("-").join(""), desc: defaultSorting.includes("-") ? true : false },
    ])

    const { id, desc } = sorting[0]

    return {
        sorting,
        onSortingChange: setSorting,
        sortKey: id,
        sortOrder: desc ? -1 : 1
    }
}