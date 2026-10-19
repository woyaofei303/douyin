# Tailwind 样式约定与回归

项目自有界面的静态样式直接写在元素的 Tailwind 原子类中。保持原来的配色、尺寸和交互，不保留旧的业务样式类，也不使用 `tw:` 前缀。

例如，原来带有两端对齐含义的 `.flex`，现在写成 `flex justify-between`。按钮的尺寸和主题使用完整的类名映射；开关是否选中、按钮是否禁用，仍由原来的组件状态决定。

## 写样式的方式

```vue
<div class="flex items-center justify-between px-4 text-[14px]">
  <span :class="selected ? 'text-white' : 'text-[color:var(--second-text-color)]'">
    {{ title }}
  </span>
</div>
```

- 布局、间距、字号、颜色、边框和状态使用 Tailwind 工具类。
- 使用 `hover:`、`active:`、`before:`、`after:`、`group-*` 等原生变体。不要把旧的 `.page .item` 选择器塞进任意变体，也不要用 `@apply` 重建业务 CSS。
- 有限状态写完整类名，例如 `selected ? 'opacity-50' : 'opacity-100'`。不要拼接 `bg-${color}`。
- 脚本定位节点使用 `ref`、现有 ID 或 `data-*`，不读取或比较完整的 `class` 字符串。日期选择器使用 `data-picker-part`，视频列表使用 `data-slide-item`，聊天气泡使用 `data-chat-message`。
- 共享组件接受调用方的工具类。确实需要覆盖组件默认尺寸的地方保留局部 `!`；不要在入口开启全局 `important`。

