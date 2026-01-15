import React, { useEffect } from 'react';
import useLightboxState from './hooks/useLightboxState';
import PhotoContainer from './components/PhotoContainer';
import LightboxControls from './components/LightboxControls';
import LightboxNavigation from './components/LightboxNavigation';
import PhotoInfo from './components/PhotoInfo';
import { PhotoLightboxProps } from './types';

// 导出所有组件和hooks以便外部使用
export { default as useLightbox } from './hooks/useLightbox';
export { default as useLightboxState } from './hooks/useLightboxState';
export { default as PhotoContainer } from './components/PhotoContainer';
export { default as LightboxControls } from './components/LightboxControls';
export { default as LightboxNavigation } from './components/LightboxNavigation';
export { default as PhotoInfo } from './components/PhotoInfo';
export * from './types';

/**
 * 照片灯箱组件
 */
const PhotoLightbox: React.FC<PhotoLightboxProps> = (props) => {
  const { photo, isOpen, onClose } = props;

  // 使用自定义Hook获取所有业务逻辑和状态
  const { viewState, isPortrait, getCursorStyle, withStopPropagation, handlers, navigation } =
    useLightboxState(props);

  // 添加全局键盘事件监听，用于处理ESC键关闭灯箱
  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e: KeyboardEvent): void => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

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
        <PhotoInfo photo={photo} viewState={viewState} />
      </div>
    </div>
  );
};

export default PhotoLightbox;
