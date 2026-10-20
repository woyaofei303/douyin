# 阿里云演示站自动部署

演示地址是 `https://dy.sunshinedairy.net`。向 `woyaofei303/douyin` 的 `main`
推送代码后，GitHub Actions 会检查、构建并发布新版本。服务器不需要安装 Node，
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

工作流位于 `.github/workflows/deploy-aliyun.yml`。例如修改一个按钮并推送到
`main` 后，它会使用 Node 24 和 `package.json` 固定的 pnpm 版本安装锁文件中的依赖，
执行 ESLint、发布回退测试和现有的 15 个 Chromium 交互用例，然后运行：

```bash
pnpm build:server
```

服务器构建使用根路径 `/` 和 `prod` 环境。Vue、路由和 Mock 库直接进入产物，
刷新 `/login/password` 等深层地址时不会从错误的相对目录加载脚本，启动也不再
依赖原来的公共脚本 CDN。其他构建命令保持原样。示例视频等远程媒体仍取决于原地址。

构建结果上传到 `/srv/douyin/releases/<提交号>-<运行号>-<重试号>/`。
每次运行使用独立目录，上传中断不会改动当前站点；相同文件通过 rsync 硬链接复用，
减少图片重复占用的空间。

`deploy/release.py` 保留共享目录中的旧哈希 JS、CSS 等资源，然后原子替换
`current` 软链接。也就是说，请求只能看到切换前或切换后的目录，不会看到删除
旧链接、创建新链接之间的空档。已经打开的旧页面仍可加载旧版延迟加载模块。

脚本通过 `http://127.0.0.1:8088/version.txt` 检查实际版本。本机检查失败时恢复
原链接；通过后，旧版本保存在 `previous`。最后工作流检查公网 HTTPS 版本。
公网检查失败会标记工作流失败，不会因外部网络故障自动回退已通过本机检查的版本。

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

回退测试使用临时目录和本机 HTTP 服务，覆盖正常切换、手动回退、检查失败后的恢复
和不完整产物拦截，不连接线上服务器。项目已有的历史 TypeScript 诊断尚未清除，
因此完整类型检查暂未作为发布门槛；这不表示类型检查通过。

查看发布记录和当前网站版本：

```bash
gh run list --repo woyaofei303/douyin --workflow deploy-aliyun.yml --limit 5
curl --fail https://dy.sunshinedairy.net/version.txt
```

在当前机器的仓库根目录执行以下命令，可切回 `previous`：

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
[GitHub Node 设置](https://github.com/actions/setup-node)。
