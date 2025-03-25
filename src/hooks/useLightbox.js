import { useState, useCallback } from 'react';

/**
 * 照片灯箱自定义Hook
 * 
 * 管理照片灯箱的打开/关闭状态和照片导航
 * 
 * @param {Array} photos - 照片数组
 * @returns {Object} 返回灯箱状态和控制函数
 */
export function useLightbox(photos) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // 打开灯箱并显示指定照片
    const open = useCallback((photo) => {
        const index = photos.findIndex(p => p.id === photo.id);
        setCurrentIndex(index >= 0 ? index : 0);
        setIsOpen(true);
    }, [photos]);

    // 关闭灯箱
    const close = useCallback(() => {
        setIsOpen(false);
    }, []);

    // 显示下一张照片
    const next = useCallback(() => {
        if (!photos.length) return;
        setCurrentIndex(prev =>
            prev === photos.length - 1 ? 0 : prev + 1
        );
    }, [photos]);

    // 显示上一张照片
    const prev = useCallback(() => {
        if (!photos.length) return;
        setCurrentIndex(prev =>
            prev === 0 ? photos.length - 1 : prev - 1
        );
    }, [photos]);

    // 当前照片
    const currentPhoto = photos[currentIndex];

    return {
        isOpen,
        currentIndex,
        currentPhoto,
        open,
        close,
        next,
        prev
    };
} 