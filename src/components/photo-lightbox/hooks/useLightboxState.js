import { useReducer, useState, useCallback, useEffect, useRef } from 'react';
import throttle from '../../../utils/throttle';

// 定义初始状态
const initialViewState = {
    zoomLevel: 1,
    position: { x: 0, y: 0 },
    startDrag: null,
    isDragging: false,
    wasDragged: false
};

// 定义reducer函数
function viewReducer(state, action) {
    switch (action.type) {
        case 'ZOOM_IN':
            const maxZoom = action.maxZoom || 8;
            return {
                ...state,
                zoomLevel: Math.min(state.zoomLevel + (state.zoomLevel >= 2 ? 1 : 0.5), maxZoom)
            };
        case 'ZOOM_OUT':
            const newZoom = Math.max(state.zoomLevel - (state.zoomLevel > 2 ? 1 : 0.5), 0.5);
            return {
                ...state,
                zoomLevel: newZoom <= 1 ? 1 : newZoom,
                position: newZoom <= 1 ? { x: 0, y: 0 } : state.position
            };
        case 'RESET_ZOOM':
            return {
                ...state,
                zoomLevel: 1,
                position: { x: 0, y: 0 }
            };
        case 'SET_ZOOM_AND_POSITION':
            return {
                ...state,
                zoomLevel: action.zoomLevel,
                position: action.position
            };
        case 'START_DRAG':
            return {
                ...state,
                startDrag: action.startDrag,
                isDragging: false
            };
        case 'MOVE':
            if (!state.startDrag) return state;

            const newPosition = {
                x: state.startDrag.origX + (action.clientX - state.startDrag.startX),
                y: state.startDrag.origY + (action.clientY - state.startDrag.startY)
            };

            let newState = {
                ...state,
                position: newPosition
            };

            if (!state.isDragging) {
                const moveX = Math.abs(action.clientX - state.startDrag.startX);
                const moveY = Math.abs(action.clientY - state.startDrag.startY);
                if (moveX > 5 || moveY > 5) {
                    newState.isDragging = true;
                    newState.wasDragged = true;
                }
            }

            return newState;
        case 'END_DRAG':
            return {
                ...state,
                startDrag: null,
                isDragging: false
            };
        case 'RESET_DRAGGED_STATE':
            return {
                ...state,
                wasDragged: false
            };
        case 'RESET_ALL':
            return initialViewState;
        default:
            return state;
    }
}

/**
 * 自定义Hook，处理照片灯箱的业务逻辑
 */
