# 02 启动与入口：从命令走到首页

这一篇的目标是让你知道“命令启动了什么”和“浏览器随后执行了什么”。只启动根目录的前端即可，不需要先进入 `node/` 启动服务器。

## 先核对本地环境

下面所有命令都在项目根目录执行。这里用的是当前机器的实际路径；项目放在其他位置时改掉 `cd` 的目标。

```bash
cd /Users/julian/douyin-tailwind
git status --short
node --version
pnpm --version
```

这些是查询命令，不修改源码。独立项目整理时使用 Node `v24.14.0`、pnpm `11.21.0`，`package.json` 已固定该 pnpm 版本。仓库有 `pnpm-lock.yaml`，沿用 pnpm，不混用包管理器重新生成锁文件。

当前已经存在 `node_modules`，可先尝试启动。如果换到没有安装依赖的环境，再执行下面的安装命令。它会下载依赖、写入 `node_modules`，并可能运行项目的 `prepare` 脚本；冻结锁文件可以避免悄悄改写依赖解析结果。

```bash
cd /Users/julian/douyin-tailwind
pnpm install --frozen-lockfile
```

预期：安装完成且锁文件不被改写。若失败，先读报错，不要直接删锁文件或用另一种包管理器覆盖安装。

`pnpm-workspace.yaml` 已纳入仓库：允许 `esbuild` 与 `vue-demi` 运行安装脚本，关闭只输出提示的 `core-js` 安装脚本。它没有定义多包工作区。若本机 pnpm 缓存目录不可写，可在安装命令后加 `--store-dir ./node_modules/.pnpm-store`，不要因此删除锁文件。

## 启动开发服务器

```bash
cd /Users/julian/douyin-tailwind
pnpm dev
```

`package.json` 将它映射为 `vite --host`。[vite.config.ts](../../vite.config.ts) 配置了开发端口 `3000`，也配置了自动打开浏览器。预期访问地址是：

```text
http://127.0.0.1:3000
```

如果端口被占用，以终端输出的实际地址为准。命令会一直运行；终端按 `Ctrl+C` 停止开发服务器。

打开浏览器开发者工具，切到设备模拟模式。Windows/Linux 常用 `F12` 后 `Ctrl+Shift+M`；macOS 的 Chrome 可用 `Command+Option+I` 后 `Command+Shift+M`，也可直接点设备图标。先用约 375 像素宽的视口观察，再测试滑动。

源码预期会显示首页；桌面浏览器可能先显示切换手机模式的提示。初始视频默认静音。看到这些现象不代表安装失败。

## 浏览器启动时依次发生什么

1. [index.html](../../index.html) 提供 `<div id="app">`，并加载 `/src/main.ts`。
2. [main.ts](../../src/main.ts) 引入全局样式，创建 Vue 应用和 Pinia，注册全局 mixin、懒加载插件、路由，然后挂载 `App`。
3. 文件后部调用 `startMock()` 注册模拟接口。注意实际顺序是挂载调用之后，并没有等待所有本地数据准备好才显示页面。
4. [router/routes.ts](../../src/router/routes.ts) 将 `/` 重定向到 `/home`，对应首页组件。
5. [App.vue](../../src/App.vue) 用 `router-view` 放入页面，外面包着过渡动画与 `keep-alive`。挂载回调调用 `store.init()` 取用户资料。
6. 首页默认选中推荐分栏，视频列表通过激活状态触发首次数据加载，详细过程见第 05 篇。

这是一条阅读顺序，不代表其中每个异步请求都严格串行完成。`store.init()`、视频列表请求和稍后追加视频数据会有异步交错；调试首次加载时需要观察实际时序。

`main.ts` 还代理了 DOM 点击监听，滑动时利用 `window.isMoved` 忽略点击。这是项目的交互处理，不是所有 Vue 应用都需要的初始化步骤。

## 开发、构建、类型检查是三件事

下面命令均来自现有 `package.json`。Tailwind 迁移的构建与浏览器回归结果见 [迁移记录](../tailwind-migration.md)；类型检查仍有历史错误，不能把构建成功理解为类型检查通过。

检查 Vue/TypeScript 类型：

```bash
cd /Users/julian/douyin-tailwind
pnpm type-check
```

预期成功时退出码为 0；它不等于浏览器功能测试，并会产生配置指定的增量检查缓存。

生成生产文件：

```bash
cd /Users/julian/douyin-tailwind
pnpm build
```

预期生成或更新 `dist/`。当前 `build` 只是 `vite build`，不会顺带完成类型检查。构建配置包含 CDN 导入，生产页面与开发页面的依赖加载方式也不完全一样。

构建成功后，本地预览产物：

```bash
cd /Users/julian/douyin-tailwind
pnpm preview
```

配置中的预览端口为 `5555`，同样以实际输出为准。该命令用于预览 `dist/`，不是重新编译开发源码。

## 哪些命令容易误会

- `pnpm test:styles` 运行 Playwright 样式与交互回归，配置在 `playwright.config.ts`。首次运行先执行 `pnpm exec playwright install chromium webkit firefox`。`src/pages/test` 则是手动演示页面。
- `test-del-json` 会执行 [remove-dist-json.js](../../node/remove-dist-json.js)，递归删除 `dist/data` 下文件名含 `.json` 的文件。它不是测试命令。
- `lint` 包含 ESLint 的 `--fix`，`format` 会让 Prettier 写入 `src/`，都可能批量修改文件。阅读源码时不必运行它们。
- `build-check` 调用了 `run-p`，但清单未直接声明通常提供该命令的 `npm-run-all`；本次没有运行确认，先分别理解 `type-check` 和 `build` 更清楚。
- 现有 pre-commit 执行 `lint-staged`，配置为 ESLint 与 Prettier；类型检查和浏览器回归仍需单独运行。

下一篇：[03 用小组件认识 Vue 3](03-vue-basics.md)。
