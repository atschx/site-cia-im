import { useState, useEffect } from 'react';

/**
 * 照片筛选自定义Hook
 * 
 * 根据分类筛选照片并管理筛选状态
 * 
 * @param {Array} allPhotos - 所有照片数据
 * @param {string} initialCategory - 初始分类，默认为'all'
 * @returns {Object} 返回分类状态和筛选后的照片
 */
export function usePhotoFilter(allPhotos, initialCategory = 'all') {
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [filteredPhotos, setFilteredPhotos] = useState([]);

    useEffect(() => {
        if (activeCategory === 'all') {
            setFilteredPhotos(allPhotos);
        } else {
            const filtered = allPhotos.filter(photo =>
                photo.categories && photo.categories.includes(activeCategory)
            );
            setFilteredPhotos(filtered);
        }
    }, [activeCategory, allPhotos]);

    return {
        activeCategory,
        setActiveCategory,
        filteredPhotos
    };
} 