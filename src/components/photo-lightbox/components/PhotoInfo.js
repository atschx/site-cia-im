import React, { useState, useEffect } from 'react';

/**
 * 照片信息组件 - 分层信息架构设计
 * 根据缩放级别动态调整信息显示的突出程度和密度
 */
const PhotoInfo = ({ photo, viewState }) => {
    const zoomLevel = viewState.zoomLevel;
    const [showEscTip, setShowEscTip] = useState(true);

    // ESC提示3秒后自动消失
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowEscTip(false);
        }, 3000);
        
        return () => clearTimeout(timer);
    }, []);
    
    return (
        <>
            {/* 主标题 - 始终可见但动态调整突出程度 */}
            <h3 
                id="lightbox-title"
                className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-60 text-white font-semibold transition-all duration-300 text-center max-w-[80vw] px-3 py-1 rounded backdrop-blur-sm
                    ${zoomLevel <= 1 ? 'text-2xl bg-black/40' : ''}
                    ${zoomLevel > 1 && zoomLevel <= 2 ? 'text-xl bg-black/50' : ''}
                    ${zoomLevel > 2 && zoomLevel <= 4 ? 'text-lg opacity-80 bg-black/60' : ''}
                    ${zoomLevel > 4 ? 'text-sm opacity-50 hover:opacity-100 bg-black/70' : ''}
                `}
            >
                {photo.title}
            </h3>

            {/* ESC退出提示 - 显示3秒后自动消失，根据缩放状态增强可见性 */}
            {showEscTip && (
                <aside 
                    className={`fixed top-32 left-1/2 transform -translate-x-1/2 z-60 text-white text-xs px-3 py-1 rounded backdrop-blur-sm transition-all duration-300 ${
                        zoomLevel <= 1 ? 'bg-black/60' : 'bg-black/80 shadow-lg border border-white/20'
                    }`}
                >
                    按ESC键退出灯箱
                </aside>
            )}
            
            {/* 次要信息 - 渐进隐藏，缩放级别 ≤ 2 时显示 */}
            {zoomLevel <= 2 && (
                <figcaption className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-60 text-white text-center transition-all duration-300 bg-black/40 px-4 py-2 rounded backdrop-blur-sm max-w-[90vw]">
                    <p className="text-gray-300 text-sm">
                        {photo.location && photo.date ? `${photo.location} · ${photo.date}` :
                            photo.location || photo.date || ''}
                    </p>
                    {(photo.camera || photo.lens || photo.aperture) && (
                        <p className="text-xs text-gray-400 mt-1">
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
                    )}
                </figcaption>
            )}

            {/* 缩放比例指示器 - 左下角，始终显示 */}
            <aside 
                className="fixed bottom-5 left-5 z-70 text-white text-sm bg-black bg-opacity-60 px-2 py-1 rounded transition-all duration-300" 
                aria-live="polite"
            >
                {Math.round(zoomLevel * 100)}%
                {viewState.imageLoaded && viewState.imageSize.width > 0 && (
                    <span className="ml-2 text-xs text-gray-300">
                        {viewState.imageSize.width} × {viewState.imageSize.height}
                    </span>
                )}
            </aside>

            {/* 交互提示 - 右下角，根据缩放状态动态调整 */}
            <aside 
                className={`fixed bottom-5 right-5 z-70 text-white text-sm bg-black bg-opacity-60 px-2 py-1 rounded transition-all duration-300 ${
                    zoomLevel > 3 ? 'opacity-70 hover:opacity-100' : 'opacity-100'
                }`}
            >
                {zoomLevel > 1 ?
                    (zoomLevel >= 4 ? "点击查看原始分辨率/重置" : "点击进一步放大") :
                    "点击放大照片"}
            </aside>
        </>
    );
};

export default PhotoInfo; 