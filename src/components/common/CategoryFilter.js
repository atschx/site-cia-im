import React from 'react';

/**
 * 分类筛选组件
 * 显示分类按钮组，支持选择分类
 * 
 * @param {Object} props - 组件属性
 * @param {Array} props.categories - 分类数组，每项包含id和name
 * @param {string} props.activeCategory - 当前激活的分类ID
 * @param {Function} props.onChange - 分类变更时的回调函数
 * @param {string} props.className - 容器CSS类名
 * @param {string} props.buttonClassName - 按钮基础CSS类名
 * @param {string} props.activeButtonClassName - 激活状态按钮CSS类名
 */
const CategoryFilter = ({
    categories,
    activeCategory,
    onChange,
    className = "category-filter",
    buttonClassName = "category-button",
    activeButtonClassName = "category-button-active"
}) => {
    return (
        <div className={className}>
            {categories.map(cat => (
                <button
                    key={cat.id}
                    className={`${buttonClassName} ${activeCategory === cat.id ? activeButtonClassName : ''
                        }`}
                    onClick={() => onChange(cat.id)}
                    aria-pressed={activeCategory === cat.id}
                >
                    {cat.name}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter; 