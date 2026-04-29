# 静态博客（Vue 3 + Vite SSG）

基于 **Markdown** 内容源的静态站点：构建时解析 `posts/`，使用 **vite-ssg** 预渲染 HTML，可部署到 **GitHub Pages**（`gh-pages` 分支）。

## 功能

- 首页、文章列表（**分页**）、文章详情（Markdown → HTML，**Prism 代码高亮**）
- **标签** 聚合页、`category` / `tags` 等 frontmatter
- 浅色卡片布局与蓝色强调（视觉参考 [Leap Day](https://pages-themes.github.io/leap-day/)，样式为本仓库独立实现）

## 目录结构

```
posts/                 # Markdown 文章（构建时扫描）
src/
  components/          # 布局与分页等
  pages/               # 页面视图
  router/              # Vue Router 定义
  styles/              # 全局样式
  App.vue
  main.ts              # vite-ssg 入口（export createApp）
scripts/ssg-build.ts   # 调用 vite-ssg build，并注入文章路由
vite/plugins/          # posts 虚拟模块插件
```

## 本地开发

```bash
npm install
npm run dev
```

本地默认 `base` 为 `/`，直接访问 `http://localhost:5173` 即可。

## 构建

```bash
npm run build
```

产物在 `dist/`，为纯静态文件（含各路由的 `index.html`）。

### GitHub Pages 与 base 路径

若仓库使用 **Project Pages**（地址形如 `https://<user>.github.io/<repo>/`），构建时必须设置资源前缀：

```bash
VITE_BASE_PATH=/<你的仓库名>/ npm run build
```

**用户/组织主页**（`https://<user>.github.io/`）则使用：

```bash
VITE_BASE_PATH=/ npm run build
```

## GitHub Actions 部署

工作流：[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml)

- 在 `main` 推送时触发
- 使用 `VITE_BASE_PATH=/${{ github.event.repository.name }}/` 构建
- 通过 [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages) 将 `dist/` 推送到 **`gh-pages`** 分支

### 仓库设置

1. 打开仓库 **Settings → Pages**
2. **Build and deployment**：Source 选 **Deploy from a branch**
3. Branch 选 **`gh-pages`**，文件夹 **`/(root)`**，保存

首次推送 `main` 后等待 Actions 完成，站点 URL 一般为：

`https://<owner>.github.io/<repo>/`

### 自检清单

- 首页与 `/posts/` 能打开，导航链接前缀正确（无裸 `/assets/` 404）
- 打开一篇文章详情页，刷新页面仍为详情（说明预渲染成功）
- 列表分页 `/posts?page=2` 正常（客户端路由）

## 新增文章

在 `posts/` 下新建 `.md` 文件，建议使用 frontmatter：

```yaml
---
title: 标题
date: 2026-04-29
description: 摘要
tags:
  - 标签一
category: 分类名
---
```

文件名（不含 `.md`）即为文章 **slug**，对应路由 `/posts/<slug>/`。

## 技术栈

Vue 3（`<script setup lang="ts">`）、Vite、Vue Router、vite-ssg、markdown-it、markdown-it-prism、gray-matter。
