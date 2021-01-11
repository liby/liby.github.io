---
title: 将 Homebrew 切换为 USTC Mirror
slug: 2020-05-30-switch-homebrew-to-ustc-mirror
author: Bryan Lee
date: 2020-05-30
hero: ./images/hero.jpeg
excerpt: 由于国内网络原因，有可能会使 Homebrew 在更新和安装软件时速度缓慢，所以无责任推荐使用国内镜像源。还顺手写了一个替换脚本，有需要的可以直接到页面的最下方自取。
tags:
  - Homebrew
  - USTC Mirror
  - Shell
---

## 前言

> Homebrew 是一款自由及开放源代码的软件包管理系统，用以简化 macOS 系统上的软件安装过程，最初由马克斯·霍威尔写成。因其可扩展性得到了一致好评，而在Ruby on Rails 社区广为人知。 Homebrew 使用 GitHub，通过用户的贡献扩大对软件包的支持。

如下列表格所示，Homebrew 主要由 [brew][]、[homebrew-bottles][]、[homebrew-cask][]、[homebrew-core][] 这 4 个部分组成。

| 名称 | 说明 |
| :----: | :----: |
| brew | Homebrew 的源代码仓库 |
| homebrew-bottles | Homebrew 预编译二进制软件包 |
| homebrew-cask |	提供 macOS 应用和大型二进制文件 |
| homebrew-core |	Homebrew 核心软件仓库 |

## 原因

由于国内网络原因，有可能会使 Homebrew 在更新和安装软件时速度缓慢，所以无责任推荐使用国内镜像源。还顺手写了一个替换脚本，有需要的可以直接到页面的最下方自取。

实现原理非常简单：分别将组成 Homebrew 的 4 个关键部分在用户本地所关联的远程仓库的 URL 更改为国内镜像源的 URL 即可。

## 其他

如果你觉得使用中有任何问题，或者因为某些原因想要恢复到替换之前的状态，那么我也准备了一个还原脚本。

**注意**：因为个人喜好原因，脚本中使用了 [USTC Mirror][] 的地址，你可以自行选择是否需要将其替换为其他源，这里不做限制。

<details>
  <summary>
    <strong>脚本文件</strong>
  </summary>

  [替换][]

  - - -

  [还原][]
</details>

[brew]: <https://github.com/Homebrew/brew> "Homebrew repository"

[homebrew-bottles]: <https://github.com/Homebrew/homebrew-bottles> "homebrew-bottles repository"

[homebrew-cask]: <https://github.com/Homebrew/homebrew-cask> "homebrew-cask repository"

[homebrew-core]: <https://github.com/Homebrew/homebrew-core> "homebrew-core repository"

[USTC Mirror]: <http://mirrors.ustc.edu.cn/> "中国科学技术大学镜像源"

[替换]: <https://gist.githubusercontent.com/liby/3d5091bb811b2d3f537bf64b6fc2b19f/raw/replace.sh> "替换脚本"

[还原]: <https://gist.githubusercontent.com/liby/3d5091bb811b2d3f537bf64b6fc2b19f/raw/restore.sh> "还原脚本"