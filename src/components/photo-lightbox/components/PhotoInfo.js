import React from 'react';

/**
 * 照片信息组件 - 显示照片标题、位置、日期和相机信息
 */
const PhotoInfo = ({ photo, viewState }) => {
    return (
        <>
            {/* 照片信息 */}
            <figcaption className="mt-4 text-white text-center">
                <h3 id="lightbox-title" className="text-xl font-semibold">{photo.title}</h3>
                <p className="text-gray-300">
                    {photo.location && photo.date ? `${photo.location} · ${photo.date}` :
                        photo.location || photo.date || ''}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                    {photo.camera && (
                        <span className="mr-2">{photo.camera}</span>
                    )}
                    {photo.lens && (
                        <span className="mr-2">{photo.lens}</span>
                    )}
                    {photo.aperture && (
                        <span>{photo.aperture}</span>
                    )}
                </p>
                <p className="text-xs text-gray-500 mt-2">按ESC键退出灯箱</p>
            </figcaption>

            {/* 缩放比例指示器 */}
            <aside className="absolute bottom-5 left-5 z-10 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded" aria-live="polite">
                {Math.round(viewState.zoomLevel * 100)}%
                {viewState.imageLoaded && viewState.imageSize.width > 0 && (
                    <span className="ml-2 text-xs text-gray-300">
                        {viewState.imageSize.width} × {viewState.imageSize.height}
                    </span>
                )}
            </aside>

            {/* 操作提示 */}
            <aside className="absolute bottom-5 right-5 z-10 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                {viewState.zoomLevel > 1 ?
                    (viewState.zoomLevel >= 4 ? "点击查看原始分辨率/重置" : "点击进一步放大") :
                    "点击放大照片"}
            </aside>
        </>
    );
};

export default PhotoInfo; 