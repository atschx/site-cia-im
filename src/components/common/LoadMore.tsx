import React from 'react';

interface LoadMoreProps {
  /** 点击事件处理函数 */
  onClick: () => void;
  /** 是否有更多内容可加载 */
  hasMore: boolean;
  /** 是否正在加载 */
  loading?: boolean;
  /** 加载中的文本 */
  loadingText?: string;
  /** 加载更多的文本 */
  loadMoreText?: string;
  /** 容器CSS类名 */
  className?: string;
  /** 按钮CSS类名 */
  buttonClassName?: string;
}

/**
 * 加载更多按钮组件
 */
const LoadMore: React.FC<LoadMoreProps> = React.memo(
  ({
    onClick,
    hasMore,
    loading = false,
    loadingText = '加载中...',
    loadMoreText = '加载更多',
    className = 'mt-8 text-center',
    buttonClassName = 'px-4 py-2 bg-link-blue text-white rounded hover:bg-link-blue/80 transition-colors disabled:opacity-50 dark:bg-dark-link dark:hover:bg-dark-link/80',
  }) => {
    if (!hasMore) return null;

    return (
      <div className={className}>
        <button className={buttonClassName} onClick={onClick} disabled={loading}>
          {loading ? loadingText : loadMoreText}
        </button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if hasMore or loading state changes
    return (
      prevProps.hasMore === nextProps.hasMore &&
      prevProps.loading === nextProps.loading
    );
  }
);

LoadMore.displayName = 'LoadMore';

export default LoadMore;
