import React, { useState } from 'react';
import { isValidImageUrl, getFallbackImageUrl, ImageCategory } from '../../utils/imageUtils';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** 图片源URL */
  src?: string;
  /** 图片替代文本 */
  alt?: string;
  /** 备用图片URL */
  fallbackSrc?: string;
  /** 图片类别，用于获取特定类别的回退图片 */
  category?: ImageCategory;
  /** CSS类名 */
  className?: string;
}

/**
 * 带备用图像的图片组件
 * 当图片加载失败时，显示备用图片
 */
const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc,
  category = 'default',
  className = '',
  ...props
}) => {
  // 如果没有提供fallbackSrc，则根据category获取
  const defaultFallback = fallbackSrc || getFallbackImageUrl(category);
  const [imgSrc, setImgSrc] = useState<string>(
    isValidImageUrl(src) ? src : defaultFallback
  );
  const [hasError, setHasError] = useState<boolean>(false);

  // 处理图片加载错误
  const handleError = (): void => {
    if (!hasError && defaultFallback) {
      setImgSrc(defaultFallback);
      setHasError(true);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt || '图片'}
      className={className}
      onError={handleError}
      loading="lazy"
      {...props}
    />
  );
};

export default ImageWithFallback;
