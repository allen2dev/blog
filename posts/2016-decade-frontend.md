---
title: 从 jQuery 到组件化：这十年的前端我记住了什么
date: 2016-09-12
description: 入行早期的片段：模块化、构建工具初体验，以及为何转向组件思维。
tags:
  - 前端
  - 随笔
category: 从业手记
---

那时候页面还是「选 DOM、绑事件、手动同步状态」。真正让我开窍的是：**把 UI 当成状态函数**，而不是一堆零散脚本。

CommonJS、AMD 之争现在看来像史前遗迹，但当时能在 Node 里跑构建脚本，已经是生产力飞跃。后来 webpack 接管了一切——有人说它重，可工程一旦变大，**可预测的依赖图**比「写得爽」更重要。

> 经验之谈：先让模块边界清晰，再谈框架选型；顺序反了会一直在还债。

```javascript
// 早年 CommonJS 一页里的缩影
var template = require('./template.html')
module.exports = function render(state) {
  return template(state)
}
```

这段路走下来，我学会了少抱怨工具链复杂——**复杂度往往来自业务与协作规模**，不是 webpack 本身。
