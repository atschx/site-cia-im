import React from 'react';

/**
 * 加载更多按钮组件
 * 
 * @param {Object} props - 组件属性
 * @param {Function} props.onClick - 点击事件处理函数
 * @param {boolean} props.hasMore - 是否有更多内容可加载
 * @param {boolean} props.loading - 是否正在加载
 * @param {string} props.loadingText - 加载中的文本
 * @param {string} props.loadMoreText - 加载更多的文本
 * @param {string} props.className - 容器CSS类名
 * @param {string} props.buttonClassName - 按钮CSS类名
 */
const LoadMore = ({
    onClick,
    hasMore,
    loading = false,
    loadingText = "加载中...",
    loadMoreText = "加载更多",
    className = "mt-8 text-center",
    buttonClassName = "px-4 py-2 bg-link-blue text-white rounded hover:bg-link-blue/80 transition-colors disabled:opacity-50"
}) => {
    if (!hasMore) return null;

    return (
        <div className={className}>
            <button
                className={buttonClassName}
                onClick={onClick}
                disabled={loading}
            >
                {loading ? loadingText : loadMoreText}
            </button>
        </div>
    );
};

export default LoadMore; 