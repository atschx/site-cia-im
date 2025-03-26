# 自定义Hooks

本目录包含项目中使用的通用自定义Hooks。

## 目录结构

```
hooks/
├── pagination/                 # 分页相关hooks
│   └── usePagination.js        # 分页加载hook
├── filter/                     # 筛选相关hooks
│   └── usePhotoFilter.js       # 照片筛选hook
├── useLightbox.js              # [已迁移] 照片灯箱hook (兼容性保留)
├── usePagination.js            # [已迁移] 分页加载hook (兼容性保留)
├── usePhotoFilter.js           # [已迁移] 照片筛选hook (兼容性保留)
├── index.js                    # 统一导出
└── README.md                   # 文档
```

## 使用方法

推荐通过统一入口导入hooks:

```jsx
import { useLightbox, usePagination, usePhotoFilter } from '../hooks';

// 使用hooks
const { currentPhoto, isOpen } = useLightbox(photos);
const { paginatedItems, loadMore } = usePagination(items);
const { filteredPhotos } = usePhotoFilter(photos);
```

## 可用Hooks

### `useLightbox`

照片灯箱状态管理hook。

> 注意：此hook已迁移至`components/photo-lightbox`目录。

```jsx
const { isOpen, currentPhoto, open, close, next, prev } = useLightbox(photos);
```

### `usePagination`

分页加载状态管理hook，适用于"加载更多"模式。

```jsx
const { 
  paginatedItems, // 分页后的数据
  hasMore,        // 是否还有更多数据
  loadMore,       // 加载更多数据
  resetPagination // 重置分页
} = usePagination(items, initialPageSize, incrementSize);
```

### `usePhotoFilter`

照片筛选状态管理hook。

```jsx
const {
  activeCategory,   // 当前活动分类
  setActiveCategory, // 设置活动分类
  filteredPhotos    // 筛选后的照片
} = usePhotoFilter(allPhotos, initialCategory);
``` 