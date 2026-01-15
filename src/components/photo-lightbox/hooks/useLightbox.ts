import { useState, useCallback } from 'react';
import { Photo } from '../../../types';

interface UseLightboxReturn {
    isOpen: boolean;
    currentIndex: number;
    currentPhoto: Photo | undefined;
    open: (photo: Photo) => void;
    close: () => void;
    next: () => void;
    prev: () => void;
}

/**
 * Photo lightbox hook
 *
 * Manages lightbox open/close state and photo navigation
 *
 * @param photos - Array of photo objects
 * @returns Object containing lightbox state and control functions
 */
export function useLightbox(photos: Photo[]): UseLightboxReturn {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    // Open lightbox and display specified photo
    const open = useCallback((photo: Photo) => {
        const index = photos.findIndex(p => p.id === photo.id);
        setCurrentIndex(index >= 0 ? index : 0);
        setIsOpen(true);
    }, [photos]);

    // Close lightbox
    const close = useCallback(() => {
        setIsOpen(false);
    }, []);

    // Show next photo
    const next = useCallback(() => {
        if (!photos.length) return;
        setCurrentIndex(prev =>
            prev === photos.length - 1 ? 0 : prev + 1
        );
    }, [photos]);

    // Show previous photo
    const prev = useCallback(() => {
        if (!photos.length) return;
        setCurrentIndex(prev =>
            prev === 0 ? photos.length - 1 : prev - 1
        );
    }, [photos]);

    // Current photo
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

export default useLightbox;
