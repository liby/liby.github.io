---
title: 在 macOS 中配置大小写敏感的 APFS 卷存储代码
slug: 2022-08-14-use-case-sensitive-apfs-volume
author: Bryan Lee
date: 2022-08-14
hero: ./images/hero.jpeg
excerpt: 因为不想被 block 住，完成 ticket 是首要的，所以没有深究这个报错，便选择了折中的解决方案。后续空闲下来，再看这个部分的代码，认为 `Object.assign(this, data);` 这个地方写的异常丑陋， `new Providers()` 的传值被暴力复制给了 `this`，完全失去了传参意义，且代码可维护性极差。
tags:
  - macOS
  - APFS
  - Case-sensitive
---

## 为什么要配置大小写敏感的 APFS 卷

macOS 的默认分区和卷都是不区分大小写的，而 Linux 系统一般是区分大小写的，我们一般发布、部署环境的 CI/CD 都是 Linux。这种差异可能会带来一些使用问题，比如：[一个小坑提醒：某个 Class 或某个 Trait 突然找不到][]。


## 解决方案

如果你的 macOS 是刚到手没多久的，那么直接重装，设置文件系统为大小写敏感就好了。但是如果你的 macOS 已经使用过一段时间，做了许多设置且存储了很多重要文件了，再重装就有些划不来。

但是 macOS 的 APFS 文件系统为我们提供了完美的解决方案：新加一个大小写敏感的 APFS 宗卷。关于 APFS 的介绍可以参考[官方说明][]，其中“容器”指的就是磁盘。意思就是对于内置磁盘，我们可以添加 APFS 宗卷，新增的 APFS 宗卷共享内置磁盘的剩余空间，与 Windows 的磁盘分区是不一样的，比分区简单快捷很多，同时还可以单独指定是否大小写敏感。再加上 Unix 能够任意挂载的特性，因此我只需创建一个新卷，将项目文件移动过去，随后将该卷挂载至原代码目录即可。

## 具体步骤：

### 创建大小写敏感的卷

1. 打开 Disk Utility，确保你的文件系统是 APFS；若是 HFS，则需要升级。

2. 点击顶部的 Partition 按钮

3. 点击 Add Volume 按钮

4. 设置一个卷宗名，然后 Format 选择 APFS (Case-sensitive)

5. 点击 Add 按钮即可


### 迁移数据并修改挂载点

一顿操作以后，新创建的宗卷应该已经挂载到 `/Volumes/<VOLUME-NAME>` 路径，接下来你可以使用 `mv` 命令，或是通过 Finder 窗口将原有代码文件移动到这个路径下。

因为系统默认会将所有宗卷挂载至 `/Volumes` 目录下，有的人可能更喜欢将代码文件夹放在 `$HOME` 目录下，比如我会习惯放在 `~/Code` 路径下，因此需要将新卷挂载到该目录。

再次打开 Disk Utility，在左侧列表右键单击新创建的卷，选择 Get Info。点击 File system UUID 一行，使用 Command + C 复制出来：

```
File system UUID : XXXXXXXX-ABCD-DCBA-1234-XXXXXXXXXXXX
```

接下来点击 **Unmount** 按钮卸载该卷。

打开终端，使用 `sudo vifs` 编辑 `/etc/fstab` 文件，输入以下内容并保存：

```
UUID=XXXXXXXX-ABCD-DCBA-1234-XXXXXXXXXXXX <MOUNT_POINT> apfs rw 0 2
```

请注意将 `<MOUNT_POINT>` 替换为挂载目录，例如 `/Users/user/Code`，此路径可以通过访问要挂载的目标目录输入 `pwd` 命令来获得。若该目录不存在，不要忘记创建它。

### 重新挂载

打开 Disk Utility，重新点击 **Mount** 按钮即挂载成功。

## 结语

### 参考：

[使用大小写敏感的 APFS 卷存储代码][]

[一个小坑提醒：某个 Class 或某个 Trait 突然找不到]: <https://learnku.com/articles/3782/a-pit-reminder-a-class-or-a-trait-suddenly-can-not-find> "一个小坑提醒：某个 Class 或某个 Trait 突然找不到"

[官方说明]: <https://support.apple.com/zh-cn/guide/system-information/sysp560a2952/mac> "在“系统信息”中查看您的 Mac 是否在 APFS 宗卷中共享空间"

[使用大小写敏感的 APFS 卷存储代码]: <https://wi1dcard.dev/posts/use-case-sensitive-apfs-volume/> "使用大小写敏感的 APFS 卷存储代码"