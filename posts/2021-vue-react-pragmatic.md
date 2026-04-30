---
title: Vue 与 React：我不站队，只选约束
date: 2021-03-02
description: 同一套业务在不同范式下的取舍：模板 DSL、Hooks 心智与团队熟练度。
tags:
  - Vue
  - React
category: 前端架构
---

两种栈我都长期写过。**Vue** 的 SFC 把样式、脚本与模板关在同一个文件里，对中等规模协作很友好；**React** 则通过函数组合与庞大生态，在复杂交互与跨平台（RN）上更有惯性。

我的实用主义结论是：

- **团队已有强项 > 个人偏好**
- **约束清晰的写法 > 炫技 API**
- **可测试的数据流 > 聪明的魔法**

```tsx
// React：组合与显式依赖
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

框架争论永无止境；交付线上稳定版本的人，往往更在意 **边界清晰与可回滚**。
