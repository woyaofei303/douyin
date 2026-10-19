# 05 接口与本地数据：一条推荐视频从哪里来

理解这条链路后，你就能区分“页面没显示数据”“请求参数不对”和“视频资源加载失败”，不再把它们统称为 Vue 出错。

## 第一次请求是谁发起的

首页默认显示推荐分栏。[Slide4.vue](../../src/pages/home/slide/Slide4.vue) 并不自己获取数据，而是把 `recommendedVideo` 函数作为 `api` 属性传给 [SlideList.vue](../../src/pages/home/slide/SlideList.vue)。传函数相当于告诉列表“需要数据时调用它”。

`SlideList` 将当前列表、激活状态和事件处理函数交给 `SlideVerticalInfinite`。后者监听 `active`，在激活且列表为空时发出 `refresh`。父组件用 `@refresh="() => getData(true)"` 接住，才进入实际加载。

不能简单写成“`SlideList.onMounted` 请求数据”：它的挂载回调主要注册事件，首次加载来自子组件的激活监听。`getData()` 初始状态下不传 `true` 还会遇到 `totalSize === list.length` 的提前返回，所以这个参数有实际作用。

## 把请求完整跟一遍

```text
SlideVerticalInfinite 发现当前激活且无数据
  → emit('refresh')
  → SlideList.getData(true)
  → recommendedVideo({ start: 0, pageSize: 10 })
  → request({ url: '/video/recommended', method: 'get', params })
  → axiosInstance
  → Mock 的 onGet(/video\/recommended/)
  → allRecommendVideos.slice(0, 10)
  → request 返回 data
  → SlideList 将结果写入 state.list
  → 子组件监听 list 变化并插入视频条目
```

依次打开 [api/videos.ts](../../src/api/videos.ts)、[utils/request.ts](../../src/utils/request.ts)、[mock/index.ts](../../src/mock/index.ts)，不要一次读完所有接口。

`Mock` 的意思是“模拟”。这里模拟的是 Axios 实例的响应，没有为 `/video/recommended` 单独启动一个真正的业务服务器。因此浏览器 Network 面板可能看不到该 URL 发出实际网络请求；调试时可以在 API 函数或 Mock 回调加断点。

相对地，Mock 中调用原生 `fetch` 读取静态 JSON，以及 `<video>` 加载外部地址，仍会发生真正的网络请求。

## 列表的数据实际有两批

第一批是源码直接引入的 [posts6.json](../../src/assets/data/posts6.json)，本次读取确认有 6 条。Mock 给它们增加 `type: 'recommend-video'`。

第二批由 `startMock()` 安排在约一秒后开始加载：`fetchData()` 调用 `_fetch(BASE_URL + '/data/videos.md')`，获取更多记录，并按 `author_user_id` 匹配用户的 `uid`，补上 `author` 对象，最后拼接进推荐数组。

一秒是开始执行回调的延迟，不是所有数据必定完成加载的时间。如果用户资料还没准备好，`fetchData()` 还可能再次调用 `store.init()`。

本次本地文件计数：

```text
src/assets/data/posts6.json   6 条初始视频
public/data/videos.json      832 条追加视频
public/data/users.json       13 条用户记录
```

因此按当前拼接逻辑会有 838 条数组记录；这里没有按视频 ID 去重统计。Mock 返回的 `total` 却固定写为 844。这个差异会影响“是否加载完”的判断，是源码现状，不要把 844 当成实测数据条数。

## 为什么请求 `.md`，实际却读到 JSON

[utils/index.tsx](../../src/utils/index.tsx) 的 `_fetch` 做了一层转换：

- 开发环境或非 Gitee Pages 环境：把 URL 中的 `.md` 换成 `.json`，再使用原生 `fetch`。
- Gitee Pages 生产分支：读取 `.md` 文件内容，再用压缩包读取库提取内部 JSON。

所以 `public/data/*.md` 不能仅凭后缀当作学习文档。平时调试直接找相应 `.json` 更方便。这个兼容分支与 Vue 响应式没有直接关系，第一轮知道它在做转换即可。

## 看懂分页的三个值

推荐列表使用 `start` 与 `pageSize`：

- `start`：从第几个数组元素开始取，下标从 0 开始。
- `pageSize`：这次最多取多少条，列表中默认是 10。
- `totalSize`：接口报告的总量，用来判断是否继续请求。

普通追加请求用当前 `state.list.length` 作为 `start`。例如首批只返回 6 条，则下一次从 6 开始，而不是想当然地从 10 开始。`slice(6, 16)` 最多取下标 6 到 15 的记录。

Mock 中其他部分接口使用 `pageNo * pageSize` 计算位置，不能把它们与推荐接口混为一谈。源码里仍有关于 `pageNo` 漏数据的旧 TODO，但当前推荐接口已用 `start`；解释行为应看当前执行代码。

## 一条记录里先看哪些字段

不需要背完整 JSON。先在 `posts6.json` 中查以下字段，然后找谁读取了它：

```text
aweme_id                  视频标识，评论请求会使用
desc                      描述文字
author_user_id            作者标识，用于匹配用户
author.nickname           作者昵称
video.play_addr.url_list  视频播放地址列表
video.cover.url_list      视频封面地址列表
statistics.digg_count     点赞数量
statistics.comment_count  评论数量
```

这是静态对象之间的关联，不是数据库表关系。标识通常以字符串保留，分析时不要为了“看起来像数字”随意转换。

## 请求成功、失败和刷新时，状态怎样变

`SlideList.getData()` 的正常路径：设置共享 `loading = true`，等待 `props.api()`，然后设回 `false`。成功时写入 `totalSize`，普通加载追加数组，刷新则先清空再拼接响应记录。

若 API 返回 `success: false`，该函数不替换已有列表，因此原有内容还在；初次加载没有旧内容时则仍为空。若传入的 API 意外直接抛异常，该函数没有 `try/finally`，可能跳过关闭加载状态。项目预期的 API 通常会经 `request()` 捕获部分异常，但这不是任意函数都具备的保证。

还要注意 [request.ts](../../src/utils/request.ts) 的两层处理：响应拦截器常把错误转换为普通对象返回，外层 `request()` 又在 `.then()` 中解构 `data` 并固定返回 `success: true`。因此某些失败会被再次包装成成功，页面可能拿到不符合预期的数据形状。

例如响应拦截器对 404 返回 `success: false` 与空数组；由于这个对象是正常返回，后续 `.then()` 仍可能把空数组包装成 `success: true`。这一点是按代码推导，本次未运行故障注入。它说明不能仅凭 `if (res.success)` 就认定整个封装已经正确处理业务错误。

## 不改源码也能做的观察

启动后打开 Network，过滤 `videos.json`、`users.json`；在 Sources 对 `SlideList.getData` 和推荐 Mock 回调下断点，分别查看 `start`、返回数组长度、`state.list.length`。再把视频媒体请求单独筛出来，区分“列表数据来了”和“媒体能播放”。

下一篇：[06 首页视频与滑动](06-video-and-sliding.md)。
