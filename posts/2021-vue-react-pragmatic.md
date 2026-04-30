---
title: Vue 与 React：我不站队，只选约束
date: 2021-03-02
description: 范式、生态与团队摩擦成本：同一业务在不同抽象下的真实取舍。
tags:
  - Vue
  - React
category: 前端架构
---

两种栈我都长期写过。**Vue** 的 SFC 把样式、脚本与模板关在同一个文件里，对中等规模协作很友好——评审时上下文集中，新人也能顺着 `<template>` 找到交互。**React** 则通过函数组合与庞大生态，在复杂交互、跨平台（RN）与「一切皆 JS」的团队里更有惯性。

我的实用主义结论是：

- **团队已有强项 > 个人偏好**：重写栈的成本往往在六个月后才显现。
- **约束清晰的写法 > 炫技 API**：hooks 嵌套过深、computed 链过长，本质都是可读性破产。
- **可测试的数据流 > 聪明的魔法**：能在单测里伪造输入的状态层，才是长期资产。

```tsx
function useArticle(slug: string) {
  const [data, setData] = useState<Article | null>(null)
  useEffect(() => {
    let cancelled = false
    fetchArticle(slug).then((d) => {
      if (!cancelled) setData(d)
    })
    return () => {
      cancelled = true
    }
  }, [slug])
  return data
}
```

---

## 真正的分歧在哪？

不在模板 vs JSX，而在**副作用驻留的位置**：谁在请求数据？谁在管理缓存？路由参数变了谁能感知？这些问题框架都能答，但答法不同导致的**隐性耦合**才是日后重构之痛。

框架争论永无止境；交付线上稳定版本的人，往往更在意 **边界清晰与可回滚**。选一个栈，然后对它诚实——比来回跳槽体面得多。
