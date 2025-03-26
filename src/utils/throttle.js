/**
 * 节流函数工具 - 限制函数在一定时间内只能被调用一次
 * 
 * @param {Function} func - 需要节流的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Function} - 节流后的函数
 */
export const throttle = (func, delay) => {
    let lastCall = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func(...args);
    };
};

export default throttle; 