Tailwind 的状态变体和子元素变体用法见[官方文档](https://tailwindcss.com/docs/hover-focus-and-other-states)。

## 尺寸和样式入口

唯一入口是 `src/assets/styles/tailwind.css`，由 `src/main.ts` 加载。使用 Tailwind v4 和官方 Vite 插件，未加载 Preflight，以保留浏览器表单、图片、盒模型的原有表现。

根元素仍然是 `font-size: 1px`，因为滑动计算和组件参数沿用了 `1rem = 1px`。Tailwind 的间距基准单独设为 `4px`，因此 `w-4` 为 `16px`、`h-10` 为 `40px`。字号与圆角按原值写成 `text-[14px]`、`rounded-[6px]`，不要直接使用按默认 `rem` 定义的 `text-sm` 等工具类。小数像素使用 `h-[1.5px]`。

桌面容器仍限制为 `500px`，移动端仍使用现有 `--vh`。边框应同时明确宽度、样式和颜色，例如 `border border-solid border-[gainsboro]`。

## 保留的 CSS 与动态值

全局 CSS 只承担以下用途：

- 现有主题变量、根元素与页面基础规则、滚动条处理。
- `animations.css` 中的 `@keyframes`。动画名称按内容区分，避免原来多个 `rotate`、`test`、`animal` 相互覆盖。

Vue 路由、弹窗和列表过渡使用 `enter-from-class`、`leave-active-class` 等属性指定原子类，不再定义业务过渡选择器。动画时长与轨迹沿用原值。

以下值需要运行时测量或由调用方传入，仍保留动态样式：

- 滑动列表、视频进度、音乐进度、拖动浮窗、个人主页拉伸的位移、宽高与过渡时间。
- 顶部滚动渐变、字母索引拖动的位移与渐变色。
- 按钮进度与调用方圆角、搜索栏文字颜色、弹窗高度、用户封面图。
- 日期选择器配置中的颜色、列数对应宽度、滚轮位置。
- 弹窗打开和关闭时保存、恢复页面位置与滚动位置。
- 卡片展开、个人主页拖动等分帧动画中的透明度、层级和过渡时间，与测量位置保持原有执行顺序。

消息页通过 `--header-back-opacity`、`--header-border-width` 和 `--person-name-color` 调整共享组件的少量外观。这些变量写在调用方原子类中，组件内部仍直接使用 Tailwind，不再依赖跨组件的业务选择器。

## 本地回归

在本项目工作目录执行：

```sh
pnpm exec playwright install chromium webkit firefox
pnpm test:styles
```

测试夹具位于 `tests/style-fixture.html`，只由开发服务器提供，不注册生产路由。15 个用例在 Chromium、WebKit、Firefox 三种引擎运行，覆盖按钮、开关、普通与级联日期选择器、遮罩主题、弹窗滚动恢复、横向滑动、纵向虚拟列表、下拉加载、聊天长按、渐变文字、联系人索引和未注册路由的协议页，同时检查全部 Vue 文件没有有效组件样式块或固定内联样式。

截图、trace 和计算样式对比保存到本地目录：

```text
output-tdd/playwright/tailwind-migration/
```

这些运行产物不进入版本控制。生产构建通过只说明编译链路可用，不能代替页面和交互回归。

项目原有类型检查存在历史诊断。迁移验收比较相同命令下的诊断内容，不把历史错误尚存的检查描述为通过。

## 独立仓库整理

2026-10-19 将迁移版本与原目录 `master` 分支的本地改动合入独立仓库。原目录当时没有 `main` 分支；新仓库从 `main` 开始，不继承旧提交历史。

合入内容包括 README、8 篇学习文档和 workspace 配置。同步修正了学习文档中过时的 Less 路径，并将 workspace 中的安装脚本提示文本改为明确的布尔值。`package.json` 固定 pnpm `11.21.0`。LICENSE 和上游来源继续保留。

在新目录重新完成了冻结锁文件安装、生产构建、全量 ESLint（0 错误、1 条原有警告），以及三个浏览器引擎共 45 项回归。类型检查仍报告 57 条历史诊断。首次提交实际执行了现有 Husky、lint-staged 和 commitlint 钩子；未更换质量工具。

新仓库上传源码与学习文档，不上传依赖、构建产物、截图、trace 或旧 Git 元数据。旧工作流的自动部署只监听 `master` 或版本标签，此次推送 `main` 不触发部署；本次没有为独立仓库配置线上站点或镜像发布。

## 本次迁移的核对方式

以下记录对应迁移阶段：当时在独立工作树完成代码修改，保留原目录的 README、学习文档和 workspace 配置，未提交、推送或部署。随后按要求整理独立项目，将这些本地改动一并合入 `/Users/julian/douyin-tailwind`，使用新的 Git 历史。

```text
原目录：/Users/julian/douyin
实施目录：/Users/julian/.codex/worktrees/tailwind-migration/douyin
```

15 个用例在三个浏览器引擎共运行 45 次，全部通过。生产、uni、gp_pages、gitee_pages 四种构建已通过。Gitee 构建的 JSON 清理脚本也在隔离的产物目录执行过。生产预览另外验证了动态视频节点的高度、切页位移、点赞图标尺寸和动画。

64 个路由的 93 项计算样式，以及 15 个弹层、面板状态，已与原始版本核对；图片加载完成后重新核对了直播和视频详情。比较时统一本地服务器地址，忽略透明的零尺寸阴影和素材内部 SVG 节点。

三个视口 375×812、390×844、1280×900 各检查 9 个关键页面，共 27 张固定画面截图；图片冻结首帧后，未发现 RGB 通道差值大于 10 的像素。完整本地证据位于 `/Users/julian/douyin/output-tdd/playwright/tailwind-migration/`。

生产 CSS 总计从 967,109 字节降到 78,283 字节，各 CSS 文件 gzip 大小合计从 139,980 字节降到 14,344 字节。普通规则从 12,294 条降到 1,366 条，完全重复的普通规则从 133 条降到 0 条（不统计关键帧）。

128 个 Vue 文件均通过解析检查，没有有效的组件样式块；8 个 Less 文件、日期选择器旧 CSS、Less 直接依赖均已移除。静态扫描同时检查 JS、TS、TSX，历史注释中的代码示例不作为运行样式。

相同类型检查命令原有 59 条诊断，迁移后剩 57 条；联系人索引改用原子类后消除了两条 Element.style 相关诊断，其余去掉行列号后内容一致，没有新增诊断。ESLint 无错误，保留 App.vue 原有的未使用导入警告；变更范围格式检查通过。未实际执行提交钩子，因为本次没有暂存或提交文件。

原有浏览器错误仍可在迁移前后复现：`/me/my-music` 的递归更新，以及 `/message/joined-group-chat`、`/message/share-to-friend` 的未定义值排序。本次未修改这些业务问题。

旧迁移工作树仍在时，可按原计划分组查看差异；这些命令用于旧工作树，不适用于重新初始化历史的独立仓库：

```sh
cd /Users/julian/.codex/worktrees/tailwind-migration/douyin
git status --short
git diff -- package.json pnpm-lock.yaml vite.config.ts index.html src/main.ts src/App.vue src/assets/
git diff -- src/components/
git diff -- src/pages/login/ src/pages/me/ src/pages/people/
git diff -- src/pages/home/ src/pages/message/ src/pages/shop/ src/pages/other/
git diff -- src/components/slide/ src/utils/ src/pages/test/
```

新增文件不会出现在未暂存的 `git diff` 中，可直接查看 `src/assets/styles/`、`tests/`、`playwright.config.ts` 和本文。

视觉核对使用固定随机数据、暂停媒体与动画，并排除远程媒体加载。自动化浏览器验证不代表真实手机触摸手感、真实音视频播放或最低支持版本浏览器已经验收。
