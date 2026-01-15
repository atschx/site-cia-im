/**
 * Photo Lightbox 组件类型定义
 */

import { Photo } from '../../types';

/** 视图状态 */
export interface ViewState {
  zoomLevel: number;
  position: {
    x: number;
    y: number;
  };
  imageLoaded: boolean;
  imageSize: {
    width: number;
    height: number;
  };
}

/** 事件处理器集合 */
export interface LightboxHandlers {
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleResetZoom: () => void;
  handleWheel: (e: React.WheelEvent) => void;
  handleImageClick: () => void;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleKeyboardShortcuts: (e: React.KeyboardEvent) => void;
  handleImageLoad: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

/** 导航处理器 */
export interface NavigationHandlers {
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
}

/** 灯箱 Hook 返回值 */
export interface UseLightboxStateReturn {
  viewState: ViewState;
  isPortrait: boolean;
  getCursorStyle: () => string;
  withStopPropagation: <T extends (...args: unknown[]) => void>(fn: T) => (e: React.MouseEvent) => void;
  handlers: LightboxHandlers;
  navigation: NavigationHandlers;
}

/** PhotoLightbox 组件 Props */
export interface PhotoLightboxProps {
  photo: Photo | null;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

/** LightboxControls 组件 Props */
export interface LightboxControlsProps {
  withStopPropagation: <T extends (...args: unknown[]) => void>(fn: T) => (e: React.MouseEvent) => void;
  handlers: LightboxHandlers;
  onClose: () => void;
}

/** LightboxNavigation 组件 Props */
export interface LightboxNavigationProps {
  withStopPropagation: <T extends (...args: unknown[]) => void>(fn: T) => (e: React.MouseEvent) => void;
  onNext: () => void;
  onPrev: () => void;
}

/** PhotoContainer 组件 Props */
export interface PhotoContainerProps {
  photo: Photo;
  viewState: ViewState;
  isPortrait: boolean;
  getCursorStyle: () => string;
  handlers: LightboxHandlers;
}

/** PhotoInfo 组件 Props */
export interface PhotoInfoProps {
  photo: Photo;
  viewState: ViewState;
}
