# 06 首页视频与滑动：界面为什么能跟着手指走

这一篇属于进阶阅读。先掌握属性、事件、响应式和请求流程，再看这里。目标不是马上重写一个播放器，而是能指出“哪层负责数据，哪层负责位置，哪层负责播放”。

## 首页同时有三种位置

[home/index.vue](../../src/pages/home/index.vue) 不是一张只有视频的页面，它包含多层滑动：

- `baseIndex`：外层横向区域，`0` 是侧边栏，`1` 是中间主内容，`2` 是作者面板。
- `navIndex`：主内容里的横向分栏；推荐对应 `4`，默认也为 `4`。
- `SlideList.state.index`：某个竖向视频列表中当前视频的下标，初始为 `0`。

因此 `baseIndex = 1`、`navIndex = 4`、视频索引为 `0`，表示“主内容 → 推荐分栏 → 第一条视频”。这三个数字描述不同层级，不能相互替换。

首页传给推荐分栏的 `active` 是 `state.navIndex === 4 && state.baseIndex === 1`。这个属性表示分栏当前是否应当活跃，和“组件是否已经创建”不是同一回事。

```text
Home
└─ SlideHorizontal：侧边栏 / 主内容 / 作者面板
   └─ 主内容中的 SlideHorizontal：多个内容分栏
      └─ Slide4：推荐分栏，选择 recommendedVideo 接口
         └─ SlideList：数据数组、请求、当前视频索引
            └─ SlideVerticalInfinite：手势、位置、附近条目
               └─ slideItemRender：按记录类型选择组件
                  └─ BaseVideo：video 元素与播放状态
```

## 手指从按下到松开，谁做什么

[SlideVerticalInfinite.vue](../../src/components/slide/SlideVerticalInfinite.vue) 接收 `pointerdown`、`pointermove`、`pointerup`，再调用 [utils/slide.ts](../../src/utils/slide.ts) 的公共函数。

1. `slideTouchStart` 记录起始坐标和时间，把 `isDown` 设为 `true`。
2. `slideTouchMove` 计算移动距离；`canSlide` 判断是横滑还是竖滑，避免多层容器同时抢同一次手势。
3. 确认可滑动后，通过 CSS `translate3d` 改变容器位置，让内容跟着手指移动。
4. `slideTouchEnd` 根据边界、距离、耗时决定是否增减 `localIndex`。
5. `slideReset` 将容器对齐到目标位置，清空手势状态，并发出 `update:index`，让父组件同步当前索引。

举例：在第二条视频上向上滑，当前视频索引是 1。手指移动时只是容器位置改变；松开且满足换页条件后，索引才变成 2，随后容器对齐到第三条视频。

当前实现包含具体阈值：方向判断需超过 `judgeValue`，竖向无限列表中它是 20；结束时小于 20 像素的位移被视为不足，超过容器尺寸三分之一的位移直接满足距离要求，中间区间还要看是否小于 150 毫秒。这是当前算法的选择，不是 Vue 内置规则。

## 为什么列表很长，页面上却只有附近几条

“虚拟列表”指只为当前附近的数据创建界面节点，而不是把所有数据同时放进 DOM。DOM 是浏览器中的页面元素树，视频元素尤其不适合无限堆积。

`SlideVerticalInfinite` 的 `virtualTotal` 默认是 5。`insertContent()` 根据当前索引选取附近的一段记录，`getInsEl()` 把它们渲染出来。

假设已经有 20 条数据，当前索引为 10，初始窗口会覆盖下标 8、9、10、11、12。向下一条滑到 11 时，窗口向后移动，组件在尾部补入需要的条目，并卸载头部多余的条目。到首尾时则按现有数据调整范围。

“通常维护附近 5 个条目”不等于“总共只保存 5 条数据”。父组件的 `state.list` 仍会随着加载增加；少建 DOM 主要减少页面与媒体元素负担，不自动保证所有内存始终固定。

接近已加载列表尾部时，滑动组件发出 `loadMore`，父组件请求并追加记录。所以“无限滑动”表示可以继续加载的交互形式，不代表本地数据真的无限。

