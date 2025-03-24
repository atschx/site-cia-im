# cia.im - 个人博客与摄影网站

基于Gatsby构建的现代化个人博客和摄影作品展示网站，使用Tailwind CSS进行样式设计，提供响应式布局，支持MDX内容。

## 🚀 快速开始

### 环境要求

- Node.js: v16.15.1 或更高版本
- npm: v8.0.0 或更高版本
- Gatsby CLI: v3.0.0 或更高版本

### 安装依赖

1. 安装项目依赖

```shell
npm install
```

2. 安装Gatsby命令行工具(如果尚未安装)

```shell
npm install -g gatsby-cli
```

### 开发与构建

**开发模式**

启动开发服务器，支持热重载：

```shell
gatsby develop
# 或
npm run develop
```

然后访问: [http://localhost:8000](http://localhost:8000)

GraphQL查询工具: [http://localhost:8000/___graphql](http://localhost:8000/___graphql)

**生产构建**

构建生产版本：

```shell
gatsby build
# 或
npm run build
```

本地预览生产版本：

```shell
gatsby serve
# 或
npm run serve
```

**清理缓存**

遇到不明问题时，可以尝试清理缓存：

```shell
gatsby clean
# 或
npm run clean
```

## 📂 项目结构

```
/
├── blog/                 # 博客文章 (MDX格式)
├── src/
│   ├── components/       # React组件
│   ├── images/           # 图片资源
│   ├── pages/            # 页面组件
│   └── styles/           # 全局样式和Tailwind配置
├── static/               # 静态文件，直接复制到构建输出
├── gatsby-config.js      # Gatsby配置
├── gatsby-browser.js     # 浏览器相关配置
├── tailwind.config.js    # Tailwind CSS配置
└── postcss.config.js     # PostCSS配置
```

### 关键文件说明

- `gatsby-config.js`: 站点元数据和插件配置
- `src/components/layout/index.js`: 全局布局组件
- `src/styles/tailwind.css`: Tailwind CSS基础样式和自定义组件
- `tailwind.config.js`: Tailwind主题扩展和配置

## 🎨 主要功能

- **博客系统**: 支持MDX格式博客文章，代码高亮
- **响应式设计**: 在各种屏幕尺寸下都能良好显示
- **摄影作品集**: 展示照片作品，支持分类和灯箱查看
- **自定义主题**: 通过Tailwind CSS配置定制主题颜色和样式

## ❓ 常见问题解答

### Q: 如何添加新的博客文章?

A: 在`blog`目录下创建新的`.mdx`文件。文件应包含front matter元数据，例如：

```mdx
---
title: "我的新文章"
date: "2023-03-15"
author: "作者名"
hero_image: "../src/images/example.jpg"
hero_image_alt: "图片描述"
hero_image_credit_text: "图片来源"
hero_image_credit_link: "https://example.com"
---

这里是文章内容...
```

### Q: 如何自定义网站主题颜色?

A: 编辑`tailwind.config.js`文件中的`theme.extend.colors`部分来更改主题颜色。

### Q: 如何添加新页面?

A: 在`src/pages`目录中创建新的React组件文件。文件名将成为URL路径。

### Q: 如何解决构建错误?

A: 尝试以下方法:
1. 运行`gatsby clean`清理缓存
2. 检查依赖项版本兼容性
3. 查看Gatsby和相关插件的文档
4. 如果使用`group`类或其他Tailwind特殊类，确保正确应用方式

## 📚 技术栈

- [Gatsby](https://www.gatsbyjs.com/) - React静态站点生成器
- [React](https://reactjs.org/) - 用户界面库
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的CSS框架
- [MDX](https://mdxjs.com/) - Markdown + JSX
- [GraphQL](https://graphql.org/) - API查询语言

## 📄 许可证

MIT