# 阿里云演示站自动部署

演示地址是 `https://dy.sunshinedairy.net`。向 `woyaofei303/douyin` 的 `main`
推送代码后，GitHub Actions 只检查和构建；在 Actions 手动选择 `deploy` 后，
本次 CI 通过才发布新版本。服务器不需要安装 Node，
也不需要保存整个源码仓库。实际发布结果以 Actions 记录和网站的 `version.txt` 为准。

## 与原站点怎样共存

两个项目使用同一台首尔区域的 Ubuntu 24.04 服务器，公网 IP 为 `47.80.28.238`。
原有 `live.sunshinedairy.net` 继续使用 Streamlab；本项目使用独立的 DNS 记录、
发布账号、目录和 Docker Compose 项目：

```text
新域名：       dy.sunshinedairy.net
部署账号：     douyin-deploy（无 sudo、无 Docker 管理权限）
Compose 项目： douyin
容器：         douyin-web-1
内部端口：     127.0.0.1:8088 → 容器 80
站点目录：     /srv/douyin
服务配置：     /srv/douyin/config/compose.yml、nginx.conf
```

公网请求先经过原有 Caddy，再转发到新容器。Caddy 为新域名自动申请、续期 HTTPS
证书；Nginx 只处理这个项目的静态文件和路径路由。新容器限制为 64MB 内存、
0.5 核 CPU，应用构建在 GitHub 执行，避免在小服务器上构建占用原项目资源。

`deploy/Caddyfile` 只包含新增站点片段。它被追加到现有配置，不能拿它覆盖整个
Caddyfile。首次接入前的完整备份位于服务器：

```text
/root/douyin-deploy-backups/20261020/Caddyfile
```

Caddy 使用热加载，不重启原有 Web、媒体或代理容器。日常发布只切换静态文件，
不再改动代理或容器配置。服务配置如需修改，应由管理员检查、备份并单独应用；
推送代码不会自动执行这些管理员操作。

## 一次发布怎样完成

Actions 只保留一个 **CI & Production** 入口，文件是
`.github/workflows/deploy-aliyun.yml`。上游遗留的 Pages、Docker 镜像和翻译工作流
已移除，避免误用旧账号、旧工具版本或绕过本项目的检查。

- 提交 Pull Request：只执行 CI，不读取部署密钥。
- 推送 `main`：只执行 CI，验证提交，不自动部署。
- 手动运行：选择 `main` 和 `deploy`，一次点击完成 CI 和部署。
- 手动回滚：选择 `main` 和 `rollback`，恢复上一成功版本，不构建当前代码。

例如修改一个按钮并推送到 `main` 后，CI 任务使用 Node 24 和 `package.json`
固定的 pnpm 版本，复用 pnpm 下载缓存、按锁文件安装依赖，执行 ESLint、
6 个发布回退测试和现有的 15 个 Chromium 交互用例，然后运行：

```bash
pnpm build:server
```

服务器构建使用根路径 `/` 和 `prod` 环境。Vue、路由和 Mock 库直接进入产物，
刷新 `/login/password` 等深层地址时不会从错误的相对目录加载脚本，启动也不再
依赖原来的公共脚本 CDN。其他构建命令保持原样。示例视频等远程媒体仍取决于原地址。

手动发布会为选定提交重新执行 CI，再将构建结果和版本标识保存为本次运行的 artifact（供后续任务下载的构建产物），
保留 7 天。Deploy 任务通过 `needs: verify` 等待 CI 成功，只下载这份产物，
核对提交号和版本标识，不重复构建。检查、测试、构建或产物上传失败时都不会部署。
重跑失败的 Deploy 任务仍使用原 CI 产物；产物过期后重新运行整个工作流。

构建结果上传到 `/srv/douyin/releases/<提交号>-<运行号>-<重试号>/`。
每次运行使用独立目录，上传中断不会改动当前站点；相同文件通过 rsync 硬链接复用，
减少图片重复占用的空间。

`deploy/release.py` 保留共享目录中的旧哈希 JS、CSS 等资源，然后原子替换
`current` 软链接。也就是说，请求只能看到切换前或切换后的目录，不会看到删除
旧链接、创建新链接之间的空档。已经打开的旧页面仍可加载旧版延迟加载模块。

