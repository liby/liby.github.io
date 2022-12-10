---
title: 一次因为错误配置 Git 而导致的「事故」
slug: 2021-07-17-accidents-caused-by-misconfiguration-of-git
author: Bryan Lee
date: 2021-07-17
hero: ./images/hero.jpeg
excerpt: push.default 的配置选项有五个：nothing, current, upstream, simple,matching。
tags:
  - Git
---

## 前情提要

前两天，看到一篇文章：《[gitconfig includeIf 管理多用户配置][]》，感觉对我来说非常有用，便在没有完全验证的情况下就把博主分享的配置复制到了 `~/.gitconfig` 中，而这其中有一条配置为 `git push.default`，博主的设置的是 `matching`，就是这一条配置埋下了隐患

## 来龙去脉

这个配置用了几天，没有感觉到什么异常，直到前天我在 feature 分支上 rebase 了最新的 develop 分支代码，force push 到远端分支时，发现了蹊跷：feature 推送到远端同名分支的同时，我本地的 develop 也推送到了远端的同名分支。但我当时没有细究，时间匆忙，便 reset 了回来。

后面在其他 repo 又出现了这个问题，而这次被推送的是 master 分支，这次我没有马虎，开始仔细排查问题，一开始以为是哪条配置项影响 rebase 命令的效果，但实际上并不是。多番尝试无果后，开始对照官网文档对 `~/.gitconfig` 中不确定的配置进行排查，运气不错，很快就找到了罪魁祸首：

```
[push]
	default = matching
```

`push.default` 的配置选项有五个：nothing, current, upstream, simple,matching。它们的作用分别为：

> - nothing: 直接 push 会出错，需要显式的指出推送的远程分支，例如:git push origin master；
> - current: 推送时只会推送当前所在的分支到远程同名分支，如果远程分支不存在相应的同名分支，则创建该分支；
> - upstream: 推送当前分支到它的 upstream 分支上，这个模式只适用于推送到与拉取数据相同的仓库(比如 central workflow)；
> - simple: 在中央仓库工作流程模式下，只能推送到与本地分支名一致的 upstream 分支中，如果推送的远程仓库和拉取数据的远程仓库不一致，那么该模式会像 current 模式一样进行操作。因为该选项对于新手来说是最安全的，所以在 git 2.0 中，simple 是 push.default 的默认值配置项(2.0 以前的默认配置项是 matching)；
> - matching: 推送本地和远程都存在的同名分支。

那么原因不用多说已经很清楚了，当 matching 碰到 force push 时简直就是灾难啊

## 简单总结

1. Force push 有风险，使用须谨慎
2. 修改配置前一定要仔细检查，搞清楚弄明白，否则可能会出现意想不到的问题

[gitconfig includeif 管理多用户配置]: https://einverne.github.io/post/2020/10/gitconfig-includeIf.html "gitconfig includeIf 管理多用户配置"
