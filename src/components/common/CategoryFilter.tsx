import React from 'react';
import { Category, CategoryId } from '../../types';

interface CategoryFilterProps {
  /** 分类数组，每项包含id和name */
  categories: Category[];
  /** 当前激活的分类ID */
  activeCategory: CategoryId;
  /** 分类变更时的回调函数 */
  onChange: (categoryId: CategoryId) => void;
  /** 容器CSS类名 */
  className?: string;
  /** 按钮基础CSS类名 */
  buttonClassName?: string;
  /** 激活状态按钮CSS类名 */
  activeButtonClassName?: string;
}

/**
 * 分类筛选组件
 * 显示分类按钮组，支持选择分类
 */
const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onChange,
  className = 'category-filter',
  buttonClassName = 'category-button',
  activeButtonClassName = 'category-button-active',
}) => {
  return (
    <div className={className}>
      {categories.map((category) => (
        <button
          key={category.id}
          className={`${buttonClassName} ${
            activeCategory === category.id ? activeButtonClassName : ''
          }`}
          onClick={() => onChange(category.id)}
          aria-pressed={activeCategory === category.id}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
