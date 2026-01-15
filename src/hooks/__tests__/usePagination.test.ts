import { renderHook, act } from '@testing-library/react';
import { usePagination } from '../pagination/usePagination';

describe('usePagination', () => {
  // 测试数据
  const mockItems = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));

  describe('初始化', () => {
    it('应使用默认分页大小 (6)', () => {
      const { result } = renderHook(() => usePagination(mockItems));

      expect(result.current.paginatedItems).toHaveLength(6);
      expect(result.current.visibleCount).toBe(6);
    });

    it('应支持自定义初始分页大小', () => {
      const { result } = renderHook(() => usePagination(mockItems, 10));

      expect(result.current.paginatedItems).toHaveLength(10);
      expect(result.current.visibleCount).toBe(10);
    });

    it('初始分页大小大于数组长度时应返回全部', () => {
      const smallItems = [{ id: 1 }, { id: 2 }];
      const { result } = renderHook(() => usePagination(smallItems, 10));

      expect(result.current.paginatedItems).toHaveLength(2);
      expect(result.current.hasMore).toBe(false);
    });
  });

  describe('hasMore', () => {
    it('有更多数据时应返回 true', () => {
      const { result } = renderHook(() => usePagination(mockItems, 6));

      expect(result.current.hasMore).toBe(true);
    });

    it('显示全部数据时应返回 false', () => {
      const { result } = renderHook(() => usePagination(mockItems, 20));

      expect(result.current.hasMore).toBe(false);
    });

    it('空数组应返回 false', () => {
      const { result } = renderHook(() => usePagination([]));

      expect(result.current.hasMore).toBe(false);
    });
  });

  describe('loadMore', () => {
    it('应增加可见数量 (默认增量 3)', () => {
      const { result } = renderHook(() => usePagination(mockItems, 6, 3));

      act(() => {
        result.current.loadMore();
      });

      expect(result.current.paginatedItems).toHaveLength(9);
      expect(result.current.visibleCount).toBe(9);
    });

    it('应支持自定义增量', () => {
      const { result } = renderHook(() => usePagination(mockItems, 6, 5));

      act(() => {
        result.current.loadMore();
      });

      expect(result.current.paginatedItems).toHaveLength(11);
    });

    it('不应超过总数量', () => {
      const { result } = renderHook(() => usePagination(mockItems, 18, 5));

      act(() => {
        result.current.loadMore();
      });

      expect(result.current.paginatedItems).toHaveLength(20);
      expect(result.current.hasMore).toBe(false);
    });

    it('连续加载应累积', () => {
      const { result } = renderHook(() => usePagination(mockItems, 6, 3));

      act(() => {
        result.current.loadMore();
      });
      expect(result.current.visibleCount).toBe(9);

      act(() => {
        result.current.loadMore();
      });
      expect(result.current.visibleCount).toBe(12);

      act(() => {
        result.current.loadMore();
      });
      expect(result.current.visibleCount).toBe(15);
    });
  });

  describe('resetPagination', () => {
    it('应重置到初始分页大小', () => {
      const { result } = renderHook(() => usePagination(mockItems, 6, 3));

      // 先加载更多
      act(() => {
        result.current.loadMore();
        result.current.loadMore();
      });
      expect(result.current.visibleCount).toBe(12);

      // 重置
      act(() => {
        result.current.resetPagination();
      });
      expect(result.current.visibleCount).toBe(6);
      expect(result.current.paginatedItems).toHaveLength(6);
    });
  });

  describe('setVisibleCount', () => {
    it('应允许直接设置可见数量', () => {
      const { result } = renderHook(() => usePagination(mockItems, 6));

      act(() => {
        result.current.setVisibleCount(15);
      });

      expect(result.current.visibleCount).toBe(15);
      expect(result.current.paginatedItems).toHaveLength(15);
    });
  });

  describe('items 变化时', () => {
    it('items 变化时应重置分页', () => {
      const { result, rerender } = renderHook(
        ({ items }) => usePagination(items, 6),
        { initialProps: { items: mockItems } }
      );

      // 先加载更多
      act(() => {
        result.current.loadMore();
      });
      expect(result.current.visibleCount).toBe(9);

      // 更换数据源
      const newItems = [{ id: 100 }, { id: 101 }];
      rerender({ items: newItems });

      expect(result.current.visibleCount).toBe(6);
      expect(result.current.paginatedItems).toHaveLength(2);
    });
  });

  describe('paginatedItems', () => {
    it('应返回正确的切片', () => {
      const { result } = renderHook(() => usePagination(mockItems, 3));

      expect(result.current.paginatedItems).toEqual([
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
      ]);
    });

    it('加载更多后应包含新项目', () => {
      const { result } = renderHook(() => usePagination(mockItems, 2, 2));

      act(() => {
        result.current.loadMore();
      });

      expect(result.current.paginatedItems).toHaveLength(4);
      expect(result.current.paginatedItems[3]).toEqual({ id: 4, name: 'Item 4' });
    });
  });

  describe('边界情况', () => {
    it('空数组应正常工作', () => {
      const { result } = renderHook(() => usePagination([]));

      expect(result.current.paginatedItems).toHaveLength(0);
      expect(result.current.hasMore).toBe(false);

      // loadMore 不应崩溃
      act(() => {
        result.current.loadMore();
      });
      expect(result.current.paginatedItems).toHaveLength(0);
    });

    it('单个元素应正常工作', () => {
      const { result } = renderHook(() => usePagination([{ id: 1 }]));

      expect(result.current.paginatedItems).toHaveLength(1);
      expect(result.current.hasMore).toBe(false);
    });
  });
});
