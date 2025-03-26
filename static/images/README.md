# 图片资源目录

此目录包含网站使用的图片资源文件。

## 目录结构

- `fallback-image.jpg` - 通用默认图片，当实际图片无法加载时显示
- `fallback-landscape.jpg` - 风景类别默认图片
- `fallback-portrait.jpg` - 人像类别默认图片
- `fallback-architecture.jpg` - 建筑类别默认图片
- `fallback-people.jpg` - 人物类别默认图片
- `photographs/` - 摄影作品图片目录（详见该目录下的README.md）

## 注意事项

1. 回退图片（fallback-*.jpg）必须存在于代码库中，确保项目能在任何环境中正常构建
2. 请确保回退图片文件尺寸较小，推荐使用压缩后的WebP格式
3. 回退图片应当使用通用性较强的图片，能够适应多种场景 