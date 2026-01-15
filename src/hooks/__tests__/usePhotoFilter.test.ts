import { renderHook, act } from '@testing-library/react';
import usePhotoFilter from '../filter/usePhotoFilter';
import { Photo } from '../../types';

describe('usePhotoFilter', () => {
  // 测试数据
  const mockPhotos: Photo[] = [
    { id: '1', title: 'Photo 1', categories: ['landscape', 'nature'] },
    { id: '2', title: 'Photo 2', categories: ['portrait'] },
    { id: '3', title: 'Photo 3', categories: ['landscape'] },
    { id: '4', title: 'Photo 4', categories: ['street', 'urban'] },
    { id: '5', title: 'Photo 5', categories: ['nature'] },
  ] as Photo[];

  describe('初始化', () => {
    it('默认分类应为 all', () => {
      const { result } = renderHook(() => usePhotoFilter(mockPhotos));

      expect(result.current.activeCategory).toBe('all');
    });

    it('默认应显示所有照片', () => {
      const { result } = renderHook(() => usePhotoFilter(mockPhotos));

      expect(result.current.filteredPhotos).toHaveLength(5);
      expect(result.current.filteredPhotos).toEqual(mockPhotos);
    });
  });

  describe('setActiveCategory', () => {
    it('设置分类后应更新 activeCategory', () => {
      const { result } = renderHook(() => usePhotoFilter(mockPhotos));

      act(() => {
        result.current.setActiveCategory('landscape');
      });

      expect(result.current.activeCategory).toBe('landscape');
    });

    it('切换回 all 应显示所有照片', () => {
      const { result } = renderHook(() => usePhotoFilter(mockPhotos));

      act(() => {
        result.current.setActiveCategory('landscape');
      });
      expect(result.current.filteredPhotos).toHaveLength(2);

      act(() => {
        result.current.setActiveCategory('all');
      });
      expect(result.current.filteredPhotos).toHaveLength(5);
    });
  });

  describe('过滤功能', () => {
    it('应正确过滤 landscape 分类', () => {
      const { result } = renderHook(() => usePhotoFilter(mockPhotos));

      act(() => {
        result.current.setActiveCategory('landscape');
      });

      expect(result.current.filteredPhotos).toHaveLength(2);
      expect(result.current.filteredPhotos.map(p => p.id)).toEqual(['1', '3']);
    });

    it('应正确过滤 portrait 分类', () => {
      const { result } = renderHook(() => usePhotoFilter(mockPhotos));

      act(() => {
        result.current.setActiveCategory('portrait');
      });

      expect(result.current.filteredPhotos).toHaveLength(1);
      expect(result.current.filteredPhotos[0].id).toBe('2');
    });

    it('应正确过滤 nature 分类', () => {
      const { result } = renderHook(() => usePhotoFilter(mockPhotos));

      act(() => {
        result.current.setActiveCategory('nature');
      });

      expect(result.current.filteredPhotos).toHaveLength(2);
      expect(result.current.filteredPhotos.map(p => p.id)).toEqual(['1', '5']);
    });

    it('不存在的分类应返回空数组', () => {
      const { result } = renderHook(() => usePhotoFilter(mockPhotos));

      act(() => {
        result.current.setActiveCategory('nonexistent' as any);
      });

      expect(result.current.filteredPhotos).toHaveLength(0);
    });
  });

  describe('photos 变化时', () => {
    it('photos 变化应重新过滤', () => {
      const { result, rerender } = renderHook(
        ({ photos }) => usePhotoFilter(photos),
        { initialProps: { photos: mockPhotos } }
      );

      act(() => {
        result.current.setActiveCategory('landscape');
      });
      expect(result.current.filteredPhotos).toHaveLength(2);

      // 更新照片数据
      const newPhotos: Photo[] = [
        { id: '10', title: 'New Photo', categories: ['landscape'] },
      ] as Photo[];

      rerender({ photos: newPhotos });

      expect(result.current.filteredPhotos).toHaveLength(1);
      expect(result.current.filteredPhotos[0].id).toBe('10');
    });

    it('all 分类下 photos 变化应同步更新', () => {
      const { result, rerender } = renderHook(
        ({ photos }) => usePhotoFilter(photos),
        { initialProps: { photos: mockPhotos } }
      );

      expect(result.current.filteredPhotos).toHaveLength(5);

      const newPhotos: Photo[] = [
        { id: '10', title: 'Photo 10', categories: ['test'] },
        { id: '11', title: 'Photo 11', categories: ['test'] },
      ] as Photo[];

      rerender({ photos: newPhotos });

      expect(result.current.filteredPhotos).toHaveLength(2);
    });
  });

  describe('边界情况', () => {
    it('空数组应正常工作', () => {
      const { result } = renderHook(() => usePhotoFilter([]));

      expect(result.current.filteredPhotos).toHaveLength(0);
      expect(result.current.activeCategory).toBe('all');
    });

    it('没有 categories 属性的照片应被过滤掉', () => {
      const photosWithoutCategories: Photo[] = [
        { id: '1', title: 'Photo 1' },
        { id: '2', title: 'Photo 2', categories: ['landscape'] },
      ] as Photo[];

      const { result } = renderHook(() => usePhotoFilter(photosWithoutCategories));

      act(() => {
        result.current.setActiveCategory('landscape');
      });

      expect(result.current.filteredPhotos).toHaveLength(1);
      expect(result.current.filteredPhotos[0].id).toBe('2');
    });

    it('categories 为空数组的照片在 all 时应显示', () => {
      const photosWithEmptyCategories: Photo[] = [
        { id: '1', title: 'Photo 1', categories: [] },
        { id: '2', title: 'Photo 2', categories: ['landscape'] },
      ] as Photo[];

      const { result } = renderHook(() => usePhotoFilter(photosWithEmptyCategories));

      expect(result.current.filteredPhotos).toHaveLength(2);
    });
  });

  describe('返回值类型', () => {
    it('应返回正确的接口', () => {
      const { result } = renderHook(() => usePhotoFilter(mockPhotos));

      expect(result.current).toHaveProperty('activeCategory');
      expect(result.current).toHaveProperty('setActiveCategory');
      expect(result.current).toHaveProperty('filteredPhotos');
      expect(typeof result.current.activeCategory).toBe('string');
      expect(typeof result.current.setActiveCategory).toBe('function');
      expect(Array.isArray(result.current.filteredPhotos)).toBe(true);
    });
  });
});
