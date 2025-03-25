import React, { useState } from 'react';
import { isValidImageUrl } from '../../utils/imageUtils';

/**
 * 带备用图像的图片组件
 * 当图片加载失败时，显示备用图片
 * 
 * @param {Object} props - 组件属性
 * @param {string} props.src - 图片源URL
 * @param {string} props.alt - 图片替代文本
 * @param {string} props.fallbackSrc - 备用图片URL
 * @param {string} props.className - CSS类名
 */
const ImageWithFallback = ({
    src,
    alt,
    fallbackSrc = "/images/placeholder.jpg",
    className = "",
    ...props
}) => {
    const [imgSrc, setImgSrc] = useState(isValidImageUrl(src) ? src : fallbackSrc);
    const [hasError, setHasError] = useState(false);

    // 处理图片加载错误
    const handleError = () => {
        if (!hasError && fallbackSrc) {
            setImgSrc(fallbackSrc);
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