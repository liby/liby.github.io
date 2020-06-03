---
title: 记一次 new Array() 时错误传递参数导致 TypeScript 报错的来龙去脉
tags:
  - Array
  - TypeScript
  - class
abbrlink: 5707b20e
date: 2020-05-25 00:54:18
---

## 起因

在写业务代码时，leader 打算把 AngularJS 代码中的众多 `$provide.value` 抽离出来，放到类似 `common` 等文件夹下并 `export`，在需要用到的文件中再单独 `import` 进来。

我负责重构的这个 `$provide.value` 是一个对象数组，并且需要在 Array 基类的基础上为它添加一个方法。

最终实现代码如下：

```ts
interface IProvider {
  type: string;
  name: string;
}

class Providers extends Array<IProvider> {
  constructor(data: IProvider[]) {
    super();
    Object.assign(this, data);
  }

  $getProvider(type: string): IProvider | undefined {
    return this.find((item) => item.type === type);
  }
}

export const demo = new Providers(
  [
    {
      type: "temp",
      name: "Provider1"
    },
    {
      type: "test",
      name: "Provider2"
    }
  ]
);
```

重点来说说这个部分的代码：

```ts
  constructor(data: IProvider[]) {
    super();
    Object.assign(this, data);
  }
```

这里纯粹是无奈妥协之举，不写的话，发现 `new Providers()` 的时候直接传入**一整个对象数组的数据**，将得到如下报错：

{% asset_img 01.png TypeScript 的 报错信息 %}


因为不想被 block 住，完成 ticket 是首要的，所以没有深究这个报错，便选择了折中的解决方案。后续空闲下来，再看这个部分的代码，认为 `Object.assign(this, data);` 这个地方写的异常丑陋， `new Providers()` 的传值被暴力复制给了 `this`，完全失去了传参意义，且代码可维护性极差。

## 过程

开始我怀疑数组定义写错了，是不是应该写成 `Array<IProvider[]>`，这样 `new Providers()` 的时候传一个数组进去就没有任何问题，不过这样做的得到的是一个二维数组，与预想的数据结构有所出入。

之后跟 leader 讨论了一下，猜测是不是 TypeScript 对这部分的泛型定义有问题，遂开始查阅 MDN 的文档，当即发现 `new Array()` 的时候直接传入**一整个数组的数据**作为参数与我预想的结果确实有所出入：

  - {% asset_img 02.png New Array() 所接收的参数说明 %}

  - 比如
    ```js
    // 想得到数组 `[{name: demo}, {name: test}]`
    // 错误，返回的是 [[{name: demo}, {name: test}]]
    new Array([{name: "demo"}, {name: "test"}])

    // 正确
    new Array(...[{name: "demo"}, {name: "test"}])
    ```

其实，在 VSCode 中，`Command + 光标` 点击 `new Providers` 也能看到该方法的类型定义：

{% asset_img 03.png Array constructor 的类型定义 %}

此外，在 [MDN/Array() constructor][] 中也有相同的定义，所以不准确的概括下：如果没有定义 `constructor()` 所接收的参数类型，那么 `new <T>()` 会默认接收 `arrayLength: number` 或 `...items: T[]` 这两种参数类型。

既然知道了原因那么，问题就迎刃而解了，不啰嗦上代码：

```ts
interface IProvider {
  type: string;
  name: string;
}

class Providers extends Array<IProvider> {
  $getProvider(type: string): IProvider | undefined {
    return this.find((item) => item.type === type);
  }
}

export const demo = new Providers(
  ...[
    {
      type: "temp",
      name: "Provider1"
    },
    {
      type: "test",
      name: "Provider2"
    }
  ]
);
```

## 总结

**Class 写的太少，TypeScript 用的不熟。**

[MDN/Array() constructor]: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array> "MDN 中有关 Array() constructor 的说明"