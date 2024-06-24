import { useState } from "react";

export function usePagination(rowEachPage) {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: rowEachPage
    })

    const { pageIndex, pageSize } = pagination;
    
    return {
        offset: pageIndex > 0 ? pageSize * pageIndex : pageIndex,
        limit: pageSize,
        onPaginationChange: setPagination,
        pagination
    }
}