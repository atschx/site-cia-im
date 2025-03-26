# 照片灯箱组件 (PhotoLightbox)

一个功能强大、可访问性良好、高性能的React照片灯箱组件，适用于Gatsby项目。

## 特性

- 多级缩放功能，支持拖动和平移
- 支持键盘导航和快捷键
- 响应式设计，适应不同屏幕尺寸
- 优化的性能，使用节流处理高频事件
- 良好的可访问性支持
- 优化的组件结构，易于维护和扩展
- 支持GatsbyImage和常规图片

## 安装

该组件已经集成在项目中，无需额外安装。

## 使用方法

```jsx
import React from 'react';
import PhotoLightbox from '../components/photo-lightbox';
import useLightbox from '../components/photo-lightbox/hooks/useLightbox';

const MyGallery = ({ photos }) => {
    // 使用useLightbox Hook管理灯箱状态
    const { isOpen, currentPhoto, open, close, next, prev } = useLightbox(photos);

    return (
        <div>
            {/* 照片缩略图，点击打开灯箱 */}
            <div className="photo-grid">
                {photos.map(photo => (
                    <img 
                        key={photo.id}
                        src={photo.src} 
                        alt={photo.title}
                        onClick={() => open(photo)}
                    />
                ))}
            </div>

            {/* 照片灯箱 */}
            <PhotoLightbox
                photo={currentPhoto}
                isOpen={isOpen}
                onClose={close}
                onNext={next}
                onPrev={prev}
            />
        </div>
    );
};

export default MyGallery;
```

## API参考

### `<PhotoLightbox>` 组件

| 属性 | 类型 | 描述 |
|------|------|------|
| `photo` | Object | 当前要显示的照片对象 |
| `isOpen` | Boolean | 控制灯箱是否打开 |
| `onClose` | Function | 关闭灯箱的回调函数 |
| `onNext` | Function | 显示下一张照片的回调函数 |
| `onPrev` | Function | 显示上一张照片的回调函数 |

### `photo` 对象属性

| 属性 | 类型 | 描述 |
|------|------|------|
| `id` | String | 照片的唯一标识符 |
| `title` | String | 照片的标题 |
| `gatsbyImageData` | Object | Gatsby图片数据 (可选) |
| `originalSrc` | String | 原始图片URL (可选) |
| `src` | String | 图片URL (可选) |
| `location` | String | 照片拍摄地点 (可选) |
| `date` | String | 照片拍摄日期 (可选) |
| `camera` | String | 使用的相机型号 (可选) |
| `lens` | String | 使用的镜头型号 (可选) |
| `aperture` | String | 光圈设置 (可选) |

### `useLightbox` Hook

用于管理灯箱状态的自定义Hook，返回控制灯箱的状态和函数。

```jsx
const { isOpen, currentIndex, currentPhoto, open, close, next, prev } = useLightbox(photos);
```

| 返回值 | 类型 | 描述 |
|------|------|------|
| `isOpen` | Boolean | 灯箱是否打开 |
| `currentIndex` | Number | 当前照片在数组中的索引 |
| `currentPhoto` | Object | 当前显示的照片对象 |
| `open` | Function | 打开灯箱并显示指定照片 |
| `close` | Function | 关闭灯箱 |
| `next` | Function | 显示下一张照片 |
| `prev` | Function | 显示上一张照片 |

## 键盘快捷键

灯箱打开时，支持以下键盘快捷键：

- `Esc` : 关闭灯箱
- `←` : 上一张照片
- `→` : 下一张照片
- `+` / `=` : 放大
- `-` / `_` : 缩小
- `0` : 重置缩放

## 代码结构

组件采用模块化设计，分离UI和业务逻辑：

```
photo-lightbox/
├── components/           # UI组件
│   ├── LightboxControls.js   # 控制按钮
│   ├── LightboxNavigation.js # 导航按钮
│   ├── PhotoContainer.js     # 照片容器
│   └── PhotoInfo.js          # 照片信息
├── hooks/                # 业务逻辑
│   ├── useLightbox.js        # 管理灯箱状态
│   └── useLightboxState.js   # 管理照片交互状态
├── examples/             # 使用示例
│   └── PhotoGalleryExample.js
├── index.js              # 主组件入口
└── README.md             # 文档
``` 