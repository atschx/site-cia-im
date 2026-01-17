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
const CategoryFilter: React.FC<CategoryFilterProps> = React.memo(
  ({
    categories,
    activeCategory,
    onChange,
    className = 'category-filter',
    buttonClassName = 'category-button',
    activeButtonClassName = 'category-button-active',
  }) => {
    return (
      <nav className={className} aria-label="照片分类筛选">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`${buttonClassName} ${
              activeCategory === category.id ? activeButtonClassName : ''
            } focus:outline-none focus:ring-2 focus:ring-link-blue dark:focus:ring-dark-link focus:ring-offset-2`}
            onClick={() => onChange(category.id)}
            aria-pressed={activeCategory === category.id}
            aria-current={activeCategory === category.id ? 'true' : undefined}
          >
            {category.name}
          </button>
        ))}
      </nav>
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if categories or activeCategory change
    return (
      prevProps.categories === nextProps.categories &&
      prevProps.activeCategory === nextProps.activeCategory
    );
  }
);

CategoryFilter.displayName = 'CategoryFilter';

export default CategoryFilter;
