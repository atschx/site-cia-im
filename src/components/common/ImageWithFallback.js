import React, { useState } from 'react';
import { isValidImageUrl, getFallbackImageUrl } from '../../utils/imageUtils';

/**
 * 带备用图像的图片组件
 * 当图片加载失败时，显示备用图片
 * 
 * @param {Object} props - 组件属性
 * @param {string} props.src - 图片源URL
 * @param {string} props.alt - 图片替代文本
 * @param {string} props.fallbackSrc - 备用图片URL
 * @param {string} props.category - 图片类别，用于获取特定类别的回退图片
 * @param {string} props.className - CSS类名
 */
const ImageWithFallback = ({
    src,
    alt,
    fallbackSrc,
    category = 'default',
    className = "",
    ...props
}) => {
    // 如果没有提供fallbackSrc，则根据category获取
    const defaultFallback = fallbackSrc || getFallbackImageUrl(category);
    const [imgSrc, setImgSrc] = useState(isValidImageUrl(src) ? src : defaultFallback);
    const [hasError, setHasError] = useState(false);

    // 处理图片加载错误
    const handleError = () => {
        if (!hasError && defaultFallback) {
            setImgSrc(defaultFallback);
            setHasError(true);
        }
    };

    return (
        <img
            src={imgSrc}
            alt={alt || "图片"}
            className={className}
            onError={handleError}
            loading="lazy"
            {...props}
        />
    );
};

export default ImageWithFallback; 