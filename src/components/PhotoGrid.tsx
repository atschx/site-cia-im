import * as React from 'react';
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import ImageWithFallback from './common/ImageWithFallback';
import { Photo } from '../types';
import { getPhotoImageSrc, getPhotoTitle } from '../utils/photoUtils';

interface PhotoGridProps {
  /** 照片数组 */
  photos: Photo[];
  /** 照片点击事件处理函数 */
  onPhotoClick?: (photo: Photo) => void;
  /** 当图片加载失败时的备用图片路径 */
  fallbackImagePath?: string;
}

/**
 * 摄影作品展示网格组件
 */
const PhotoGrid: React.FC<PhotoGridProps> = ({
  photos,
  onPhotoClick,
  fallbackImagePath = '/images/fallback-image.svg',
}) => {
  // 处理键盘事件以支持可访问性
  const handleKeyDown = (photo: Photo, e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      onPhotoClick?.(photo);
      e.preventDefault();
    }
  };

  if (!photos || photos.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 py-8">暂无照片</p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {photos.map((photo, index) => (
        <div
          key={photo.id}
          className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer dark:shadow-gray-900 focus:outline-none focus:ring-2 focus:ring-link-blue dark:focus:ring-dark-link focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          onClick={() => onPhotoClick?.(photo)}
          onKeyDown={(e) => handleKeyDown(photo, e)}
          role="button"
          tabIndex={0}
          aria-label={`查看照片 ${index + 1} 共 ${photos.length} 张: ${photo.title}，${photo.location}`}
        >
          <div className="w-full aspect-[4/3] overflow-hidden">
            {photo.gatsbyImageData ? (
              // 对于Gatsby GraphQL查询的图片数据
              <GatsbyImage
                image={getImage(photo.gatsbyImageData as IGatsbyImageData)!}
                alt={getPhotoTitle(photo)}
                className="w-full h-full object-cover"
              />
            ) : (
              // 使用带备用功能的图片组件
              <ImageWithFallback
                src={getPhotoImageSrc(photo, false, fallbackImagePath)}
                alt={getPhotoTitle(photo)}
                fallbackSrc={fallbackImagePath}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* 照片信息覆盖层 */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 dark:group-hover:bg-opacity-80 transition-all duration-300 flex flex-col justify-end p-4 rounded-lg">
            <h3 className="text-white font-medium text-lg transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              {photo.title}
            </h3>
            <p className="text-gray-100 text-sm transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
              {photo.location}
              {photo.location && photo.date ? ' · ' : ''}
              {photo.date}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;
