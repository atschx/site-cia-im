import React, { useState, useEffect, useRef } from 'react';
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
  /** 加载超时时间（毫秒），默认10秒 */
  timeout?: number;
  /** 是否显示加载状态 */
  showLoading?: boolean;
}

/**
 * 带备用图像的图片组件
 * 当图片加载失败或超时时，显示备用图片
 */
const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc,
  category = 'default',
  className = '',
  timeout = 10000,
  showLoading = true,
  ...props
}) => {
  // 如果没有提供fallbackSrc，则根据category获取
  const defaultFallback = fallbackSrc || getFallbackImageUrl(category);
  const [imgSrc, setImgSrc] = useState<string>(
    isValidImageUrl(src) ? src : defaultFallback
  );
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 处理图片加载成功
  const handleLoad = (): void => {
    setIsLoading(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // 处理图片加载错误
  const handleError = (): void => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!hasError && defaultFallback) {
      setImgSrc(defaultFallback);
      setHasError(true);
      setIsLoading(false);
    }
  };

  // 设置加载超时
  useEffect(() => {
    if (timeout > 0 && isLoading) {
      timeoutRef.current = setTimeout(() => {
        if (isLoading && !hasError) {
          handleError();
        }
      }, timeout);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [timeout, isLoading, hasError]);

  // 当src改变时，重置状态
  useEffect(() => {
    const newSrc = isValidImageUrl(src) ? src : defaultFallback;
    setImgSrc(newSrc);
    setHasError(false);
    setIsLoading(true);
  }, [src, defaultFallback]);

  return (
    <>
      {showLoading && isLoading && (
        <div
          className={`${className} flex items-center justify-center bg-gray-100 dark:bg-gray-800`}
          aria-label="图片加载中"
        >
          <div className="animate-pulse text-gray-400 dark:text-gray-600">
            加载中...
          </div>
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt || '图片'}
        className={`${className} ${isLoading && showLoading ? 'hidden' : ''}`}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
        {...props}
      />
    </>
  );
};

export default ImageWithFallback;
