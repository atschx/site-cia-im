/**
 * 图片处理工具函数集
 */

/** 图片类型 */
export type ImageType = 'jpeg' | 'png' | 'gif' | 'svg' | 'webp' | 'unknown';

/** 图片分类 */
export type ImageCategory = 'landscape' | 'portrait' | 'architecture' | 'people' | 'default';

/**
 * 获取优化后的图片URL
 * 根据不同的图片源（如Unsplash或本地图片）添加适当的尺寸参数
 *
 * @param url - 原始图片URL
 * @param width - 需要的宽度
 * @param quality - 图片质量，1-100
 * @returns 优化后的图片URL
 */
export function getOptimizedImageUrl(
  url: string | null | undefined,
  width: number,
  quality: number = 80
): string {
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
 * @param url - 图片URL
 * @returns 图片类型（jpeg, png, gif等）
 */
export function getImageType(url: string | null | undefined): ImageType {
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
 * @param url - 要检查的URL
 * @returns URL是否有效
 */
export function isValidImageUrl(url: unknown): url is string {
  return (
    typeof url === 'string' &&
    url.length > 0 &&
    (url.startsWith('http') || url.startsWith('/') || url.startsWith('data:image/'))
  );
}

/**
 * 分类回退图片映射
 */
const categoryFallbacks: Record<ImageCategory, string> = {
  landscape: '/images/fallback-landscape.jpg',
  portrait: '/images/fallback-portrait.jpg',
  architecture: '/images/fallback-architecture.jpg',
  people: '/images/fallback-people.jpg',
  default: '/images/fallback-image.svg',
};

/**
 * 获取图片回退URL
 * 当原始图片不存在时，提供默认图片
 *
 * @param category - 图片类别，用于提供特定类别的默认图片
 * @returns 回退图片URL
 */
export function getFallbackImageUrl(category: ImageCategory = 'default'): string {
  return categoryFallbacks[category] || categoryFallbacks.default;
}

/**
 * 检查图片是否存在
 *
 * @param url - 图片URL
 * @returns 图片是否存在
 */
export async function checkImageExists(url: string): Promise<boolean> {
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
