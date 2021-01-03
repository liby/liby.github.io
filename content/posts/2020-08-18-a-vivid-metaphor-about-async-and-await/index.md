---
title: 一个关于 Async/await 的生动比喻
slug: a-vivid-metaphor-about-async-and-await
author: Bryan Lee
date: 2020-08-18
excerpt: 这样的结果你只能喝到白开水，但是加上 await 就不同了
hero: ./images/hero.jpeg
---

## 用煮面和吃面来做个类比

```js
function 煮面() {
  水 = 加水()
  if (面 === false) {
    // 异步操作
    面 = 去超市买面();
  }

  阳春面 = 开火(水，面);
  吃面(阳春面);
}
```

## 这样的结果你只能喝到白开水，但是加上 await 就不同了

```js
async function 煮面() {
  水=加水();
  if (面 === false ) {
    // 异步操作
    面 = await 去超市买面();
  }
  阳春面 = 开火(水，面);
  吃面(阳春面);
}
```

用了 `await` 就可以**等买到面**以后再执行后续操作。
