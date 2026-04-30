---
title: Node 里的异步：从回调地狱到 async/await
date: 2018-04-08
description: 服务端脚本、CLI 与并发：为何 finally 选择了 Promise + async 这一套。
tags:
  - Node.js
  - 异步
category: Node
---

做 Node 久了会发现：**Most bugs are timing bugs**。早期 `callback(err, data)` 层层嵌套，可读性与错误传播都是噩梦。

`Promise` 统一了「将来会有一个值」的语义，`async/await` 则把异步代码拉回了大多数人更好理解的控制流。用在 CLI、批处理任务、轻量 BFF 里，配合 `try/catch`，心智负担小很多。

```typescript
async function batchFetch(urls: string[]) {
  const results = await Promise.all(
    urls.map(async (url) => {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`${url} ${res.status}`)
      return res.json()
    }),
  )
  return results
}
```

仍然要记得：**并发不等于并行**。`Promise.all` 适合 IO 密集；CPU 密集该考虑 worker 或队列，而不是无脑 async。
