# cia.im - 个人博客与摄影网站

基于 **Gatsby 5** 构建的现代化个人博客和摄影作品展示网站，使用 React 18、TypeScript 和 Tailwind CSS，支持暗黑模式和 MDX 内容。

## ✨ 特性

- 🚀 **Gatsby 5** - 最新版静态站点生成器，支持 Partial Hydration
- ⚛️ **React 18** - 并发特性支持
- 📝 **MDX v2** - Markdown + JSX，支持 GFM 语法
- 🎨 **Tailwind CSS** - 实用优先的 CSS 框架
- 🌙 **暗黑模式** - 支持明/暗主题切换，跟随系统偏好
- 📷 **照片灯箱** - 摄影作品展示，支持缩放和导航
- 🔷 **TypeScript** - 渐进式类型支持
- 📱 **响应式设计** - 适配各种屏幕尺寸

---

## 🚀 快速开始

### 环境要求

| 工具 | 版本要求 |
|------|----------|
| Node.js | **v18.0.0** 或更高 (Gatsby 5 要求) |
| npm | v9.0.0 或更高 |

> ⚠️ Gatsby 5 不再支持 Node.js 16，请确保使用 Node 18+

### 安装与运行

```bash
# 1. 克隆项目
git clone git@github.com:atschx/site-cia-im.git
cd site-cia-im

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run develop
```

访问地址：
- 🌐 网站：[http://localhost:8000](http://localhost:8000)
- 🔍 GraphQL：[http://localhost:8000/___graphql](http://localhost:8000/___graphql)

### 常用命令

| 命令 | 说明 |
|------|------|
| `npm run develop` | 启动开发服务器（热重载） |
| `npm run build` | 构建生产版本 |
| `npm run serve` | 本地预览生产版本 |
| `npm run clean` | 清理 `.cache` 和 `public` 目录 |

---

## 📂 项目结构

```
site-cia-im/
├── blog/                     # 博客文章 (MDX 格式)
│   └── {article}/
│       └── index.mdx
├── src/
│   ├── components/           # React 组件
│   │   ├── common/           # 通用组件 (ThemeToggle, LoadMore 等)
│   │   ├── layout/           # 布局组件
│   │   └── photo-lightbox/   # 照片灯箱组件
│   ├── hooks/                # 自定义 Hooks (TypeScript)
│   │   ├── useTheme.ts       # 主题切换
│   │   ├── filter/           # 过滤相关
│   │   └── pagination/       # 分页相关
│   ├── types/                # TypeScript 类型定义
│   ├── pages/                # 页面组件
│   ├── templates/            # 页面模板
│   ├── data/                 # 静态数据
│   ├── styles/               # 全局样式
│   └── utils/                # 工具函数
├── static/
│   └── images/
│       └── photographs/      # 摄影作品图片
├── gatsby-config.js          # Gatsby 配置
├── gatsby-node.js            # Gatsby Node API
├── gatsby-browser.js         # 浏览器端配置
├── tailwind.config.js        # Tailwind CSS 配置
├── tsconfig.json             # TypeScript 配置
└── postcss.config.js         # PostCSS 配置
```

### 关键文件说明

| 文件 | 说明 |
|------|------|
| `gatsby-config.js` | 站点元数据、插件配置、MDX 选项 |
| `gatsby-node.js` | 动态创建页面、生成 slug 字段 |
| `src/types/` | TypeScript 类型定义 (Theme, Photo, Category) |
| `src/hooks/` | 自定义 React Hooks |
| `tailwind.config.js` | Tailwind 主题扩展、暗黑模式配置 |

---

## 📝 内容管理

### 添加博客文章

在 `blog/` 目录下创建文件夹和 `index.mdx` 文件：

```
blog/
└── my-new-post/
    ├── index.mdx
    └── cover.jpg          # 可选：封面图片
```

MDX 文件格式：

```mdx
---
title: "文章标题"
date: "2026-01-16"
author: "作者名"
tag: "tech"
hero_image: "./cover.jpg"
hero_image_alt: "封面图片描述"
---

这里是文章内容，支持 **Markdown** 和 JSX 组件。

## 支持 GFM 语法

- [x] 任务列表
- [ ] 待完成

| 表格 | 支持 |
|------|------|
| 是   | ✅   |
```

### 关于页面

关于页面通过 `tag: "bio"` 标识，在 `blog/about.mdx` 中编辑。

---

## 🎨 主题定制

### 暗黑模式

项目支持系统级暗黑模式偏好，也可手动切换。相关文件：

- `src/hooks/useTheme.ts` - 主题状态管理
- `src/components/common/ThemeToggle.tsx` - 切换按钮组件
- `tailwind.config.js` - 暗黑模式颜色配置

### 自定义颜色

编辑 `tailwind.config.js` 中的 `theme.extend.colors`：

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        'link-blue': '#3182ce',
        'dark-bg': '#1a202c',
        'dark-text': '#e2e8f0',
        // 添加自定义颜色...
      }
    }
  }
}
```

---

## 🖼️ 图片资源

摄影作品图片存放在 `static/images/photographs/` 目录，该目录未纳入 Git 版本控制。

### 获取图片资源

1. **联系维护者** 获取完整图片包
2. **使用示例图片** - 放置几张图片到目录中即可
3. **回退机制** - 缺失图片会自动显示占位图

---

## 📚 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| [Gatsby](https://www.gatsbyjs.com/) | 5.13.x | React 静态站点生成器 |
| [React](https://react.dev/) | 18.2.x | 用户界面库 |
| [TypeScript](https://www.typescriptlang.org/) | 5.9.x | 类型安全 |
| [MDX](https://mdxjs.com/) | 2.3.x | Markdown + JSX |
| [Tailwind CSS](https://tailwindcss.com/) | 3.3.x | CSS 框架 |
| [Prism.js](https://prismjs.com/) | 1.29.x | 代码高亮 |

---

## ❓ 常见问题

### 构建失败怎么办？

```bash
# 1. 清理缓存
npm run clean

# 2. 删除 node_modules 重新安装
rm -rf node_modules package-lock.json
npm install

# 3. 检查 Node.js 版本
node -v  # 确保 >= 18.0.0
```

### GraphQL 查询报错？

Gatsby 5 的 GraphQL 语法有变化：

```graphql
# ❌ 旧语法
sort: {fields: frontmatter___date, order: DESC}

# ✅ 新语法
sort: {frontmatter: {date: DESC}}
```

### TypeScript 类型错误？

项目采用渐进式 TypeScript 迁移，`tsconfig.json` 配置了 `allowJs: true`，允许 JS/TS 混合。

---

## 📄 许可证

MIT

---

## 👤 作者

**Albert** - [cia.im](https://cia.im)
