---
title: 部署
description: 把你的博客网站发布到互联网上。
---

## 什么是「部署」

**部署 = 把你的网站上传到互联网，让全世界都能通过网址访问。**

打个比方：你在电脑上写好了一本书，「部署」就是把这本书送到书店的书架上，这样读者才能看到。在部署之前，网站只存在于技术人员的电脑上，只有他自己能看到。

## 你的网站住在哪里：Cloudflare

你的网站运行在 **Cloudflare** 的服务器上。

| 问题                | 回答                                                                            |
| ------------------- | ------------------------------------------------------------------------------- |
| Cloudflare 是什么？ | 一家美国上市公司，全球最大的网络基础设施服务商之一                              |
| 为什么选它？        | 免费额度慷慨、速度快（全球都有服务器）、稳定可靠                                |
| 要花钱吗？          | 核心博客通常在免费额度内；R2 可能需要先绑定付款方式，Email Sending 需要付费计划 |

## 网站需要哪些「基础设施」

你的网站由三个核心组件支撑，可以用一个餐厅来类比：

| 组件        | 类比               | 做什么                                       |
| ----------- | ------------------ | -------------------------------------------- |
| **Workers** | 服务员             | 接待每一位访问你网站的人，把页面送到他们面前 |
| **D1**      | 表格仓库（数据库） | 存储你的文章、评论、用户信息等结构化数据     |
| **R2**      | 文件柜             | 存储你上传的图片、备份文件等                 |

> 还有一些可选组件（比如 KV 缓存、邮件发送），不影响核心功能，按需开启即可。

## 部署步骤概述

对你来说，部署的体验是这样的：

1. 你在后台写好文章、调整好设置
2. 技术人员在终端运行**一个命令**，网站就更新了

整个过程通常只需要几十秒。

如果你使用 [AI 初始化建站](./ai-setup)，AI 可以继续负责创建 D1、KV、R2、Worker、DNS 绑定、D1 migrations 和部署验证。你只需要在 Cloudflare 登录、付款方式确认、域名 nameserver、OAuth 应用或邮件验证这些环节手动确认。

## 本地开发是什么

「本地开发」是指技术人员**在自己的电脑上运行一个网站的副本**来测试效果。就像厨师在后厨试菜——只有他自己能吃到，顾客看不到。

本地开发的用途：

- 开发新功能时先在本地验证
- 修改样式后先看看效果对不对
- 不会影响已经上线的正式网站

---

## 技术人员参考

> 以下内容面向负责部署和维护的开发人员。如果你是产品经理或站点拥有者，可以跳过这部分。

### 本地开发管理员

给本地 Wrangler D1 数据库写入固定管理员账号：

```sh
pnpm db:seed:local-admin
```

默认本地登录信息：

```txt
email: a@a.test
password: 1
```

此命令只写入 `.wrangler/state` 下的本地 D1，不会创建生产管理员账号。需要覆盖默认值时设置 `BLOGCMS_LOCAL_ADMIN_EMAIL`、`BLOGCMS_LOCAL_ADMIN_NAME` 或 `BLOGCMS_LOCAL_ADMIN_PASSWORD`。

### 生产部署

这个仓库的 `apps/web/wrangler.jsonc` 是 `blog.01mvp.com` 演示站的线上配置。创建你自己的站点时，把 `apps/web/wrangler.example.jsonc` 复制为 `apps/web/wrangler.jsonc`，再替换 D1 database id、KV namespace id、公开站点 URL 和可选自定义域名。Placeholder 未替换时 `pnpm deploy:web` 会提前失败。

```sh
pnpm deploy:web
```

此命令会：检查 R2 存储桶 → 构建 Web 应用 → 应用远程 D1 migrations → 部署 Worker → 同步 Git 管理的笔记（需配置 `CMS_PUBLIC_SITE_URL` 和 `CMS_API_TOKEN`）。

如果提示缺少 R2 存储桶：

```sh
pnpm --filter @repo/web exec wrangler r2 bucket create blog-starter-assets --config wrangler.jsonc
```

### 运行时资源

```txt
Workers: 公开站点、后台、API 路由、feeds、sitemap、robots
D1: 文章、评论、设置、用户、会话、tokens
R2: 资产、导入包、导出包、备份
KV: 缓存元数据和可选短期记录
```

### 环境变量

本地开发读取 `apps/web/.env`，生产环境读取 Wrangler vars 与 secrets。变量名以 `apps/web/wrangler.jsonc` 为准。

生产环境设置 secrets：

```sh
pnpm --filter @repo/web exec wrangler secret put BETTER_AUTH_SECRET --config wrangler.jsonc
pnpm --filter @repo/web exec wrangler secret put GITHUB_CLIENT_ID --config wrangler.jsonc
pnpm --filter @repo/web exec wrangler secret put GITHUB_CLIENT_SECRET --config wrangler.jsonc
pnpm --filter @repo/web exec wrangler secret put GOOGLE_CLIENT_ID --config wrangler.jsonc
pnpm --filter @repo/web exec wrangler secret put GOOGLE_CLIENT_SECRET --config wrangler.jsonc
```

### D1 Migrations

`pnpm deploy:web` 自动应用远程 D1 migrations。仅自定义流水线或定向维护时手动运行：

```sh
pnpm --filter @repo/web exec wrangler d1 migrations apply <d1-database-name> --remote --config wrangler.jsonc
```

### 可选 Email Sending

Cloudflare Email Sending 默认关闭（需要 Workers Paid）。用于密码重置、后台通知、导入导出通知等场景。未配置时核心功能不受影响。

### 社交账号评论登录

GitHub/Google OAuth 配置详见 [评论文档](./comments)。
