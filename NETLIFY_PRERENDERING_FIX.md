# Netlify Legacy Prerendering 警告解决方案

## 问题

部署到 Netlify 时出现警告：
```
This project is using legacy prerendering, which is being deprecated.
Please disable the feature and learn about alternatives here.
```

## 原因

Netlify 正在弃用旧的 prerendering 功能，并将在以下时间停止服务：

- **Free 计划**: 2026年1月27日
- **Personal/Pro 计划**: 2026年2月17日
- **Enterprise 计划**: 2026年3月17日

## Gatsby 站点不需要 Prerendering

**重要**: Gatsby 作为静态站点生成器（SSG），在构建时已经生成完整的 HTML，**不需要** Netlify 的 prerendering 功能。

Prerendering 主要是为以下框架设计的：
- ❌ React SPA（纯客户端渲染）
- ❌ Vue SPA（纯客户端渲染）
- ❌ Angular SPA（纯客户端渲染）

我们的站点已经具备：
- ✅ 构建时生成的完整 HTML
- ✅ SEO 友好的 sitemap 和 meta tags
- ✅ 搜索引擎可直接抓取

## 解决步骤

### 1. 在 Netlify 控制台禁用功能

1. 登录 Netlify: https://app.netlify.com/
2. 选择站点 `site-cia-im`
3. 导航到：**Site configuration → Build & deploy → Post processing**
4. 找到 **Prerendering** 选项
5. **关闭/禁用** 该功能
6. 点击 **Save**

### 2. 重新部署

- 方式1: 推送新的 commit 到 GitHub
- 方式2: 在 Netlify 点击 **Trigger deploy → Clear cache and deploy site**

### 3. 验证

重新部署后，警告应该消失。

## 替代方案（不推荐）

如果你确实需要 prerendering（对于 Gatsby 站点来说不需要），可以选择：

- **Netlify Prerender Extension**: 适合简单设置
- **Prerender.io Extension**: 适合企业级复杂场景

但对于我们的 Gatsby 静态站点，**直接禁用**是最佳选择。

## 参考资料

- [Netlify Legacy Prerendering Migration Guide](https://answers.netlify.com/t/legacy-prerendering-migration-guide/158938)
- [Netlify Prerendering Documentation](https://docs.netlify.com/build/post-processing/prerendering/)
- [Gatsby Cloud to Netlify Migration](https://www.netlify.com/blog/gatsby-cloud-evolution/)

## 相关 Commit

- `c1227b7` - 从 Gatsby Cloud 迁移到 Netlify，添加 netlify.toml 配置

---

**更新时间**: 2026-01-17
**状态**: ✅ 待执行（需在 Netlify UI 中禁用）
