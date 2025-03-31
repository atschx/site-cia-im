import { useState, useEffect } from 'react';

const usePhotoFilter = (photos) => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [filteredPhotos, setFilteredPhotos] = useState(photos);

    useEffect(() => {
        if (activeCategory === 'all') {
            setFilteredPhotos(photos);
        } else {
            setFilteredPhotos(
                photos.filter(photo => photo.categories && photo.categories.includes(activeCategory))
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