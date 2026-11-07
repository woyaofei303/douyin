# 推荐页接入 Flutter

现有 `/home` 推荐页新增“播放工具”，App 仍打开 `https://dy.fameex-testnet.xyz/`。普通浏览器可使用控制、评论和弹幕；Flutter 宿主接入后增加原生接力、身份/语言同步与 App 全屏。

## 从第 8 秒开始验证

访问 `/home?lab=1` 使用自制的练习素材。暂停在第 8 秒，选 1.5 倍速和 360p，点击“交给 Flutter”。原生返回时应该恢复同一个视频的进度、速度和静音。普通推荐没有改成测试图；历史外链可能失效，未验证的外链不允许交给原生。

本地开发在本仓库根目录运行：

```sh
pnpm install --frozen-lockfile
pnpm exec vite --host 127.0.0.1 --port 3002 --strictPort --mode prod --open false
```

然后在 `flutter-video-lab` 仓库执行：

```sh
./scripts/flutterw run -d 'Flutter Video Lab iPhone' --dart-define=H5_BASE_URL=http://127.0.0.1:3002
```

Android 每次测试或重启运行前先执行 `adb -s emulator-5554 reverse tcp:3002 tcp:3002`，再将设备改为 `emulator-5554`；Flutter 测试结束可能清除端口映射。Release 不使用本地覆盖地址。更完整的 Dart 调用链见 Flutter 仓库 `docs/HYBRID-REMOTE.md`。

## 数据与调用关系

`BaseVideo.vue` 注册真实的 video，`hybrid.ts` 只管理这些已注册实例。推荐列表切换时先暂停旧项，再播放新项；虚拟节点回收时解除事件和素材引用。当前视频状态含 ID、媒体版本、位置、时长、速度、静音、播放状态和可用清晰度。

Flutter 注册 `VideoLabChannel` 后调用 `VideoLabRemote.connect(session)`。网页发送协议 v2 的 ready，再上报状态。ready 表示可以接收命令，媒体是否可播另看 `media.ready`。旧页面的 session、超长消息、错误状态字段和非白名单素材不能通过校验。

接力时 `freeze` 先保存播放意图再暂停；`suspend=true` 禁止 H5 在原生页背后播放。原生返回的 `restore` 必须匹配当前视频 ID 和媒体版本，恢复时先保持暂停。页面后台事件优先暂停；恢复前台不会自动重启。新会话重新建立；跨页面刷新不承诺恢复旧检查点。

为了避免旧站音乐、直播等尚未接入模块产生第二路声音，宿主模式只允许根路径和 `/home` 路由；普通浏览器保持原站路由。全屏 resize 重新计算滑动尺寸，不再刷新整个首页。

## 互动、诊断与素材

评论和弹幕仅保存在当前浏览器 localStorage，不会发给服务端。每视频最多 100 条，每条最多 80 字；失败保留输入。弹幕随媒体时间取最近 5 秒的最多 3 条，没有做复杂碰撞调度。

诊断记录首帧等待、卡顿次数/时长和错误。`video-frame` 使用实际视频帧回调；`playing-proxy` 是不支持时的事件近似。事件最多 40 条，不包含 Token、Cookie 或外部签名媒体 URL，也没有线上埋点服务。

`public/lab-media/` 的两份 MP4 复制自 flutter-video-lab 自制素材：FFmpeg testsrc2 测试图和低音量 440Hz sine 测试音，20 秒、H.264/AAC、24fps、1280×720 与 640×360，同一时间轴。没有使用抖音、影视或第三方摄影视频。手动切换会加载新文件；不是 HLS/ABR 无缝切换。

演示身份只有 guest/learner。中英文覆盖新操作区，不代表整个历史站点已经国际化。后端、真实登录、CMS、HLS/MSE/WebRTC、广告、会员支付与真机性能仍是后续范围。

## 修改后检查

```sh
pnpm exec eslint src tests/hybrid-playback.spec.ts tests/hybrid --ext .vue,.js,.ts,.mjs
pnpm typecheck:hybrid
pnpm test:hybrid
pnpm test:styles --project=chromium
pnpm build:server
```

新增模块单独启用严格类型检查，避免把历史项目已有全量类型问题混入这轮。原有 15 项页面回归继续运行，新增测试使用实际推荐组件和 MP4；模拟宿主传输的测试不能替代 Android/iOS WebView 验收。

生产发布沿用 [现有部署指南](aliyun-deployment.md)。先通过 CI，再手动发布 main，最后检查 `version.txt` 与线上 `/home?lab=1`；本地构建不等于部署完成。
