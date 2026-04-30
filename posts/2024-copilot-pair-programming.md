---
title: Copilot 之后：我把 AI 当成「结对实习生」
date: 2024-06-18
description: 补全、重构与踩坑：如何让助手写得快，而你仍然掌控架构。
tags:
  - AI
  - 前端
  - 生产力
category: AI 与实践
---

2023 年起，编辑器里的补全从「猜下一个 token」变成了「敢写一整段」。我的用法很朴素：**把 AI 当成熟悉语法的实习生**——快，但不替你背锅。

几条实践：

1. **先写意图注释与接口签名**，再让它填空，比从零生成靠谱。
2. **敏感逻辑必须人工审**：权限、金额、隐私数据路径，一律不让「一键接受」。
3. **单测与类型**仍是防线；生成代码先过 `tsc` / `eslint`，再过 CR。

```typescript
/**
 * 将用户草稿转为发布 payload；不负责鉴权。
 */
export function toPublishPayload(raw: Record<string, unknown>) {
  // 让 Copilot 补内部字段校验，而不是让它设计 API
  return {
    title: String(raw.title ?? ''),
    tags: Array.isArray(raw.tags) ? raw.tags.map(String) : [],
  }
}
```

AI 改变的是**打字速度**，不是**问题是否被正确定义**。这一点，十年前后都一样。
