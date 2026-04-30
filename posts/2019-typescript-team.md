---
title: TypeScript 不是银弹，但是极好的安全带
date: 2019-11-20
description: 渐进式引入、类型边界与团队协作：什么时候值得上 TS。
tags:
  - TypeScript
  - 工程化
category: 前端工程
---

我们团队并不是一夜之间全面 TS 化，而是：**新模块先写 `.ts`，老代码碰到就补 `.d.ts` 或局部重写**。

收益最大的是这三块：

1. **公共 API**：组件 props、SDK 入参出参。
2. **重构**：改名与签名变动时，编译器帮你点名遗漏。
3. **文档**：类型即契约，比 Wiki 更新得快。

```typescript
interface PublishOptions {
  draft?: boolean
  tags: readonly string[]
}

export async function publishArticle(
  slug: string,
  opts: PublishOptions,
): Promise<{ url: string }> {
  // ...
  return { url: `/posts/${slug}` }
}
```

TS 解决不了「业务建模错了」这类问题，但它能显著减少「传错字段」这类低级失误——**十年经验里，这类失误仍然是最贵的之一**。
