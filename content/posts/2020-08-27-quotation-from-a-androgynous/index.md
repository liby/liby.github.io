---
title: 从 Form 到 Model 层的讨论
slug: quotation-from-a-androgynous
author: Bryan Lee
date: 2020-08-27
hero: ./images/hero.jpeg
excerpt: 这就是观察者模式的代价，你做到了消费者按需订阅，你能自动响应变化，但你不能再回溯到事件的根源，所以这个时候你需要合并同步更新。
tags:
  - 扶言扶语
  - Form
  - MVVM
---

## 关于 Formik

Formik 性能有问题，而且强依赖 React：Model 和 ViewModel 混在一起，还强依赖一个 View 层框架，怎么可能是好的设计；Redux 这套东西就不对。

React 的 View 层调度也是很牛逼但是应该避免使用的东西：Hooks 用来做逻辑复用可以，用来做 Model 就是扯淡。

## 关于 Dva

Dva 是傻逼玩意：Umi 思路很对，被 Dva 坑了

## 关于 Model 层

高阶组件不能胜任 Model 层的工作，Model 是要单独设计的一个东西，不应该参杂任何 View 层的东西。

React 说好的只做 View 层。Fiber 就好好做 Time slicing 就完事了，非要把调度也做进去，关键 React 的调度最终是用来做 vdom diff 的，vdom diff 是无脑 diff，说什么都不可能比经过良好设计的model层调度更快；而且本来 Mmdel 层如果要实现低耦合的高度复用，就是需要自身有调度机制的，能在 Model 做好的手动调度，就不要放到 View 层无脑 diff 了。

MVC 体系是分形的，Model 自身也可以是一个独立的 MVC，对 MVVM 来说，Model、View、ViewModel 本身就是针对一个 I/O 的接口做设计，凭啥人家 Model 也要跟着你 React 搞函数式？

Model 层如果是一个单独的 Model，那么就不存在调度一说；但如果是多个 Model 关联，那么就需要调度了，因为多个 Model 之间要通信，又不能耦合，而某个组件又可能要订阅多个 Model 的更新，对于这些更新的来源和合并，就需要调度了；总之就是多个 Model 合成一个大的 Model，又需要可以独立使用，这中间是需要调度的。

## Form 与 Model

以 Form 表单来说，其实它就一个 Model，你别看 Formily 里面有 `Form`、`FormHeart`、`FormGraph`、`*Field` 等，看名字好像都是 Model，其实他们就是实现了 Subscribable 的的普通类实例，那只是对象内部结构和 Form 这个 Model 的内部通信，这里边其实是不存在调度的。
对于 Form 这个 Model 来说，直接根据 field 点对点订阅就完事了，根本用不着放到 React 里走一堆无脑的重复渲染和 diff。

「订阅」这个行为本身是需要一定的「调度」的，因为你订阅的多个数据源的更新可能不在一个调用栈里，所以只能通过调度的方式同步。

Model 之所以不在一个调用栈里，是因为：对于声明式编程，消息在发出的时候是不知道它会导致哪些组件变化的，而是发出的消息导致 Model 层数据产生变化后被组件订阅。
这就是观察者模式的代价，你做到了消费者按需订阅，你能自动响应变化，但你不能再回溯到事件的根源，所以这个时候你需要合并同步更新。

## 关于 View 层

View 层调度最简单的例子就是：组件 A 的数据来源有 Props、State 以及外部 Store。

如果某一个事件触发了 Store 的变化，这个变化导致了父组件给 A 的 Props 的变化，同时组件 A 它自己也可能用 State 保存了某些变化；这就会导致 3 次状态变更，而它们其实是可以合并的，React 就是在优化这个调度的性能。

但是你把 Model 层本来可以按需订阅的东西交给 React 来 diff 就很扯淡了，比如 Formik、Redux-form 以及 Ant Design的form，都是坑爹玩意。