/**
 * 图片处理工具函数集
 */

/**
 * 获取优化后的图片URL
 * 根据不同的图片源（如Unsplash或本地图片）添加适当的尺寸参数
 * 
 * @param {string} url - 原始图片URL
 * @param {number} width - 需要的宽度
 * @param {number} quality - 图片质量，1-100
 * @returns {string} 优化后的图片URL
 */
export function getOptimizedImageUrl(url, width, quality = 80) {
    if (!url) return '';

    // 处理Unsplash图片
    if (url.includes('unsplash.com')) {
        // 已经是Unsplash的URL，添加尺寸参数
        const separator = url.includes('?') ? '&' : '?';
        return `${url}${separator}w=${width}&q=${quality}`;
    }

    // 处理本地图片
    return url;
}

/**
 * 获取图片类型
 * 
 * @param {string} url - 图片URL
 * @returns {string} 图片类型（jpeg, png, gif等）
 */
export function getImageType(url) {
    if (!url) return 'unknown';

    if (url.match(/\.(jpeg|jpg)$/i)) return 'jpeg';
    if (url.match(/\.(png)$/i)) return 'png';
    if (url.match(/\.(gif)$/i)) return 'gif';
    if (url.match(/\.(svg)$/i)) return 'svg';
    if (url.match(/\.(webp)$/i)) return 'webp';

    return 'unknown';
}

/**
 * 检查URL是否有效
 * 
 * @param {string} url - 要检查的URL
 * @returns {boolean} URL是否有效
 */
export function isValidImageUrl(url) {
    return !!url && typeof url === 'string' && (
        url.startsWith('http') ||
        url.startsWith('/') ||
        url.startsWith('data:image/')
    );
} 