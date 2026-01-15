import React from 'react';
import { LightboxControlsProps } from '../types';

/**
 * 灯箱控制按钮组件 - 包含关闭和缩放控制
 */
const LightboxControls: React.FC<LightboxControlsProps> = ({
  withStopPropagation,
  handlers,
  onClose,
}) => {
  return (
    <>
      {/* 关闭按钮 */}
      <button
        className="absolute top-5 right-5 text-white bg-black bg-opacity-50 w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70 z-10"
        onClick={withStopPropagation(onClose)}
        aria-label="关闭灯箱"
      >
        <span aria-hidden="true">&times;</span>
      </button>

      {/* 缩放控制按钮 */}
      <nav
        className="absolute top-5 left-5 z-10 flex space-x-2"
        aria-label="图片缩放控制"
      >
        <button
          className="bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70"
          onClick={withStopPropagation(handlers.handleZoomIn)}
          aria-label="放大图片"
        >
          <span aria-hidden="true">+</span>
        </button>
        <button
          className="bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70"
          onClick={withStopPropagation(handlers.handleZoomOut)}
          aria-label="缩小图片"
        >
          <span aria-hidden="true">-</span>
        </button>
        <button
          className="bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70"
          onClick={withStopPropagation(handlers.handleResetZoom)}
          aria-label="重置缩放"
        >
          <span aria-hidden="true">1:1</span>
        </button>
      </nav>
    </>
  );
};

export default LightboxControls;
