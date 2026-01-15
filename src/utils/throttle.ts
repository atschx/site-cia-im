/**
 * 节流函数工具 - 限制函数在一定时间内只能被调用一次
 *
 * @param func - 需要节流的函数
 * @param delay - 延迟时间（毫秒）
 * @returns 节流后的函数
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => ReturnType<T> | undefined) => {
  let lastCall = 0;

  return function (...args: Parameters<T>): ReturnType<T> | undefined {
    const now = Date.now();
    if (now - lastCall < delay) {
      return undefined;
    }
    lastCall = now;
    return func(...args) as ReturnType<T>;
  };
};

export default throttle;
