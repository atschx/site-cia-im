import React from 'react';
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { PhotoContainerProps } from '../types';

/**
 * 照片容器组件 - 负责照片的渲染和交互
 */
const PhotoContainer: React.FC<PhotoContainerProps> = ({
  photo,
  viewState,
  isPortrait,
  getCursorStyle,
  handlers,
}) => {
  // 渲染照片内容的函数
  const renderPhotoContent = (): React.ReactNode => {
    if (photo.gatsbyImageData) {
      const image = getImage(photo.gatsbyImageData as IGatsbyImageData);
      if (image) {
        return (
          <GatsbyImage
            image={image}
            alt={photo.title || '照片'}
            className="max-h-full max-w-full object-contain"
          />
        );
      }
    }

    if (photo.originalSrc) {
      return (
        <img
          src={photo.originalSrc}
          alt={photo.title || '照片'}
          className="max-h-full max-w-full object-contain"
          draggable="false"
          onLoad={handlers.handleImageLoad}
        />
      );
    }

    if (photo.src) {
      return (
        <img
          src={photo.src}
          alt={photo.title || '照片'}
          className="max-h-full max-w-full object-contain"
          draggable="false"
          onLoad={handlers.handleImageLoad}
        />
      );
    }

    return <span className="text-white">无法加载图片</span>;
  };

  return (
    <button
      className={`flex items-center justify-center bg-transparent border-0 p-0 ${getCursorStyle()} ${
        isPortrait ? 'h-[70vh] w-auto' : 'w-full h-[70vh]'
      }`}
      onWheel={handlers.handleWheel}
      aria-label={`查看照片: ${photo.title || '照片'}`}
      onClick={handlers.handleImageClick}
      onMouseDown={handlers.handleMouseDown}
      onKeyDown={handlers.handleKeyboardShortcuts}
    >
      <div
        className="relative transition-transform duration-150 h-full"
        style={{
          transform: `translate(${viewState.position.x}px, ${viewState.position.y}px) scale(${viewState.zoomLevel})`,
        }}
      >
        {renderPhotoContent()}
      </div>
    </button>
  );
};

export default PhotoContainer;
