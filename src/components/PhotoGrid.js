import * as React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import ImageWithFallback from './common/ImageWithFallback'

/**
 * 摄影作品展示网格组件
 * 
 * @param {Object} props
 * @param {Array} props.photos - 照片数组
 * @param {Function} props.onPhotoClick - 照片点击事件处理函数
 * @param {boolean} props.useStaticImage - 是否使用静态图片路径（用于展示模拟数据）
 * @param {string} props.fallbackImagePath - 当图片加载失败时的备用图片路径
 */
const PhotoGrid = ({
    photos,
    onPhotoClick,
    fallbackImagePath = "/images/placeholder.jpg"
}) => {
    // 处理键盘事件以支持可访问性
    const handleKeyDown = (photo, e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            onPhotoClick && onPhotoClick(photo);
            e.preventDefault();
        }
    };

    if (!photos || photos.length === 0) {
        return <p className="text-center text-gray-500 py-8">暂无照片</p>;
    }

    // 获取图片源URL
    const getPhotoSrc = (photo) => {
        if (photo.thumbnailSrc) return photo.thumbnailSrc;
        if (photo.src) return photo.src;
        return fallbackImagePath;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
                <div
                    key={photo.id}
                    className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    onClick={() => onPhotoClick && onPhotoClick(photo)}
                    onKeyDown={(e) => handleKeyDown(photo, e)}
                    role="button"
                    tabIndex={0}
                    aria-label={`查看照片: ${photo.title}`}
                >
                    <div className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105">
                        {photo.gatsbyImageData ? (
                            // 对于Gatsby GraphQL查询的图片数据
                            <GatsbyImage
                                image={getImage(photo.gatsbyImageData)}
                                alt={photo.title || "照片"}
                                className="w-full h-full"
                            />
                        ) : (
                            // 使用带备用功能的图片组件
                            <ImageWithFallback
                                src={getPhotoSrc(photo)}
                                alt={photo.title || "照片"}
                                fallbackSrc={fallbackImagePath}
                                className="w-full h-full object-cover"
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