import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PhotoLightbox from '../index';
import useLightbox from '../hooks/useLightbox';

/**
 * 照片画廊示例组件 - 展示如何使用重构后的灯箱组件
 */
const PhotoGalleryExample = ({ photos }) => {
    // 使用useLightbox Hook管理灯箱状态
    const { isOpen, currentPhoto, open, close, next, prev } = useLightbox(photos);

    return (
        <div>
            {/* 照片网格 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo) => (
                    <button
                        key={photo.id}
                        className="overflow-hidden rounded shadow-md hover:shadow-lg transition-shadow duration-300"
                        onClick={() => open(photo)}
                        aria-label={`查看照片: ${photo.title || '照片'}`}
                    >
                        {photo.gatsbyImageData ? (
                            <GatsbyImage
                                image={getImage(photo.gatsbyImageData)}
                                alt={photo.title || "照片"}
                                className="w-full h-48 object-cover"
                            />
                        ) : (
                            <img
                                src={photo.src || photo.originalSrc}
                                alt={photo.title || "照片"}
                                className="w-full h-48 object-cover"
                            />
                        )}

                        {photo.title && (
                            <div className="p-2 bg-gray-100">
                                <h3 className="text-sm font-semibold truncate">{photo.title}</h3>
                                {photo.location && (
                                    <p className="text-xs text-gray-600 truncate">{photo.location}</p>
                                )}
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {/* 照片灯箱 */}
            <PhotoLightbox
                photo={currentPhoto}
                isOpen={isOpen}
                onClose={close}
                onNext={next}
                onPrev={prev}
            />
        </div>
    );
};

export default PhotoGalleryExample; 