import { useState, useEffect } from 'react';
import { Photo, CategoryId } from '../../types';

interface UsePhotoFilterReturn {
    activeCategory: CategoryId;
    setActiveCategory: (category: CategoryId) => void;
    filteredPhotos: Photo[];
}

/**
 * Hook for filtering photos by category
 * @param photos - Array of photo objects to filter
 * @returns Object containing active category, setter, and filtered photos
 */
const usePhotoFilter = (photos: Photo[]): UsePhotoFilterReturn => {
    const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
    const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>(photos);

    useEffect(() => {
        if (activeCategory === 'all') {
            setFilteredPhotos(photos);
        } else {
            setFilteredPhotos(
                photos.filter(photo =>
                    photo.categories && photo.categories.includes(activeCategory)
                )
            );
        }
    }, [activeCategory, photos]);

    return {
        activeCategory,
        setActiveCategory,
        filteredPhotos
    };
};

export default usePhotoFilter;
