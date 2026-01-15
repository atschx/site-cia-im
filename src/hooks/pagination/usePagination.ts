import { useState, useCallback, useEffect } from 'react';

interface UsePaginationReturn<T> {
    paginatedItems: T[];
    hasMore: boolean;
    loadMore: () => void;
    resetPagination: () => void;
    visibleCount: number;
    setVisibleCount: (count: number) => void;
}

/**
 * Pagination hook for "Load More" pattern
 *
 * Manages pagination state and functionality for incrementally loading items
 *
 * @param items - Array of items to paginate
 * @param initialPageSize - Initial number of items to show (default: 6)
 * @param incrementSize - Number of items to add when loading more (default: 3)
 * @returns Object containing paginated items, status, and control functions
 */
export function usePagination<T>(
    items: T[],
    initialPageSize: number = 6,
    incrementSize: number = 3
): UsePaginationReturn<T> {
    const [visibleCount, setVisibleCount] = useState<number>(initialPageSize);

    // Reset visible count when items change
    useEffect(() => {
        setVisibleCount(initialPageSize);
    }, [items, initialPageSize]);

    // Paginated data
    const paginatedItems = items.slice(0, visibleCount);

    // Check if more items available
    const hasMore = items.length > visibleCount;

    // Load more items
    const loadMore = useCallback(() => {
        setVisibleCount(prev => Math.min(prev + incrementSize, items.length));
    }, [items.length, incrementSize]);

    // Reset pagination to initial state
    const resetPagination = useCallback(() => {
        setVisibleCount(initialPageSize);
    }, [initialPageSize]);

    return {
        paginatedItems,
        hasMore,
        loadMore,
        resetPagination,
        visibleCount,
        setVisibleCount
    };
}

export default usePagination;
