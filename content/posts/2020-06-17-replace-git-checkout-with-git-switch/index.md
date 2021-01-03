---
title: 使用 `git switch` 替代 `git checkout`
slug: replace-git-checkout-with-git-switch
author: Bryan Lee
date: 2020-06-17
hero: ./images/hero.jpeg
excerpt: 在这之前，`git checkout` 承担了两个方向完全不同的功能，一方面被用来切换分支，另一方面又用它恢复文件，对于新手来说，实在令人疑惑，产生了心智负担。
tags:
  - Git
---

## 从前

刚接触 `git checkout` 命令的时候，经常用它来切换代码分支，当然也可以用来切换到指定的 `commit`。

```git
// 切换到 `develop` 分支。
git checkout develop

// 创建一个新分支，并切换到这个分支
git checkout -b <分支名>

// 切换到指定 commit
git checkout <commit hash>
```
此外，还有一个功能，但我用的比较少，它可以从历史提交记录、分支记录恢复指定文件。

```git
git checkout [<options>] [<branch>] -- <file>
```

在命令敲下 `git checkout` 的时候，我时常会想，明明是切换分支，为什么要叫「签出」呢，对于一个强迫症来说，这件事没少让我纠结。

## 后来

Git 在 2.23 版本中，引入了两个新命令 `git switch` 和 `git restore`，用以替代现在的 `git checkout`。

在这之前，`git checkout` 承担了两个方向完全不同的功能，一方面被用来切换分支，另一方面又用它恢复文件，对于新手来说，实在令人疑惑，产生了心智负担。

相比之下，新命令分工明确，职责清晰。

## 小记

最近因为疫情反弹的原因，开始了为期一周的 WFH，整个人状态非常差，浑浑噩噩；这篇博客也拖欠了非常久，完全没有思路。
现在自己 review 一遍，简直没眼看。后续一定会重写这篇，话起来还有 365 天就是我的生日了，回首上一次过生日，仿佛就在今天。