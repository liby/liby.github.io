---
title: Source 命令踩坑小记
tags:
  - Oh My ZSH
  - Powerlevel10k
  - zsh-autosuggestions
abbrlink: bb2271d1
date: 2020-05-27 00:45:07
---

## 前情介绍

这两天偶然发现了一个问题，在 [iTerm2][] + [Oh My ZSH][] 环境下，运行 `source ~/.zshrc` 命令之后会导致 [zsh-autosuggestions][] 插件出现一些肉眼可见的问题，按照 zsh-autosuggestions 插件的[文档描述][]：
> As you type commands, you will see a completion offered after the cursor in a muted gray color.

即“当你键入命令时，将会看到光标后提供的补全提示显示为静默的灰色”，不过当我运行 `source ~/.zshrc` 以后，光标后提供的补全提示却显示为白色，与光标前已经输入的命令部分相同，让人难以区分。

## 排查过程

发现问题后，我第一时间去到 zsh-autosuggestions 的 repo，查找相关 issue，却没有任何收获（实际上有一个关于此问题的 [issue#516][]，但是我没找对关键词）。基于此，我便整理了一下，自己提了一个 [issue#538][]。

zsh-autosuggestions 的作者 [ericfreese][] 回复我说：有人提了一个相同的 issue，可以看一下。实际上，ericfreese 本人在里面的回复也比较简短：
> I don’t know what exactly is going on here but it’s generally not a good idea to source your .zshrc additional times. If you’ve made changes to the file, try exec zsh instead.

大意是说 ericfreese 自己也不清楚这是什么原因造成的，但他认为如果想要对 `.zshrc` 文件的修改生效，那么最好不要使用 `source ~/.zshrc` 命令， `exec zsh` 命令是更好的选择。

**注意**：在我这里的情况是，运行 `exec zsh` 后 zsh-autosuggestions 插件确实可以正常工作，没有任何显示上的问题；不过只要后续运行了 `source ~/.zshrc` 命令，依旧会让 zsh-autosuggestions 的功能出现问题：光标后提供的补全提示显示为白色。

与此同时我也通过这个 issue 发现了一个共通点，那就是遇到相同问题的我们都不约而同地使用了 [Powerlevel10k][]，一个 zsh 主题；我便试着将它禁用掉，在这之后尝试运行 `source ~/.zshrc` 命令，结果就是无论运行多少次，光标后提供的补全提示皆正常显示为静默的灰色，即 zsh-autosuggestion 插件正常工作，没有出现显示上的问题。

至此，情况已经非常清晰明了，在启用 Powerlevel10k 的情况下，运行 `source ~/.zshrc` 命令会让 zsh-autosuggestion 插件出现问题：光标后提供的补全提示显示为白色，而不是[默认设置][]的颜色——灰色。

因此，我在 issue 中 @ 了 Powerlevel10k 的作者 [romkatv][]，并尝试向他阐述整件事情的经过与我的观点，我们的讨论内容很简单，不过因为意见相左，整整一个页面的楼层都是我们争论的内容，如果你有兴趣的话，可以在这个 [issue#538][] 中看到全部的内容。

TL;DR. 我相信大部分人都没有这个耐心看完，那我尽可能地长话短说：

  1. romkatv：如果想要重新加载 zsh， `exec zsh` 命令足以，且字数更少。

     我：比较想知道为什么 `source ~/.zshrc` 与 Powerlevel10k 不兼容。

  2. romkatv： `source ~/.zshrc` 命令的原理就存在缺陷，与其问它为什么会出现问题，不如问问自己为什么非要用它。

     我：可是通过控制变量法可以很容易地看出是 Powerlevel10k 引起的冲突，不启用 Powerlevel10k 的话，运行多少次 `source ~/.zshrc` 都不会让 zsh-autosuggestions 插件出问题。

  3. romkatv：你错了，类比一下：「朝自己的脚开枪会很痛，解决方案很简单：不要那样做」，没有什么理由非要使用 `source ~/.zshrc` 不可，所以不用是最好的。

     我：我们不要纠结 `source ~/.zshrc` 有多糟糕，会造成哪些隐患，单就 zsh-autosuggestions 插件出现的问题来看，Powerlevel10k 的原因多一些，将这个问题简单粗暴地归咎于 `source ~/.zshrc` 是不负责任的。

  4. romkatv： `source ~/.zshrc` 就不应该用于重载 zsh，不要对它抱有任何期望，它的行为不可捉摸，发生什么错误都有可能，因此使用 `exec zsh` 才是正确的。

     我：那我明白你的意思了，你认为纠结 `source ~/.zshrc` 为什么会出问题没有意义，不如一开始就不去使用它。

  5. romkatv：没错，或许有人会好奇为什么 `source ~/.zshrc` 为什么会出现这样或那样的问题，并尝试去修复此类问题或减免问题发生的几率；但实际上这样做是在浪费时间，是毫无意义的行为。

## 做个总结

嚯，好像即便是简单写个概要也占了极大篇读；实际上我与 romkatv 的观点差异是根本上的认知不同：
  - 我：不启用 Powerlevel10k， `source ~/.zshrc` 命令并没有让 zsh-autosuggestions 插件出现问题，一旦启用 Powerlevel10k，再运行 `source ~/.zshrc` 的话 zsh-autosuggestions 插件就出问题了，这之间到底发生了什么？

  - romkatv： 如果想要重载 zsh， `exec zsh` 是最优选，`source ~/.zshrc` 隐患较多，是个定时炸弹，极不推荐；至于纠结它为什么会跟 Powerlevel10k 产生冲突？答案很简单：不去使用 `source ~/.zshrc` 就永远也没有这个问题。

[Oh My ZSH]: <https://github.com/ohmyzsh/ohmyzsh> "Oh My ZSH 的 repository"

[Powerlevel10k]: <https://github.com/romkatv/powerlevel10k> "Powerlevel10k 的 repository"

[ericfreese]: <https://github.com/ericfreese> "ericfreese 的 GitHub 主页"

[iTerm2]: <https://github.com/gnachman/iTerm2> "iTerm2 的 repository"

[issue#516]: <https://github.com/zsh-users/zsh-autosuggestions/issues/516> "ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE changes after source"

[issue#538]: <https://github.com/zsh-users/zsh-autosuggestions/issues/538> "The color of the automatic prompt is incorrect"

[romkatv]: <https://github.com/romkatv> "romkatv 的 GitHub 主页"

[zsh-autosuggestions]: <https://github.com/zsh-users/zsh-autosuggestions> "zsh-autosuggestions 的 repository"

[默认设置]: <https://github.com/zsh-users/zsh-autosuggestions/blob/0d3bbaf8e6eee660190a4bb1158a60ea6d39374c/src/config.zsh#L10> "高亮显示建议时使用的默认颜色在这里定义"

[文档描述]: <https://github.com/zsh-users/zsh-autosuggestions#usage> "zsh-autosuggestions 功能说明部分的文档"