## 这里为什么没有普通的 `v-for`

[utils/index.tsx](../../src/utils/index.tsx) 的 `slideItemRender()` 返回一个渲染函数，针对普通视频创建 `BaseVideo`，并传入：

```text
item                    这一条视频数据
isPlay                  创建时是否播放
position.uniqueId       属于哪个列表，例如 home
position.index          属于这个列表的第几条
```

滑动组件自己创建容器、调用渲染并记录卸载方法。开发分支使用 `createApp`，生产分支使用 Vue 的 `render`。这也是开发与构建后行为可能不同的一个原因。

这是为了配合手动维护滑动窗口的项目实现。初学普通列表时先用 `v-for` 理解数据驱动界面，无需照搬这一套手动挂载流程。它还涉及清理、上下文和生命周期，不能只复制“创建”部分。

## 切换后，播放器怎样收到通知

[bus.ts](../../src/utils/bus.ts) 提供事件总线，即多个组件共用的一组事件订阅与通知函数：`on` 注册，`emit` 通知，`off` 取消。

当 `localIndex` 改变时，滑动组件：

1. 发出 `CURRENT_ITEM`，让首页更新当前视频及作者信息。
2. 发出 `SINGLE_CLICK_BROADCAST`，类型为 `ITEM_PLAY`，携带新索引和列表标识。
3. 延迟 200 毫秒给旧索引发送 `ITEM_STOP`。

[BaseVideo.vue](../../src/components/slide/BaseVideo.vue) 接到通知后，先比较自己的 `position.uniqueId` 和 `position.index`，匹配才处理。否则页面里多个播放器会一起响应同一条消息。

`ITEM_PLAY` 将播放时间归零后调用 `videoEl.play()`；`ITEM_STOP` 归零后暂停。这里旧条目暂停有延迟，不应写成“切换瞬间绝不可能有任何播放重叠”。`play()` 的成功还受媒体资源和浏览器播放策略影响，本次没有做真机验证。

第一次播放还可由 `isPlay` 控制，以减少只靠事件启动带来的延迟。初始静音状态从 `main.ts` 设置的 `window.isMuted` 传入。

## 点一下视频和点一下评论，走不同链路

单击视频的链路：`v-love` 指令区分点击与移动，发出 `SINGLE_CLICK`；`SlideList` 核对当前列表后广播 `ITEM_TOGGLE`；对应 `BaseVideo` 才切换播放或暂停。这个指令还处理双击爱心效果，但不能仅凭爱心动画推断点赞已提交服务器。

评论入口在 [ItemToolbar.vue](../../src/components/slide/ItemToolbar.vue)：

```text
点击评论
  → OPEN_COMMENTS，附视频 aweme_id
  → Home 打开 Comment，并进入其全屏界面状态
  → BaseVideo 调整视频显示区域
  → Comment 监听 modelValue 变为 true
  → videoComments({ id: videoId })
  → Mock 读取本地评论记录
```

这里的“全屏”是项目事件和界面状态，不等于调用了浏览器全屏 API。打开评论主要会调整视频区域，不应直接理解成播放器已暂停。

[Comment.vue](../../src/components/Comment.vue) 的 `send()` 把新评论插到当前数组，并清空输入框，没有发出保存评论的接口请求。关闭时数组被清空，下次打开再读取模拟数据。

## 样式里有一个容易误读的单位

[assets/styles/tailwind.css](../../src/assets/styles/tailwind.css) 保留了 `1px` 的根字号，因此运行时参数里的 `14rem` 仍按 14 像素计算。模板静态尺寸使用等值原子类，例如 `text-[14px]`；Tailwind 间距基准单独设为 `4px`，所以 `w-4` 是 16 像素。

`App.vue` 还用 `window.innerHeight * 0.01` 写入 `--vh`，组件通过它计算可用高度。窗口尺寸改变时，代码会修改 `location.href` 回到根路径，再重算高度，所以调整开发者工具宽高可能导致页面重新导航。这是源码行为，不是 Vue 必然会在 resize 时重载。

下一篇：[07 练习与易错点](07-practice-and-pitfalls.md)。
