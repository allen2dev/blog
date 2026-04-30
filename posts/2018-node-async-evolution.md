---
title: Node 异步二十年简史：从回调地狱到可观测的 async
date: 2018-04-08
description: 错误传播、背压、取消语义与资源泄漏——在「写得像同步」之后仍要补上的那一课。
tags:
  - Node.js
  - 异步
category: Node
---

Node 的卖点从来都不是「JavaScript 很酷」，而是**用事件循环把 IO 密集活干好**：用少量线程服务大量连接。可一旦你在业务里写了足够多的异步逻辑，就会发现：**Most bugs are timing bugs**——有时表现为 race condition，有时表现为「我以为早已完成的写入其实还没 flush」，有时表现为「cancel 了请求却没收尾」。

这篇文章把我对异步演进的理解摊开来：**不止是语法糖更替，而是错误模型与资源模型是否在变好**。读完你可能会同意：`async/await` 解决了一半问题；另一半要靠纪律与工具。

---

## 第一章：回调时代的真实痛点

`callback(err, result)` 看似简单，痛点却在两处：

**其一是错误传播**。漏写一个 `if (err)`，错误就地蒸发；多层嵌套里更容易忘记在某个分支 return。**其二是控制流组合**。串行、并行、超时、重试——手写嵌套很快不可读。`async` 库、Bluebird 等库曾经救场，本质是在补「语言级组合子」的缺位。

很多人用「回调地狱」形容缩进，我倒觉得**更致命的是隐式状态**：你不得不在闭包里记「已经收到第几个结果」「是否已调用过 callback」——这些状态一多，就离「可证明正确」越来越远。

---

## 第二章：Promise 到底统一了什么

Promise 首先统一了**表示未来值**的数据结构：有且仅有三种终态。其次，它让 `throw` 在链式调用里有了可传播路径——这直接改变了错误处理的心智。

但 Promise 也引入新的坑：

- **忘记 return Promise**，父级 `then` 以为子任务完成，实际还在飞。
- **吞错**：`catch` 里处理完若仍想向上抛，需要显式 rethrow 或 return rejected Promise。
- **并发误用**：`Promise.all` 在「一错全错」与 `Promise.allSettled` 在「全收集」之间，业务常常选错。

这一阶段教会我：**组合异步不等于理解异步**。语法层面的 `.then` 链再漂亮，也挡不住错误模型没想清楚的业务。

---

## 第三章：async/await——控制流回来了，责任也在

`async/await` 的价值在于：把异步代码变回大多数人熟悉的**块状控制流**，`try/catch` 终于能包住一整段逻辑。对维护 CLI、BFF、批处理脚本的人来说，这是实实在在的认知减负。

但请牢记：**async 函数本身总是返回 Promise**。这意味着：

1. **顶层 await**（在支持的运行时）与**普通函数里忘记 await** 是两类经典 bug 来源。
2. **并发仍然要你亲自选策略**：`Promise.all`、`map` 里 `async`、还是队列——await 不会替你决定。
3. **取消（cancellation）**依然不是语言内置语义——AbortController、自定义 token、或干脆接受「发起方走了但回调仍会落地」的风险。

下面这段批量请求在演示「并发」的同时，也演示了**失败策略**必须显式选择：

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

若业务要求「部分失败可接受」，你就必须改写为 `allSettled` 或逐条 try/catch，并在返回结构里区分成功与失败——这不再是语法问题，而是**产品语义**问题。

---

## 第四章：IO 密集 vs CPU 密集——async 救不了后者

Node 的主线程模型决定了：**长 CPU 任务会阻塞事件循环**。你再优雅的 `await`，也挡不住同步 JSON 解析巨型对象或巨型正则回溯带来的卡顿。对策通常是：

- **拆分任务**：`setImmediate` / `queueMicrotask`（谨慎）分批处理；
- **worker_threads** 或子进程跑 CPU 密集；
- **队列系统**把重活挪到专用 worker pool。

.async 并没有改变这一条物理定律。

---

## 第五章：背压与资源——并发上限谁来守

并发不等于无限并行。一千个 HTTP 请求同时 `fetch`，可能打爆本地 ephemeral port，也可能压垮下游。你需要：

- **连接池与 keep-alive**（若走底层客户端）；
- **限制并发数**（p-limit 一类工具）；
- **超时与重试策略**（带 jitter，避免惊群）。

这些东西不会出现在「async 入门」教程里，却决定了线上是否会在促销夜报警。

---

## 结语

从回调到 Promise 再到 async/await，表面是语法演进，底层是**错误模型与组合能力**在变完整。写 Node 的第十年，我不再追求「看起来像同步代码」，而追求三件事：**错误能否追到源头、资源能否在 finally 里收口、并发是否有上限**。

剩下那一半，交给代码评审与监控——它们和异步范式一样老，也一样可靠。
