import { renderHook, act } from '@testing-library/react';
import useTheme from '../useTheme';

describe('useTheme', () => {
  // 在每个测试前重置 DOM 和 mocks
  beforeEach(() => {
    document.documentElement.classList.remove('dark');
    (window.localStorage.getItem as jest.Mock).mockClear();
    (window.localStorage.setItem as jest.Mock).mockClear();
  });

  describe('初始化', () => {
    it('默认主题应为 light', () => {
      const { result } = renderHook(() => useTheme());
      expect(result.current.theme).toBe('light');
    });

    it('应从 localStorage 读取已保存的主题', () => {
      (window.localStorage.getItem as jest.Mock).mockReturnValue('dark');

      const { result } = renderHook(() => useTheme());

      expect(window.localStorage.getItem).toHaveBeenCalledWith('theme');
      expect(result.current.theme).toBe('dark');
    });

    it('localStorage 中保存 dark 时应添加 dark class', () => {
      (window.localStorage.getItem as jest.Mock).mockReturnValue('dark');

      renderHook(() => useTheme());

      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('无保存主题时应检查系统偏好', () => {
      (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
      (window.matchMedia as jest.Mock).mockReturnValue({ matches: true });

      const { result } = renderHook(() => useTheme());

      expect(window.matchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
      expect(result.current.theme).toBe('dark');
    });

    it('系统偏好为 light 时应保持 light 主题', () => {
      (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
      (window.matchMedia as jest.Mock).mockReturnValue({ matches: false });

      const { result } = renderHook(() => useTheme());

      expect(result.current.theme).toBe('light');
    });
  });

  describe('toggleTheme', () => {
    it('从 light 切换到 dark', () => {
      (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
      (window.matchMedia as jest.Mock).mockReturnValue({ matches: false });

      const { result } = renderHook(() => useTheme());

      expect(result.current.theme).toBe('light');

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('从 dark 切换到 light', () => {
      (window.localStorage.getItem as jest.Mock).mockReturnValue('dark');

      const { result } = renderHook(() => useTheme());

      expect(result.current.theme).toBe('dark');

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe('light');
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('切换主题时应保存到 localStorage', () => {
      (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
      (window.matchMedia as jest.Mock).mockReturnValue({ matches: false });

      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.toggleTheme();
      });

      expect(window.localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
    });

    it('多次切换应正确交替主题', () => {
      (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
      (window.matchMedia as jest.Mock).mockReturnValue({ matches: false });

      const { result } = renderHook(() => useTheme());

      // light -> dark
      act(() => {
        result.current.toggleTheme();
      });
      expect(result.current.theme).toBe('dark');

      // dark -> light
      act(() => {
        result.current.toggleTheme();
      });
      expect(result.current.theme).toBe('light');

      // light -> dark
      act(() => {
        result.current.toggleTheme();
      });
      expect(result.current.theme).toBe('dark');
    });
  });

  describe('DOM 操作', () => {
    it('dark 主题应在 documentElement 添加 dark class', () => {
      (window.localStorage.getItem as jest.Mock).mockReturnValue('dark');

      renderHook(() => useTheme());

      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('light 主题应移除 dark class', () => {
      document.documentElement.classList.add('dark');
      (window.localStorage.getItem as jest.Mock).mockReturnValue('light');

      renderHook(() => useTheme());

      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
  });

  describe('返回值类型', () => {
    it('应返回正确的接口', () => {
      const { result } = renderHook(() => useTheme());

      expect(result.current).toHaveProperty('theme');
      expect(result.current).toHaveProperty('toggleTheme');
      expect(typeof result.current.theme).toBe('string');
      expect(typeof result.current.toggleTheme).toBe('function');
    });
  });
});
