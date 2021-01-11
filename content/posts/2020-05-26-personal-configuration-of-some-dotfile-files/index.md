---
title: 关于我个人的一些 `dotfile` 文件的配置
slug: 2020-05-26-personal-configuration-of-some-dotfile-files
author: Bryan Lee
date: 2020-05-26
hero: ./images/hero.jpeg
excerpt: 我个人喜欢将配置项尽可能地归类放置，完全是出于个人喜好，再譬如一些配置项出于个人习惯就没有按照上面的规则进行放置，比如 `[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh` 这行代码，所以可以作为参考，但并不代表说我的配置风格就是最好的、完美的。
tags:
  - Oh My ZSH
  - Powerlevel10k
  - Vim
---

<details>
  <summary>
    <strong>文件汇总</strong>
  </summary>

  [.vimrc][]

  - - -

  [.zshrc][]
</details>

## 有几个需要注意的地方

1. 如果想要启用 [Powerlevel10k][] 的 [instant prompt][] 功能，那么必须将下列配置项放置在 `~/.zshrc` 文件顶部。

    ```sh
    # Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
    # Initialization code that may require console input (password prompts, [y/n]
    # confirmations, etc.) must go above this block; everything else may go below.
    if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
      source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
    fi
    ```

2. 需要 `export` 相关的设置尽量放在其他配置项之前，避免出现后续配置项需要用到导出的变量却发现找不到的情况。

3. `source` 有关的配置项在我看来基本是引入一些其他文件中（比如 [autojump][] 这个插件的加载）的配置，所以习惯将它放在 `plugins` 配置项的后面。

4. `alias` 相关的配置最好放到最后，比如 `alias ll='ls -alFh'` 如果放在 `source $ZSH/oh-my-zsh.sh` 之前，那么就会被覆盖。

5. 我个人喜欢将配置项尽可能地归类放置，完全是出于个人喜好，再譬如一些配置项出于个人习惯就没有按照上面的规则进行放置，比如 `[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh` 这行代码，所以可以作为参考，但并不代表说我的配置风格就是最好的、完美的。

6. Vim 的配置相较来说比较简单，我认为除了以下配置外其他配置项都不是必需的，根据自己需求和喜好增删就可以了：

    ```vim
    " 显示行号
    set number
    " 语法高亮显示
    syntax on
    " 启用自动对齐功能，把上一行的对齐格式应用到下一行
    set autoindent
    " 设置显示制表符的空格字符个数,改进 tab 缩进值，默认为 8，现改为 2
    set tabstop=2
    " 显示匹配的括号
    set showmatch
    ```

7. 下面的配置是为了在 [iTerm2][] 中让光标在 insert 模式和 normal 模式下显示不同的样式，可以根据个人需求自行选择是否保留

    ```vim
    " Change cursor shape between insert and normal mode in iTerm2.app
    if $TERM_PROGRAM =~ "iTerm"
        let &t_SI = "\<Esc>]50;CursorShape=1\x7" " Vertical bar in insert mode
        let &t_EI = "\<Esc>]50;CursorShape=0\x7" " Block in normal mode
    endif
    ```


[.vimrc]: <https://gist.githubusercontent.com/liby/772fe930e54f30ae82821d8be133facb/raw/.vimrc> "我的 Vim 配置"

[.zshrc]: <https://gist.githubusercontent.com/liby/772fe930e54f30ae82821d8be133facb/raw/.zshrc> "我的 Oh My ZSH 配置"

[Powerlevel10k]: <https://github.com/romkatv/powerlevel10k> "Powerlevel10k 的 repository"

[autojump]: <https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/autojump> "autojump 的 repository"

[iTerm2]: <https://github.com/gnachman/iTerm2> "iTerm2 的 repository"

[instant prompt]: <https://github.com/romkatv/powerlevel10k#how-do-i-enable-instant-prompt> "有关 instant prompt 的文档说明"