脚本通过 `http://127.0.0.1:8088/version.txt` 检查实际版本。本机检查失败时恢复
原链接；通过后，旧版本保存在 `previous`。最后工作流检查公网 HTTPS 版本。
公网检查失败会标记工作流失败，不会因外部网络故障自动回退已通过本机检查的版本。

同一时间只允许一个 `main` 发布或回滚流程运行，后续操作会等待当前流程结束，
不会中断正在切换的版本。不要连续堆积多个手动请求；GitHub 只保留一个等待项，
新的等待请求可能替换旧请求。回滚不会撤销 Git 提交，之后再次推送 `main` 只跑 CI；需要再次手动选择 `deploy` 才会上线。
与 Streamlab 的工作流、发布账号、目录和端口分开，不争用它的发布锁。

## GitHub 配置和密钥

仓库的 `aliyun-production` Environment 只允许 `main` 部署，配置名称如下：

```text
Variables:
  ALIYUN_HOST = 47.80.28.238
  ALIYUN_USER = douyin-deploy
  ALIYUN_PORT = 22

Secrets:
  ALIYUN_SSH_PRIVATE_KEY
  ALIYUN_SSH_KNOWN_HOSTS
```

SSH 主机指纹已通过阿里云控制台核对。工作流严格检查主机身份，不关闭校验。
密钥专用于这个项目，禁止端口转发、代理转发和终端分配；它只能以普通发布账号登录。
私钥不进入源码、文档或日志。当前机器上的本地运维副本位于 `~/.ssh/`，用于检查和回退。

## 检查与回退

本地检查在独立项目根目录执行：

```bash
cd /Users/julian/douyin-tailwind
python3 -m unittest discover -s deploy -p 'test_*.py'
pnpm test:styles --project=chromium
pnpm build:server
```

回退测试使用临时目录和本机 HTTP 服务，覆盖正常切换、手动回退、发布及回退失败后的恢复、
没有上一版本时拒绝回退和不完整产物拦截，不连接线上服务器。项目已有的历史 TypeScript 诊断尚未清除，
因此完整类型检查暂未作为发布门槛；这不表示类型检查通过。

查看发布记录和当前网站版本：

```bash
gh run list --repo woyaofei303/douyin --workflow deploy-aliyun.yml --limit 5
curl --fail https://dy.sunshinedairy.net/version.txt
```

日常回滚在 GitHub 上打开 **Actions → CI & Production → Run workflow**，
分支选择 `main`，`operation` 选择 `rollback`。它跳过当前代码的 CI 和构建，
只切换服务器的 `previous`，并检查本机 HTTP 和公网 HTTPS 版本。CI 失败不会阻断回滚。
没有上一版本时直接失败，保持当前站点。运行摘要会显示实际生效的完整版本号。

也可以在本地仓库目录通过 GitHub CLI 操作：

```bash
gh workflow run deploy-aliyun.yml --repo woyaofei303/douyin --ref main -f operation=deploy
gh workflow run deploy-aliyun.yml --repo woyaofei303/douyin --ref main -f operation=rollback
```

上面两行分别是发布和回滚，按需执行一行。GitHub 不可用时，在当前机器的仓库根目录
执行以下命令可通过 SSH 切回 `previous`：

```bash
ssh -i ~/.ssh/douyin-deploy_ed25519 \
  -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes \
  -o UserKnownHostsFile=~/.ssh/douyin_known_hosts \
  douyin-deploy@47.80.28.238 'python3 - --rollback' < deploy/release.py
```

回退也会检查本机 HTTP；检查不通过时恢复回退前的版本。版本目录和共享哈希资源
目前保留，不自动删除。清理时始终保留 `current`、`previous` 指向的目录，并考虑
仍打开的旧页面可能继续请求旧哈希资源。

实现依据：[Nginx 路径匹配](https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files)、
[Caddy 自动 HTTPS](https://caddyserver.com/docs/automatic-https)、
[GitHub 任务依赖](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-jobs)、
[GitHub 构建产物](https://docs.github.com/en/actions/tutorials/store-and-share-data)。
