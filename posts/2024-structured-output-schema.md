---
title: 结构化输出与 JSON Schema：让模型「填表」而不是「写作文」
date: 2024-11-07
description: 生成式接口里的契约、校验失败路径与前端表单映射。
tags:
  - AI
  - LLM
  - TypeScript
category: AI 与实践
---

当你把 LLM 嵌进业务接口时，最先暴露的不是模型智商，而是**接口契约**。自由文本很好演示，很难集成——前端要渲染、后端要落库、审计要比对，这时候「让它随便输出一段话」往往是灾难的开始。

更稳妥的形态通常是：**输出结构化 JSON**，字段含义固定，可选键明确，数组长度有上限。前端再把这份 JSON 映射到表单控件——出错时能在字段级别提示，而不是整页「模型又胡说八道了」。

```typescript
const ArticleDraftSchema = {
  type: 'object',
  properties: {
    title: { type: 'string', maxLength: 120 },
    summary: { type: 'string', maxLength: 400 },
    tags: { type: 'array', items: { type: 'string' }, maxItems: 8 },
  },
  required: ['title', 'summary'],
} as const
```

---

## 失败路径要和成功路径同等对待

解析失败时谁来兜底？重试？降级成人工编辑？是否打点监控「格式偏离」频率？这些不问清楚就上线，运维会在第一周替你补课。

归根结底：**模型擅长生成候选，系统负责裁决**。Schema 与校验器就是裁决席的一部分——对前端来说，这和十年前做好表单校验没有本质不同，只是候选来源换了一种。
