---
title: TypeScript 不是银弹，但是极好的安全带
date: 2019-11-20
description: 渐进式采纳、边界建模与「类型作为文档」：团队里怎样才不流于形式。
tags:
  - TypeScript
  - 工程化
category: 前端工程
---

我们团队并不是一夜之间全面 TS 化，而是：**新模块先写 `.ts`，老代码碰到就补 `.d.ts` 或局部重写**。这一步最关键的不是编译器有多聪明，而是团队愿不愿意承认：**类型的成本主要在协作，而不是键盘**。

收益最大的是这三块：

1. **公共 API**：组件 props、SDK 入参出参、HTTP 响应形状——这些地方错了，代价在集成测试甚至线上。
2. **重构**：改名与签名变动时，`tsc` 帮你点名遗漏，比全文搜索字符串靠谱得多。
3. **文档**：类型即契约；它比 Wiki 更新得快，前提是类型名字诚实。

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

---

## 什么时候 TS 会让人失望？

当你用 `any` 把洞补上、用一堆断言掩盖建模懒惰时，它只是更啰嗦的 JavaScript。**TS 解决不了「业务建模错了」**，它能做的是把低级失误挡在 CI 里。

我的底线很简单：**对外边界严格，对内允许渐进**。模块内部的 messy union 可以迭代收紧；但 exported 的类型一旦写下，就要当作 semver 的一部分去维护。

十年经验里，最贵的 bug 往往不是语法错误，而是**隐性契约被破坏**。在这一点上，TS 仍是目前为止性价比最高的防线之一。
