# 01mvp-blog-starter

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/01MVP/blog-starter)
[![Cloudflare deploy](https://github.com/01MVP/blog-starter/actions/workflows/cloudflare-deploy.yml/badge.svg)](https://github.com/01MVP/blog-starter/actions/workflows/cloudflare-deploy.yml)

[English README](./README.md)

01mvp-blog-starter 是一个基于 Cloudflare 的个人发布系统，并内置 Git 管理的文档系统。

默认提供两套内容系统：

- `/blog` 由发布后台驱动，适合公开文章、后台写作、评论、RSS、OpenAPI 发布、导入、导出和备份。
- `/docs` 由 Fumadocs 与 GitHub Markdown/MDX 驱动，适合产品文档、开发者文档、API 指南和模板说明。

## 技术栈

- TanStack Start + TanStack Router
- React 19 + React Compiler
- Tailwind CSS + shadcn/ui
- Fumadocs 管理 Git 文档
- Paraglide.js 编译英文和中文 UI 文案
- Cloudflare Workers，通过 `@cloudflare/vite-plugin` 集成
- Cloudflare D1 存储文章、评论、设置、用户、会话和 API Token
- Cloudflare R2 存储媒体、导入包、导出包和备份
- Cloudflare KV 存储缓存元数据和短期记录

## 一键部署到 Cloudflare

点击上方 Deploy to Cloudflare 按钮，可以从公开 GitHub 仓库创建并部署自己的副本。

这个按钮面向 Workers 应用。当前仓库是 pnpm monorepo，所以根目录脚本是部署入口：

```sh
pnpm deploy:web
```

这个仓库里的 `apps/web/wrangler.jsonc` 是 `blog.01mvp.com` 演示站的线上配置。不要把里面的 D1、KV、R2 id 复制到你自己的站点。

Fork 模板时，把 `apps/web/wrangler.example.jsonc` 复制为 `apps/web/wrangler.jsonc`，再创建自己的 D1、R2 和 KV，并替换 placeholder。只要 placeholder ID 或 placeholder URL 还在，部署脚本会提前失败。详见 [configuration](./docs/specs/configuration.md)。

生产环境必需的 secret：

- `BETTER_AUTH_SECRET`：用 `pnpm auth:secret` 生成
- `GITHUB_CLIENT_ID` 和 `GITHUB_CLIENT_SECRET`：只有启用 GitHub 登录时才需要
- `GOOGLE_CLIENT_ID` 和 `GOOGLE_CLIENT_SECRET`：只有启用 Google 登录时才需要

## Push 后自动部署

仓库已包含 `.github/workflows/cloudflare-deploy.yml`。每次 push 到 `main` 后，GitHub Actions 会安装依赖、构建 Web 应用、把 D1 migrations 应用到远程数据库，并部署 Worker 到 Cloudflare。

先给 GitHub 仓库添加这两个 secrets：

```sh
gh secret set CLOUDFLARE_API_TOKEN --repo 01MVP/blog-starter --body "$CLOUDFLARE_API_TOKEN"
gh secret set CLOUDFLARE_ACCOUNT_ID --repo 01MVP/blog-starter --body "$CLOUDFLARE_ACCOUNT_ID"
```

Token 需要能部署 Workers，并能管理 `apps/web/wrangler.jsonc` 里绑定的 D1、R2 和 KV 资源。

## 本地开发

```sh
pnpm install
pnpm dev:web
```

本地 Web 应用默认运行在 `http://localhost:3000`。

写入本地 D1 管理员账号：

```sh
pnpm db:seed:local-admin
```

默认本地账号：

```txt
email: a@a.test
password: 1
```

## 构建

```sh
pnpm build:web
```

构建会编译 Paraglide 输出、构建 TanStack Start，并生成 Cloudflare Worker bundle。

## 生产部署

```sh
pnpm deploy:web
```

这个命令会检查必需的 R2 存储桶、构建 Web 应用、应用远程 D1 migrations，用生成的 Cloudflare 配置部署 Worker，并在配置 `CMS_PUBLIC_SITE_URL` 和 `CMS_API_TOKEN` 后同步 Git 管理的笔记。

## 工作区

```txt
apps/web                 TanStack Start 应用、管理后台、公开站点、文档和 API 路由
packages/auth            Better Auth 工厂和 TanStack helper
packages/core            内容类型、演示数据、Markdown 与 i18n helper
packages/db              Drizzle schema 与 D1 migrations
packages/ui              共享 UI primitives
skills                   自动化初始化与 OpenAPI 维护 Skill
apps/web/content/docs    公开 Fumadocs 文档源，docs/site 指向这里
docs/prd.md              中文需求文档；英文版见 docs/prd.en.md
docs/specs               项目规格、部署记录和发布规划记录
```

## 文档

公开文档源文件放在 `apps/web/content/docs`。它会渲染到 `/docs` 和 `/zh/docs`。

配置新站点时优先看这些文档：

- [AI 初始化建站](./apps/web/content/docs/ai-setup.zh.md)
- [部署](./apps/web/content/docs/deployment.zh.md)
- [评论](./apps/web/content/docs/comments.zh.md)
- [进阶配置](./apps/web/content/docs/advanced-configuration.zh.md)
- [API](./apps/web/content/docs/api.zh.md)
- [Configuration](./docs/specs/configuration.md)
- [PRD（中文）](./docs/prd.md) / [PRD (English)](./docs/prd.en.md)

根目录下的 `docs/specs` 用于项目规格、部署记录、验收记录和发布规划记录，不作为公开 Fumadocs 内容整包发布。

## 自动化

博客 Skill 的源文件在 `skills/01mvp-blog/SKILL.md`。

检查 GitHub 仓库里的 Skill 是否可被发现：

```sh
npx skills@latest add 01MVP/blog-starter --list
```

把它安装到本项目的 Codex 环境：

```sh
npx skills@latest add 01MVP/blog-starter --skill 01mvp-blog --agent codex --yes
```

安装到其他 agent 时，把 `codex` 换成对应的小写 agent id。

创建站点和维护已有博客时使用 `01mvp-blog` Skill。Cloudflare 资源创建和部署仍然需要具备 Cloudflare 能力的 agent skill 或工具。生成后的站点会暴露 `/openapi.json`，接入外部自动化前先在后台设置页创建受限 API Token。

如果不想安装 Skill，也可以复制 [AI 初始化建站](./apps/web/content/docs/ai-setup.zh.md) 里的 Prompt 给 AI。推荐优先使用 Skill，因为后续初始化命令、Cloudflare 资源创建和验收清单可以随 Skill 更新。

## License

MIT. See [LICENSE](./LICENSE).
