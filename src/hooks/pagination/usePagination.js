import { useState, useCallback, useEffect } from 'react';

/**
 * 分页加载自定义Hook
 * 
 * 管理分页加载状态和功能，适用于"加载更多"模式
 * 
 * @param {Array} items - 要分页的数据项
 * @param {number} initialPageSize - 初始页面大小
 * @param {number} incrementSize - 每次加载增加的数量
 * @returns {Object} 返回分页状态和控制函数
 */
export function usePagination(items, initialPageSize = 6, incrementSize = 3) {
    const [visibleCount, setVisibleCount] = useState(initialPageSize);

    // 当items变化时重置显示数量
    useEffect(() => {
        setVisibleCount(initialPageSize);
    }, [items, initialPageSize]);

    // 分页后的数据
    const paginatedItems = items.slice(0, visibleCount);

    // 是否还有更多数据
    const hasMore = items.length > visibleCount;

    // 加载更多数据
    const loadMore = useCallback(() => {
        setVisibleCount(prev => Math.min(prev + incrementSize, items.length));
    }, [items.length, incrementSize]);

    // 重置分页
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