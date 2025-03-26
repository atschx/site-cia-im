import React from 'react';
import useLightboxState from './hooks/useLightboxState';
import PhotoContainer from './components/PhotoContainer';
import LightboxControls from './components/LightboxControls';
import LightboxNavigation from './components/LightboxNavigation';
import PhotoInfo from './components/PhotoInfo';

// 导出所有组件和hooks以便外部使用
export { default as useLightbox } from './hooks/useLightbox';
export { default as useLightboxState } from './hooks/useLightboxState';
export { default as PhotoContainer } from './components/PhotoContainer';
export { default as LightboxControls } from './components/LightboxControls';
export { default as LightboxNavigation } from './components/LightboxNavigation';
export { default as PhotoInfo } from './components/PhotoInfo';

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
const PhotoLightbox = (props) => {
    const { photo, isOpen, onClose } = props;

    // 使用自定义Hook获取所有业务逻辑和状态
    const {
        viewState,
        isPortrait,
        getCursorStyle,
        withStopPropagation,
        handlers,
        navigation
    } = useLightboxState(props);

    // 如果灯箱未打开或没有照片数据，则不渲染
    if (!isOpen || !photo) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
        >
            {/* 背景按钮 - 点击即关闭灯箱 */}
            <button
                className="absolute inset-0 w-full h-full bg-transparent border-0 cursor-pointer"
                onClick={onClose}
                aria-label="关闭灯箱"
            />

            <div
                className="relative mx-auto p-4 w-full h-full flex flex-col justify-center items-center"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                role="presentation"
            >
                {/* 控制按钮 */}
                <LightboxControls
                    withStopPropagation={withStopPropagation}
                    handlers={handlers}
                    onClose={navigation.onClose}
                />

                {/* 导航按钮 */}
                <LightboxNavigation
                    withStopPropagation={withStopPropagation}
                    onNext={navigation.onNext}
                    onPrev={navigation.onPrev}
                />

                {/* 图片容器 */}
                <PhotoContainer
                    photo={photo}
                    viewState={viewState}
                    isPortrait={isPortrait}
                    getCursorStyle={getCursorStyle}
                    handlers={handlers}
                />

                {/* 照片信息及指示器 */}
                <PhotoInfo
                    photo={photo}
                    viewState={viewState}
                />
            </div>
        </div>
    );
};

export default PhotoLightbox; 