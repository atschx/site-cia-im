/**
 * Photo utility functions
 * Centralized logic for handling photo data and images
 */

import { Photo } from '../types';

/**
 * Get the appropriate image source for a photo
 * Returns thumbnail for grid display, original for lightbox
 */
export const getPhotoImageSrc = (
  photo: Photo,
  useOriginal: boolean = false,
  fallback: string = '/images/fallback-image.svg'
): string => {
  if (useOriginal) {
    return photo.originalSrc || photo.thumbnailSrc || fallback;
  }
  return photo.thumbnailSrc || fallback;
};

/**
 * Check if photo has valid image data
 */
export const hasValidImageData = (photo: Photo): boolean => {
  return !!(
    photo.gatsbyImageData ||
    photo.thumbnailSrc ||
    photo.originalSrc
  );
};

/**
 * Get photo display title with fallback
 */
export const getPhotoTitle = (photo: Photo): string => {
  return photo.title || '照片';
};

/**
 * Get photo location and date string
 */
export const getPhotoLocationDate = (photo: Photo): string => {
  const parts: string[] = [];
  if (photo.location) parts.push(photo.location);
  if (photo.date) parts.push(photo.date);
  return parts.join(' · ');
};

/**
 * Get photo EXIF info string
 */
export const getPhotoExifInfo = (photo: Photo): string => {
  const parts: string[] = [];
  if (photo.camera) parts.push(photo.camera);
  if (photo.lens) parts.push(photo.lens);
  if (photo.aperture) parts.push(photo.aperture);
  return parts.join(' · ');
};
