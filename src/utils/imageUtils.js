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

/**
 * 获取图片回退URL
 * 当原始图片不存在时，提供默认图片
 * 
 * @param {string} category - 图片类别，用于提供特定类别的默认图片
 * @returns {string} 回退图片URL
 */
export function getFallbackImageUrl(category = 'default') {
    // 默认回退图片
    const defaultFallback = '/images/fallback-image.svg';

    // 特定类别回退图片
    const categoryFallbacks = {
        landscape: '/images/fallback-landscape.jpg',
        portrait: '/images/fallback-portrait.jpg',
        architecture: '/images/fallback-architecture.jpg',
        people: '/images/fallback-people.jpg',
        // 可以根据需要添加更多类别
    };

    return categoryFallbacks[category] || defaultFallback;
}

/**
 * 检查图片是否存在
 * 
 * @param {string} url - 图片URL
 * @returns {Promise<boolean>} 图片是否存在
 */
export async function checkImageExists(url) {
    // 对于外部URL，进行网络请求检查
    if (url.startsWith('http')) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            return response.ok;
        } catch (error) {
            console.error(`Error checking image existence: ${error}`);
            return false;
        }
    }

    // 对于本地图片，无法在客户端直接检查文件系统
    // 返回true，依赖于ImageWithFallback组件的onError处理
    return true;
} 