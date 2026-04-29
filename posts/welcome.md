---
title: 欢迎使用静态博客
date: 2026-04-01
description: 介绍本项目能力与目录结构。
tags:
  - 入门
  - Vue
category: 指南
---

## 功能概览

本博客在 **构建阶段** 将 `posts` 目录下的 Markdown 转为 HTML，并配合 **vite-ssg** 生成可部署的静态页面。

- 文章列表与 **分页**
- 文章详情（**代码高亮**、标题锚点）
- **标签** 聚合页

### 代码示例

```typescript
import { postsFull } from 'virtual:posts-data'

export function findPost(slug: string) {
  return postsFull.find((p) => p.slug === slug)
}
```

```bash
npm run build
```

> 部署到 GitHub Pages 时，请设置正确的 `base` 路径（一般为 `/仓库名/`）。
