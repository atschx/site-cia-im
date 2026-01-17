/**
 * Photo data types for the photography portfolio
 */

export interface Photo {
  id: number;
  title: string;
  location: string;
  date: string;
  categories: string[];
  camera: string;
  lens: string;
  aperture: string;
  thumbnailSrc?: string;
  originalSrc?: string;
  gatsbyImageData?: any; // For Gatsby image data
}

export type CategoryId = 'all' | '风景' | '人像' | '街拍' | '建筑' | '自然' | '旅行' | '文化' | '生活' | '微距' | '城市';
