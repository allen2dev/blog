---
title: Node 里的异步：从回调地狱到 async/await
date: 2018-04-08
description: 错误传播、并发模型与背压：为何 Promise + async 仍是服务端脚本的主力抽象。
tags:
  - Node.js
  - 异步
category: Node
---

做 Node 久了会发现：**Most bugs are timing bugs**。早期 `callback(err, data)` 层层嵌套，可读性与错误传播都是噩梦——更隐蔽的是，人们往往忘了在某个分支调用 `cb`，静默丢失错误。

`Promise` 至少统一了「将来会有一个值」的语义，并让 `throw` 可以沿着链向下传递。到 `async/await`，异步代码终于回到了多数人熟悉的控制流形状：`try/catch` 能包住一整段逻辑，而不是在每个回调里手写 `if (err)`。

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

但这套写法里有三个常被忽略的坑：

1. **`Promise.all` 与失败策略**：一行失败全盘 reject。若你需要「尽力而为」收集结果，要自己封装 `allSettled` 或逐个捕获。
2. **并发不等于并行**：一千个 HTTP 请求同时发出去，会把连接池和远端都打爆——要有队列、限速或分批。
3. **async 函数抛错**：未捕获的 rejection 仍会毁掉进程——在 CLI 顶层要有统一 `unhandledRejection` 日志策略。

---

## 何时不要用 async？

CPU 密集、长时间占用事件循环的任务，async 救不了你——该考虑 worker thread、子进程或下游队列。Node 的核心仍是**单线程 reactor**：你再优雅的 `await`，也挡不住同步 JSON 解析巨型对象时的卡顿。

把这些分寸放在心上，Promise/async 才是「好用」的；否则它只是把你从回调地狱推进了另一个名叫「并发失控」的地狱。
