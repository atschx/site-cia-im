import * as React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

/**
 * 摄影作品展示网格组件
 * 
 * @param {Object} props
 * @param {Array} props.photos - 照片数组
 * @param {Function} props.onPhotoClick - 照片点击事件处理函数
 * @param {boolean} props.useStaticImage - 是否使用静态图片路径（用于展示模拟数据）
 * @param {string} props.fallbackImagePath - 当useStaticImage为true时的图片路径
 */
const PhotoGrid = ({ photos, onPhotoClick, useStaticImage = false, fallbackImagePath = "/images/placeholder.jpg" }) => {
    // 处理键盘事件以支持可访问性
    const handleKeyDown = (photo, index, e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            onPhotoClick && onPhotoClick(photo, index);
            e.preventDefault();
        }
    };

    if (!photos || photos.length === 0) {
        return <p className="text-center text-gray-500 py-8">暂无照片</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
                <div
                    key={photo.id}
                    className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    onClick={() => onPhotoClick && onPhotoClick(photo, index)}
                    onKeyDown={(e) => handleKeyDown(photo, index, e)}
                    role="button"
                    tabIndex={0}
                    aria-label={`查看照片: ${photo.title}`}
                >
                    <div className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105">
                        {photo.thumbnailSrc ? (
                            // 使用缩略图
                            <img
                                src={photo.thumbnailSrc}
                                alt={photo.title || "照片"}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        ) : photo.gatsbyImageData ? (
                            // 对于Gatsby GraphQL查询的图片数据
                            <GatsbyImage
                                image={getImage(photo.gatsbyImageData)}
                                alt={photo.title || "照片"}
                                className="w-full h-full"
                            />
                        ) : photo.src ? (
                            // 对于普通图片路径
                            <img
                                src={photo.src}
                                alt={photo.title || "照片"}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        ) : (
                            // 默认图片
                            <img
                                src="/images/placeholder.jpg"
                                alt={photo.title || "照片"}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-white text-lg font-medium">{photo.title}</h3>
                        <p className="text-gray-200 text-sm">
                            {photo.location && photo.date ? `${photo.location} · ${photo.date}` :
                                photo.location || photo.date || ''}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PhotoGrid; 