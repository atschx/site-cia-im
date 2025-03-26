import React, { useEffect, useState, useCallback } from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

/**
 * 照片灯箱组件
 * 
 * @param {Object} props
 * @param {Object} props.photo - 当前照片数据
 * @param {boolean} props.isOpen - 灯箱是否打开
 * @param {Function} props.onClose - 关闭灯箱的回调函数
 * @param {Function} props.onNext - 下一张照片的回调函数
 * @param {Function} props.onPrev - 上一张照片的回调函数
 */
const PhotoLightbox = ({ photo, isOpen, onClose, onNext, onPrev }) => {
    // 状态
    const [zoomLevel, setZoomLevel] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [startDrag, setStartDrag] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [wasDragged, setWasDragged] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

    // 重置状态
    const resetState = useCallback(() => {
        setZoomLevel(1);
        setPosition({ x: 0, y: 0 });
        setStartDrag(null);
        setIsDragging(false);
        setImageLoaded(false);
        setImageSize({ width: 0, height: 0 });
    }, []);

    // 处理图片加载完成
    const handleImageLoad = useCallback((e) => {
        const { naturalWidth, naturalHeight } = e.target;
        setImageSize({ width: naturalWidth, height: naturalHeight });
        setImageLoaded(true);
    }, []);

    // 处理放大
    const handleZoomIn = useCallback((e) => {
        if (e) e.stopPropagation();
        setZoomLevel(prev => {
            // 允许放大到更高倍率，根据图片尺寸动态调整
            const maxZoom = imageLoaded ? Math.max(5, Math.ceil(Math.max(
                imageSize.width / window.innerWidth,
                imageSize.height / window.innerHeight
            ) * 1.5)) : 5;
            return Math.min(prev + 0.5, maxZoom);
        });
    }, [imageLoaded, imageSize]);

    // 处理缩小
    const handleZoomOut = useCallback((e) => {
        if (e) e.stopPropagation();
        setZoomLevel(prev => {
            const newZoom = Math.max(prev - 0.5, 0.5);
            // 如果缩小到1或以下，重置位置
            if (newZoom <= 1) {
                setPosition({ x: 0, y: 0 });
                return 1;
            }
            return newZoom;
        });
    }, []);

    // 重置缩放
    const handleResetZoom = useCallback((e) => {
        if (e) e.stopPropagation();
        setZoomLevel(1);
        setPosition({ x: 0, y: 0 });
    }, []);

    // 切换缩放 - 处理图片点击
    const handleImageClick = useCallback((e) => {
        e.stopPropagation();
        if (wasDragged) {
            setWasDragged(false);
            return;
        }

        // 如果正在拖动，不处理点击
        if (isDragging) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        // 多级缩放逻辑
        if (zoomLevel === 1) {
            // 首次点击放大到2倍
            setZoomLevel(2);
            setPosition({ x: rect.width / 2 - clickX, y: rect.height / 2 - clickY });
        } else if (zoomLevel >= 2 && zoomLevel < 4) {
            // 第二次点击放大到4倍，定位到点击位置
            setZoomLevel(4);
            setPosition({
                x: 2 * (rect.width / 2 - clickX),
                y: 2 * (rect.height / 2 - clickY)
            });
        } else if (imageLoaded && zoomLevel >= 4) {
            // 再次点击计算原始分辨率缩放比例
            const viewportRatio = Math.min(
                window.innerWidth / imageSize.width,
                window.innerHeight / imageSize.height
            );

            // 计算100%原始分辨率对应的缩放比例
            const nativeZoom = 1 / viewportRatio;

            // 如果已经很接近原始分辨率，则重置到1倍
            if (zoomLevel > nativeZoom * 0.8) {
                handleResetZoom();
            } else {
                // 否则放大到原始分辨率
                setZoomLevel(nativeZoom);
                // 更精确地定位到点击位置
                setPosition({
                    x: nativeZoom * (rect.width / 2 - clickX) / 2,
                    y: nativeZoom * (rect.height / 2 - clickY) / 2
                });
            }
        } else {
            // 其他情况重置缩放
            handleResetZoom();
        }
    }, [zoomLevel, wasDragged, isDragging, handleResetZoom, imageLoaded, imageSize]);

    // 处理鼠标按下 - 开始拖动
    const handleMouseDown = useCallback((e) => {
        e.stopPropagation();
        if (zoomLevel > 1) {
            setStartDrag({ startX: e.clientX, startY: e.clientY, origX: position.x, origY: position.y });
            setIsDragging(false);
        }
    }, [zoomLevel, position]);

    // 处理鼠标移动 - 拖动图片
    const handleMouseMove = useCallback((e) => {
        if (startDrag) {
            const newX = startDrag.origX + (e.clientX - startDrag.startX);
            const newY = startDrag.origY + (e.clientY - startDrag.startY);
            setPosition({ x: newX, y: newY });
            if (!isDragging) {
                const moveX = Math.abs(e.clientX - startDrag.startX);
                const moveY = Math.abs(e.clientY - startDrag.startY);
                if (moveX > 5 || moveY > 5) {
                    setIsDragging(true);
                    setWasDragged(true);
                }
            }
        }
    }, [startDrag, isDragging]);

    // 处理鼠标释放 - 结束拖动
    const handleMouseUp = useCallback(() => {
        setStartDrag(null);
        setIsDragging(false);
    }, []);

    // 处理鼠标滚轮 - 缩放
    const handleWheel = useCallback((e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            handleZoomIn();
        } else {
            handleZoomOut();
        }
    }, [handleZoomIn, handleZoomOut]);

    // 处理键盘事件
    useEffect(() => {
        if (!isOpen || !photo) return;

        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'Escape':
                    onClose();
                    break;
                case 'ArrowLeft':
                    onPrev();
                    break;
                case 'ArrowRight':
                    onNext();
                    break;
                case '+':
                case '=':
                    handleZoomIn();
                    break;
                case '-':
                case '_':
                    handleZoomOut();
                    break;
                case '0':
                    handleResetZoom();
                    break;
                default:
                    break;
            }
        };

        // 防止背景滚动
        document.body.style.overflow = 'hidden';

        // 添加事件监听
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            // 清理
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [
        isOpen,
        photo,
        onClose,
        onNext,
        onPrev,
        handleZoomIn,
        handleZoomOut,
        handleResetZoom,
        handleMouseMove,
        handleMouseUp
    ]);

    // 照片变化时重置状态
    useEffect(() => {
        resetState();
    }, [photo, resetState]);

    // 如果灯箱未打开或没有照片数据，则不渲染
    if (!isOpen || !photo) {
        return null;
    }

    // 计算鼠标指针样式
    const getCursorStyle = () => {
        if (startDrag) return 'grabbing';
        if (zoomLevel > 1) return 'grab';
        return 'zoom-in';
    };

    // 确定是否为竖构图（高度大于宽度）
    const isPortrait = imageLoaded && imageSize.height > imageSize.width;

    return (
        <div
            className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label="照片灯箱"
        >
            <div
                className="relative mx-auto p-4 w-full h-full flex flex-col justify-center"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                role="presentation"
            >
                {/* 控制按钮 */}
                <button
                    className="absolute top-5 right-5 text-white bg-black bg-opacity-50 w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70 z-10"
                    onClick={onClose}
                    aria-label="关闭灯箱"
                >
                    <span aria-hidden="true">&times;</span>
                </button>

                {/* 缩放控制按钮 */}
                <div className="absolute top-5 left-5 z-10 flex space-x-2">
                    <button
                        className="bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70"
                        onClick={handleZoomIn}
                        aria-label="放大图片"
                    >
                        <span aria-hidden="true">+</span>
                    </button>
                    <button
                        className="bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70"
                        onClick={handleZoomOut}
                        aria-label="缩小图片"
                    >
                        <span aria-hidden="true">-</span>
                    </button>
                    <button
                        className="bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70"
                        onClick={handleResetZoom}
                        aria-label="重置缩放"
                    >
                        <span aria-hidden="true">1:1</span>
                    </button>
                </div>

                {/* 缩放比例指示器 */}
                <div className="absolute bottom-5 left-5 z-10 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                    {Math.round(zoomLevel * 100)}%
                    {imageLoaded && imageSize.width > 0 && (
                        <span className="ml-2 text-xs text-gray-300">
                            {imageSize.width} × {imageSize.height}
                        </span>
                    )}
                </div>

                {/* 导航按钮 */}
                <button
                    className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 z-10"
                    onClick={(e) => {
                        e.stopPropagation();
                        onPrev();
                    }}
                    aria-label="查看上一张照片"
                >
                    <span aria-hidden="true">&#10094;</span>
                </button>

                <button
                    className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 z-10"
                    onClick={(e) => {
                        e.stopPropagation();
                        onNext();
                    }}
                    aria-label="查看下一张照片"
                >
                    <span aria-hidden="true">&#10095;</span>
                </button>

                {/* 图片容器 - 根据图片方向调整容器尺寸 */}
                <div
                    className={`flex items-center justify-center overflow-hidden ${isPortrait ? 'h-[70vh] w-auto' : 'w-full h-[70vh]'
                        }`}
                    onWheel={handleWheel}
                    tabIndex={0}
                    role="application"
                    aria-label="图片查看区域"
                    onKeyDown={(e) => {
                        // 添加键盘快捷键
                        if (e.key === '+' || e.key === '=') {
                            handleZoomIn(e);
                        } else if (e.key === '-' || e.key === '_') {
                            handleZoomOut(e);
                        } else if (e.key === '0') {
                            handleResetZoom(e);
                        }
                    }}
                >
                    <div
                        className="relative transition-transform duration-150 cursor-pointer h-full"
                        style={{
                            transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`,
                            cursor: getCursorStyle()
                        }}
                        onClick={handleImageClick}
                        onMouseDown={handleMouseDown}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                handleImageClick(e);
                            }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label={`查看照片: ${photo.title || '照片'}`}
                    >
                        {photo.gatsbyImageData ? (
                            <GatsbyImage
                                image={getImage(photo.gatsbyImageData)}
                                alt={photo.title || "照片"}
                                className="h-full w-auto object-contain"
                            />
                        ) : photo.originalSrc ? (
                            <img
                                src={photo.originalSrc}
                                alt={photo.title || "照片"}
                                className="h-full w-auto object-contain"
                                draggable="false"
                                onLoad={handleImageLoad}
                            />
                        ) : photo.src ? (
                            <img
                                src={photo.src}
                                alt={photo.title || "照片"}
                                className="h-full w-auto object-contain"
                                draggable="false"
                                onLoad={handleImageLoad}
                            />
                        ) : (
                            <div className="text-white">无法加载图片</div>
                        )}
                    </div>
                </div>

                {/* 照片信息 */}
                <div className="mt-4 text-white text-center">
                    <h3 className="text-xl font-semibold">{photo.title}</h3>
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
                </div>

                {/* 操作提示 */}
                <div className="absolute bottom-5 right-5 z-10 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                    {zoomLevel > 1 ?
                        (zoomLevel >= 4 ? "点击查看原始分辨率/重置" : "点击进一步放大") :
                        "点击放大照片"}
                </div>
            </div>
        </div>
    );
};

export default PhotoLightbox; 