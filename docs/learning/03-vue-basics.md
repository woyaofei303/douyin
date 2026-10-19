# 03 用小组件认识 Vue 3

先把目标缩小为“点一下勾选框，页面显示已同意”。理解这件事，就能逐步读懂首页里更大的状态变化。不要先背完整的 Vue API。

## `.vue` 文件的三部分

以 [Check.vue](../../src/components/Check.vue) 为例：`template` 描述界面，`script` 描述数据和行为，`style` 描述样式。组件可以理解为一个有输入、内部行为和输出的小界面单元。

项目中有两种合法的 Vue 3 写法：

- `Check.vue`、`BaseFooter.vue` 使用选项式 API：数据放 `data()`，行为放 `methods`，通过 `this` 访问。
- `Slide4.vue`、`SlideList.vue` 使用组合式 API：在 `<script setup>` 中声明状态和函数，模板直接使用这些名字。

看到 `data()` 不代表这就是 Vue 2 项目。先学会读两种形式，自己练习时优先用 `<script setup>`，不用为了学习把旧文件全部重写。

## 响应式：改数据，界面跟着变化

下面是独立教学示例，没有写入业务源码。它复用仓库现有的 `Check` 与 `BaseButton`，便于你对照真实组件理解：

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import Check from '@/components/Check.vue'
import BaseButton from '@/components/BaseButton.vue'

const agreed = ref(false)
const count = ref(0)
const status = computed(() => agreed.value ? '已同意' : '未同意')

function record() {
  if (!agreed.value) return
  count.value++
}
</script>

<template>
  <Check v-model="agreed" />
  <p>{{ status }}，已记录 {{ count }} 次</p>
  <BaseButton :disabled="!agreed" @click="record">记录一次</BaseButton>
</template>
```

`ref(false)` 创建一个 Vue 可以追踪的值。函数里用 `.value` 读写；这里的模板顶层引用会自动解包，所以写 `{{ count }}`。状态更新会安排界面更新，而不是要求你自己找到 `<p>` 再改文字。可对照 [Vue 官方响应式基础](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals)。

项目还使用 `reactive({ ... })` 管理一组属性，例如 `SlideList.vue` 的 `state.list`、`state.index`。它直接读写对象属性，不写 `state.value`。第一轮先记住这个区别，不要把响应式对象中的基本类型值随意解构出来再期待它继续同步。

## 父组件传值，子组件发事件

真正的调用例子在 [PasswordLogin.vue](../../src/pages/login/PasswordLogin.vue)：

```vue
<Check v-model="isAgree" />
```

读 [Check.vue](../../src/components/Check.vue) 的 `props` 和 `change()`，可以把这段缩写拆开：

```vue
<Check
  :modelValue="isAgree"
  @update:modelValue="isAgree = $event"
/>
```

一次点击的过程是：

1. 登录页持有 `isAgree`，初始为 `false`，并把它传给子组件的 `modelValue`。
2. `Check` 根据 `modelValue` 决定显示哪张勾选图片。
3. 用户点击，`change()` 发出 `update:modelValue`，携带 `!this.modelValue`。
4. 父组件接收新值并更新 `isAgree`，再把新值传回来。

因此，`v-model` 不表示子组件可以随意改父组件变量，而是把“传入属性 + 更新事件”写短了。`Check` 另外还发送 `change` 事件，它和 `update:modelValue` 是两个不同事件。可对照 [Vue 官方组件 v-model](https://cn.vuejs.org/guide/components/v-model)。

首页的 `v-model:index="state.navIndex"` 道理相同，只是属性名变成 `index`，对应事件变成 `update:index`。

## 读模板时先认出这些符号

- `{{ value }}`：把值显示为文本。
- `:disabled="loading"`：把表达式结果传给属性；冒号是 `v-bind` 的缩写。`disabled="loading"` 则不是同一回事。
- `@click="save"`：监听点击事件；`@` 是 `v-on` 的缩写。
- `@click.stop`：处理点击时阻止事件继续冒泡，`Check.vue` 就用了它。
- `v-if`：条件满足才创建这段界面，例如评论弹层的部分内容。
- `v-show`：保留元素，用显示状态切换可见性，`Check.vue` 用它切换图片。
- `v-for` 和 `:key`：遍历数据并给条目标识；读代码时注意标识是否能代表这一条记录。
- `v-model`：把输入值或子组件的更新事件连接到父组件状态。

`v-click`、`v-love`、`v-longpress` 并非 Vue 自带指令。项目分别在 [useClick.ts](../../src/utils/hooks/useClick.ts) 和 [mixin.ts](../../src/utils/mixin.ts) 等文件中定义了它们。看到陌生指令，先搜索定义，再判断行为。

## `computed`、`watch` 与生命周期分别何时用

`computed` 适合“由现有状态算出另一个值”。例子是上面的“已同意”文字，或 [EditUserInfoItem.vue](../../src/pages/me/userinfo/EditUserInfoItem.vue) 判断资料是否变化的 `isChanged`。计算函数的职责是返回结果。

`watch` 适合“某个值变了，需要做一件事”。[App.vue](../../src/App.vue) 监听路由路径以选择动画；[SlideVerticalInfinite.vue](../../src/components/slide/SlideVerticalInfinite.vue) 监听激活状态，激活且无数据时通知父组件加载。

生命周期是组件所处的阶段：

- `onMounted`：组件已挂载，可以读取模板中的 DOM 引用、注册监听。
- `onUnmounted`：组件被销毁，适合清理监听。
- `onActivated` / `onDeactivated`：组件被 `keep-alive` 缓存时，进入或离开显示状态。

暂时离开一个缓存页面不等于销毁它。所以首页同时使用激活、停用和卸载回调。普通点击事件、状态侦听和生命周期回调并不是同一种触发来源。

## 插槽：把界面的一部分留给调用方

[BaseButton.vue](../../src/components/BaseButton.vue) 内部有 `<slot>`。父组件写在按钮标签之间的“记录一次”，就填进这个位置。`prefix`、`suffix` 是具名插槽，允许调用方填入特定位置。

[EditUserInfoItem.vue](../../src/pages/me/userinfo/EditUserInfoItem.vue) 把标题填进 `BaseHeader` 的 `center` 插槽，把保存按钮填进 `right` 插槽。这样页面复用同一个头部结构，又能决定它显示什么。

## 这份项目有三个额外门槛

第一，`BaseVideo.vue` 中的 `$ref`、`$computed` 是编译期语法糖。项目配置了 Vue Macros；它们不是可以直接复制到普通 Vue 文件就自动运行的全局函数。Vue 官方已从 3.4 移除原先的响应性语法糖实验功能，相关能力由外部工具提供，见 [官方说明](https://cn.vuejs.org/guide/extras/reactivity-transform)。初学时先掌握标准 `ref` 与 `.value`。

第二，`utils/index.tsx` 有 JSX：在 JavaScript/TypeScript 里写类似标签的表达式，用函数决定生成哪个组件。它仍然属于 Vue 渲染，不是引入了另一个前端框架。

第三，某些组件没有本地 `import` 却能在模板里用，是因为 `main.ts` 安装了 [mixin.ts](../../src/utils/mixin.ts)。例如 `dy-button` 对应 `BaseButton`。这是项目的全局注册方式，不是 Vue 凭名称自动找文件。

## 一个不改代码的自测

读完 `Check.vue` 后，遮住本文，回答：状态由谁保存？子组件收到什么？点击时发送什么？父组件怎么更新？能完整说清这四步，再去读首页的 `v-model:index`。

下一篇：[04 路由、共享状态与页面缓存](04-router-and-state.md)。
