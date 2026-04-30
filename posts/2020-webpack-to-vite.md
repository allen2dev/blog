---
title: Webpack 五年后，为什么我乐意拥抱 Vite
date: 2020-07-14
description: 开发时延、生态兼容与迁移策略：构建工具的换代笔记。
tags:
  - Vite
  - Webpack
  - 工程化
category: 前端工程
---

Webpack 教会了我「一切皆模块」与插件哲学；但当项目变大，**冷启动与 HMR 延迟**开始吃掉专注时间。

Vite 的开发路径本质是：**原生 ESM + 按需编译**，生产再用 Rollup 打包。对个人站点和小中型应用，体验差异非常明显——改一行样式，反馈几乎是瞬时的。

迁移建议：

- 先对齐环境变量与 `public` 静态资源路径。
- 再搬 loader 逻辑到插件生态（Vue、TS、CSS）。
- 最后处理遗留的动态 `require`。

```bash
# 本地习惯保留一条清晰脚本，避免口头约定
npm run dev
npm run build
```

工具会变，原则不变：**构建管线服务于交付节奏，而不是反过来**。
