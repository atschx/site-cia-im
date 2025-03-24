import * as React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

/**
 * 摄影作品灯箱组件
 * 
 * @param {Object} props
 * @param {Object} props.photo - 照片对象
 * @param {boolean} props.isOpen - 是否打开灯箱
 * @param {Function} props.onClose - 关闭灯箱事件处理函数
 * @param {Function} props.onNext - 下一张事件处理函数
 * @param {Function} props.onPrev - 上一张事件处理函数
 */
const PhotoLightbox = ({ photo, isOpen, onClose, onNext, onPrev }) => {
    if (!isOpen || !photo) return null;

    // 阻止点击内容时关闭灯箱
    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="relative max-w-5xl max-h-[90vh] mx-4"
                onClick={handleContentClick}
            >
                <button
                    className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10"
                    onClick={onClose}
                    aria-label="Close"
                >
                    &times;
                </button>

                {onPrev && (
                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl bg-black/30 hover:bg-black/50 w-12 h-12 rounded-full flex items-center justify-center z-10"
                        onClick={onPrev}
                        aria-label="Previous photo"
                    >
                        &lsaquo;
                    </button>
                )}

                <div className="overflow-hidden rounded-lg shadow-2xl">
                    <GatsbyImage
                        image={getImage(photo.image)}
                        alt={photo.title}
                        className="max-h-[80vh] w-auto"
                    />
                </div>

                <div className="bg-black/80 text-white p-4 rounded-b-lg">
                    <h2 className="text-xl font-semibold mb-2">{photo.title}</h2>
                    <div className="flex flex-wrap gap-x-6 text-sm text-gray-300">
                        <p>{photo.date}</p>
                        <p>{photo.location}</p>
                        {photo.camera && <p>Camera: {photo.camera}</p>}
                        {photo.exif && (
                            <p>
                                {photo.exif.focalLength && `${photo.exif.focalLength}mm `}
                                {photo.exif.aperture && `f/${photo.exif.aperture} `}
                                {photo.exif.shutterSpeed && `${photo.exif.shutterSpeed}s `}
                                {photo.exif.iso && `ISO ${photo.exif.iso}`}
                            </p>
                        )}
                    </div>
                    {photo.description && (
                        <p className="mt-3 text-gray-100">{photo.description}</p>
                    )}
                </div>

                {onNext && (
                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl bg-black/30 hover:bg-black/50 w-12 h-12 rounded-full flex items-center justify-center z-10"
                        onClick={onNext}
                        aria-label="Next photo"
                    >
                        &rsaquo;
                    </button>
                )}
            </div>
        </div>
    )
}

export default PhotoLightbox 