function useLightboxState({ photo, isOpen, onClose, onNext, onPrev }) {
    // 使用reducer管理缩放和拖动相关状态
    const [viewState, dispatch] = useReducer(viewReducer, initialViewState);

    // 图像状态
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

    // 节流引用
    const throttledMouseMove = useRef(null);
    const throttledWheel = useRef(null);

    // 高阶函数：阻止事件冒泡
    const withStopPropagation = useCallback((handler) => {
        return (e) => {
            e.stopPropagation();
            handler(e);
        };
    }, []);

    // 重置状态
    const resetState = useCallback(() => {
        dispatch({ type: 'RESET_ALL' });
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
    const handleZoomIn = useCallback(() => {
        const maxZoom = imageLoaded ? Math.max(5, Math.ceil(Math.max(
            imageSize.width / window.innerWidth,
            imageSize.height / window.innerHeight
        ) * 2)) : 5;

        dispatch({ type: 'ZOOM_IN', maxZoom });
    }, [imageLoaded, imageSize]);

    // 处理缩小
    const handleZoomOut = useCallback(() => {
        dispatch({ type: 'ZOOM_OUT' });
    }, []);

    // 重置缩放
    const handleResetZoom = useCallback(() => {
        dispatch({ type: 'RESET_ZOOM' });
    }, []);

    // 切换缩放 - 处理图片点击
    const handleImageClick = useCallback((e) => {
        e.stopPropagation();

        if (viewState.wasDragged) {
            dispatch({ type: 'RESET_DRAGGED_STATE' });
            return;
        }

        // 如果正在拖动，不处理点击
        if (viewState.isDragging) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        // 计算图像原始分辨率相对于视口的缩放比例
        const viewportRatio = Math.min(
            window.innerWidth / imageSize.width,
            window.innerHeight / imageSize.height
        );

        // 计算100%原始分辨率对应的缩放比例
        const nativeZoom = imageLoaded ? 1 / viewportRatio : 4;

        // 多级缩放逻辑
        if (viewState.zoomLevel === 1) {
            // 首次点击放大到2倍
            dispatch({
                type: 'SET_ZOOM_AND_POSITION',
                zoomLevel: 2,
                position: { x: rect.width / 2 - clickX, y: rect.height / 2 - clickY }
            });
        } else if (viewState.zoomLevel >= 2 && viewState.zoomLevel < nativeZoom * 0.5) {
            // 如果当前缩放小于原始分辨率的一半，放大到原始分辨率的一半
            const targetZoom = Math.min(nativeZoom * 0.5, 4);
            dispatch({
                type: 'SET_ZOOM_AND_POSITION',
                zoomLevel: targetZoom,
                position: {
                    x: targetZoom * (rect.width / 2 - clickX) / 2,
                    y: targetZoom * (rect.height / 2 - clickY) / 2
                }
            });
        } else if (viewState.zoomLevel < nativeZoom) {
            // 如果当前缩放小于原始分辨率，放大到原始分辨率
            dispatch({
                type: 'SET_ZOOM_AND_POSITION',
                zoomLevel: nativeZoom,
                position: {
                    x: nativeZoom * (rect.width / 2 - clickX) / 2,
                    y: nativeZoom * (rect.height / 2 - clickY) / 2
                }
            });
        } else {
            // 其他情况重置缩放
            handleResetZoom();
        }
    }, [viewState.zoomLevel, viewState.wasDragged, viewState.isDragging, handleResetZoom, imageLoaded, imageSize]);

    // 处理鼠标按下 - 开始拖动
    const handleMouseDown = useCallback((e) => {
        e.stopPropagation();
        if (viewState.zoomLevel > 1) {
            dispatch({
                type: 'START_DRAG',
                startDrag: {
                    startX: e.clientX,
                    startY: e.clientY,
                    origX: viewState.position.x,
                    origY: viewState.position.y
                }
            });
        }
    }, [viewState.zoomLevel, viewState.position]);

    // 处理鼠标释放 - 结束拖动
    const handleMouseUp = useCallback(() => {
        dispatch({ type: 'END_DRAG' });
    }, []);

    // 初始化节流函数
    useEffect(() => {
        throttledMouseMove.current = throttle((e) => {
            if (viewState.startDrag) {
                dispatch({
                    type: 'MOVE',
                    clientX: e.clientX,
                    clientY: e.clientY
                });
            }
        }, 16); // 约60帧/秒的流畅度
    }, [viewState.startDrag]);

    // 处理鼠标移动的包装函数
    const handleMouseMove = useCallback((e) => {
        if (throttledMouseMove.current) {
            throttledMouseMove.current(e);
        }
    }, []);

    // 初始化滚轮节流函数
    useEffect(() => {
        throttledWheel.current = throttle((e) => {
            if (e.deltaY < 0) {
                handleZoomIn();
            } else {
                handleZoomOut();
            }
        }, 100); // 滚轮事件可以用更大的节流间隔
    }, [handleZoomIn, handleZoomOut]);

    const handleWheel = useCallback((e) => {
        e.preventDefault(); // 立即阻止默认行为
        if (throttledWheel.current) {
            throttledWheel.current(e);
        }
    }, []);

    // 处理键盘事件和全局鼠标事件
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
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
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

    // 计算鼠标指针样式
    const getCursorStyle = () => {
        if (viewState.startDrag) return 'cursor-grabbing';
        if (viewState.zoomLevel > 1) return 'cursor-grab';
        return 'cursor-zoom-in';
    };

    // 确定是否为竖构图（高度大于宽度）
    const isPortrait = imageLoaded && imageSize.height > imageSize.width;

    // 处理键盘快捷键
    const handleKeyboardShortcuts = (e) => {
        if (e.key === '+' || e.key === '=') {
            withStopPropagation(handleZoomIn)(e);
        } else if (e.key === '-' || e.key === '_') {
            withStopPropagation(handleZoomOut)(e);
        } else if (e.key === '0') {
            withStopPropagation(handleResetZoom)(e);
        }
    };

    // 合并图像状态到viewState，方便传递给组件
    const enrichedViewState = {
        ...viewState,
        imageLoaded,
        imageSize
    };

    // 返回业务逻辑和相关状态
    return {
        viewState: enrichedViewState,
        isPortrait,
        getCursorStyle,
        withStopPropagation,
        handlers: {
            handleImageLoad,
            handleZoomIn,
            handleZoomOut,
            handleResetZoom,
            handleImageClick,
            handleMouseDown,
            handleWheel,
            handleKeyboardShortcuts
        },
        navigation: {
            onClose,
            onNext,
            onPrev
        }
    };
}

export default useLightboxState; 