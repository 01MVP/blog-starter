# 01mvp-blog-starter 最终需求文档

[English version](./prd.en.md)

## 1. 项目定位

### 1.1 项目名称

暂定：

```txt
01mvp-blog-starter
```

仓库名建议：

```txt
01mvp-blog-starter
```

唯一最终验收站点：

```txt
blog.01mvp.com    # 模板演示站
```

### 1.2 一句话定位

**01mvp-blog-starter 是一个基于 Cloudflare 全家桶的个人永久博客 CMS，既支持小白用户通过后台可视化写作，也支持 AI Skill / OpenAPI 自动化发布和维护。**

### 1.3 项目本质

这个仓库同时包含两个产品：

```txt
产品 A：博客 CMS 代码模板
产品 B：给 AI 使用的初始化 Skill
```

也就是说，最终交付范围包括：

```txt
1. 一个可复用的 Cloudflare-native 博客 CMS 模板
2. 一个 AI 可以使用的 Skill，用来自动创建新的博客站点
3. 一个统一部署在 blog.01mvp.com 的模板演示站
```

---

# 2. 基础代码模板选择

## 2.1 主模板

最终决定基于：

```txt
mugnavo/tanstarter-plus
```

原因：

`mugnavo/tanstarter-plus` 是一个基于 TanStack Start 的现代 monorepo starter，包含 Vite Plus、pnpm workspace、React 19、React Compiler、TanStack Start / Router / Query / Form、Drizzle、Better Auth、Tailwind CSS、shadcn/ui、Base UI 等现代技术栈。它更适合作为一个长期演进的全栈 CMS 模板底座。([GitHub][1])

项目要求使用 Vite+ `vp` 和 pnpm，初始化方式是：

```bash
pnpm create mugnavo -t monorepo
```

这也符合我们希望它作为“现代 AI 友好模板”的定位。([GitHub][1])

## 2.2 参考模板

参考：

```txt
mohamede1945/tanstack-start-blog
```

参考内容：

```txt
博客前台结构
文章页面体验
RSS
SEO
OG 图
Newsletter / 订阅思路
Cloudflare Workers 部署细节
```

但不直接基于它开发。它更适合提供“博客功能参考”，而不是 CMS 架构底座。

## 2.3 Cloudflare / TanStack 兼容依据

Cloudflare 官方已经提供 TanStack Start 部署支持。已有 TanStack Start 项目可以直接执行 `wrangler deploy`，Wrangler 会自动检测 TanStack Start 并生成必要配置。([Cloudflare Docs][2])

Cloudflare 也已经支持 TanStack Start 通过 Cloudflare Vite plugin 部署，并且可以用 `create-cloudflare` 创建 TanStack Start 项目。([Cloudflare Docs][3])

因此，本项目采用：

```txt
TanStack Start + Cloudflare Workers + D1 + R2
```

作为长期技术方向是合理的。

---

# 3. 核心目标

## 3.1 产品目标

构建一个完整的个人永久博客 CMS，支持：

```txt
1. 小白用户通过后台写文章、传图片、发布内容。
2. 开发者通过 Markdown / HTML / OpenAPI 自动发布。
3. AI Agent 可以通过 Skill 初始化、部署、维护博客。
4. 内容长期可迁移、可备份、可导出，不被某个编辑器锁死。
5. 前台具备现代博客基础能力：SEO、OG、RSS、sitemap、标签、搜索、评论。
6. 后台具备轻量 CMS 能力：文章管理、媒体管理、评论管理、站点设置、导入导出。
7. 全部核心能力尽量基于 Cloudflare 免费额度运行。
8. 邮件发送等付费能力作为可选增强，而不是免费版硬依赖。
```

## 3.2 非目标

第一阶段不追求：

```txt
1. 多租户 SaaS
2. 主题市场
3. 复杂权限系统
4. 大型媒体库工作流
5. 多作者协作平台
6. WordPress 级插件生态
7. 高并发社区系统
8. 复杂支付 / 会员系统
```

---

# 4. 核心设计原则

## 4.1 Cloudflare-native

优先使用 Cloudflare 能力：

```txt
运行：Cloudflare Workers
数据库：Cloudflare D1
对象存储：Cloudflare R2
缓存：Cloudflare Cache API / KV
防垃圾：Cloudflare Turnstile
队列：Cloudflare Queues，可选
邮件：Cloudflare Email Service，可选增强
部署：Wrangler / Cloudflare API / Cloudflare Skill
```

Cloudflare 官方仍将 Wrangler 定义为 Cloudflare Developer Platform 的命令行工具，用于 Workers 项目的开发、部署和配置。([Cloudflare Docs][2])

## 4.2 Markdown-first，但 CMS-first

内容主格式是 Markdown，但主存储是 D1。

```txt
D1：文章、作品集、评论、设置、用户、API Token
R2：图片、附件、HTML 包、ZIP 导入包、备份包
Markdown：主内容格式
HTML：兼容导入格式
导出：Markdown / HTML / ZIP
```

这意味着：

```txt
D1 CMS-first 的 Cloudflare-native 个人内容系统
排除 Fumadocs 文件站、纯静态博客、Git-based CMS 这三类形态
```

## 4.3 AI 自动化优先

Skill 是给 AI 用的，不是给用户看的普通教程。

执行优先级：

```txt
1. AI 自动执行
2. AI 优先使用 Cloudflare 对应 Skill，必要时再使用 Wrangler / Cloudflare API / MCP 操作
3. AI 引导用户授权登录
4. AI 引导用户创建最小权限 API Token
5. 只有实在无法自动操作时，才让用户手动进 Dashboard
```

用户只在这些场景介入：

```txt
登录 Cloudflare
授权 OAuth
接受条款
选择是否开通 Workers Paid
创建 / 粘贴 API Token
确认 DNS 修改
确认域名绑定
完成邮箱 / 域名验证
```

## 4.4 免费可用，付费增强

系统默认不依赖 Cloudflare Paid Plan。

免费核心版必须能完成：

```txt
部署
登录
写文章
上传图片
评论审核
RSS
sitemap
导入导出
OpenAPI 基础操作
```

Cloudflare Email Sending 等能力作为增强模块。Cloudflare Email Service 的文档显示 Email Sending 属于 public beta，并支持 Workers binding / REST API 等方式发送事务邮件；因此本项目将其设计为可选增强，而不是核心依赖。([Cloudflare Docs][3])

---

# 5. 系统用户角色

## 5.1 Admin

站长，拥有全部权限：

```txt
管理文章
管理作品集
管理图片
管理评论
管理站点设置
管理 API Token
执行导入导出
执行备份
配置主题
```

## 5.2 Visitor

访客，可以：

```txt
阅读文章
查看标签
查看归档
搜索内容
订阅 RSS
发表评论
```

## 5.3 API Client / AI Agent

通过 API Token 和 OpenAPI 操作系统：

```txt
创建文章
更新文章
发布文章
上传图片
导入 Markdown
导入 HTML
导出内容
审核评论
备份站点
```

## 5.4 Skill Runner

AI Skill 执行者，负责：

```txt
初始化项目
配置 Cloudflare 资源
生成站点配置
执行部署
验证站点
生成示例文章
输出维护命令
```

---

# 6. 总体技术架构

## 6.1 基础技术栈

```txt
Starter：mugnavo/tanstarter-plus
Framework：TanStack Start
Router：TanStack Router
UI：Tailwind CSS + shadcn/ui + Base UI
Workspace：pnpm workspace
Build：Vite Plus
Runtime：Cloudflare Workers
Database：Cloudflare D1
ORM：Drizzle ORM
Storage：Cloudflare R2
Auth：Better Auth + Drizzle + Cloudflare D1
Editor：MDXEditor
Markdown：unified / remark / rehype
Code Highlight：Shiki
HTML Safety：sanitize-html / rehype-sanitize / iframe sandbox
Anti-spam：Cloudflare Turnstile
API：OpenAPI + API Token
Skill：skills/01mvp-blog
```

## 6.2 仓库结构

```txt
01mvp-blog-starter/
  apps/
    web/
      # CMS 模板站：TanStack Start + Cloudflare Workers

  packages/
    ui/
      # Tailwind theme preset + UI 组件

    core/
      # posts / comments / assets / settings / import-export 核心业务

    db/
      # Drizzle schema + D1 migrations

    auth/
      # 用户、Session、权限、API Token

    api/
      # OpenAPI、API client、权限校验

    markdown/
      # Markdown / HTML 处理、sanitize、Shiki、TOC

    cloudflare/
      # D1 / R2 / KV / Turnstile / Email 封装

    config/
      # tsconfig / eslint / tailwind preset

  skills/
    01mvp-blog/
      SKILL.md
      scripts/
      templates/
      checklists/
      examples/

  docs/
    prd.md
    specs/
      architecture.md
      database.md
      api.md
      deployment.md
      skill.md
      acceptance.md

  examples/
    demo-site-config/
      # Skill 生成站点配置快照

  AGENTS.md
  pnpm-workspace.yaml
  package.json
```

---

# 7. 产品功能需求

## 7.1 前台博客

### 首页 `/`

展示：

```txt
站点名称
站点简介
头像 / Logo
最新文章
精选文章
标签入口
作品集入口
RSS 入口
搜索入口
关于页入口
社交链接
```

可配置：

```txt
首页标题
首页副标题
首页文章数量
是否展示精选文章
是否展示作品集
是否展示标签云
```

### 博客列表 `/blog`

功能：

```txt
按发布时间倒序展示文章
分页
标签筛选
关键词搜索
置顶文章
草稿不公开
归档文章不展示
```

### 文章详情 `/blog/:slug`

展示：

```txt
标题
摘要
封面图
发布时间
更新时间
作者
标签
目录 TOC
正文
上一篇 / 下一篇
相关文章
评论区
```

内容支持：

```txt
Markdown
HTML
代码高亮
表格
图片
图片集
嵌入视频
链接卡片
引用块
Callout
Mermaid，可选
数学公式，可选
```

### 标签页 `/tags` 和 `/tags/:slug`

功能：

```txt
展示所有标签
展示标签文章数量
展示标签下文章
```

### 关于页 `/about`

功能：

```txt
后台可编辑
支持 Markdown / HTML
```

## 7.2 后台 CMS

后台路径：

```txt
/admin
```

### 登录

默认方式：

```txt
邮箱 + 密码
Session Cookie
```

不默认依赖邮件验证码。

可选增强：

```txt
邮箱验证码登录
忘记密码邮件
2FA
恢复码
```

如果未启用 Email Sending，仍需支持：

```txt
后台正常登录
后台或 OpenAPI 重置管理员密码
后台或 OpenAPI 创建管理员
```

### 文章管理 `/admin/posts`

功能：

```txt
文章列表
新建文章
编辑文章
删除文章
归档文章
发布 / 取消发布
草稿管理
按状态筛选
按标签筛选
关键词搜索
批量操作
```

文章状态：

```txt
draft
published
scheduled
archived
deleted
```

文章来源：

```txt
editor
markdown_upload
html_upload
api
ai
import
```

### 编辑器

采用：

```txt
MDXEditor
```

要求：

```txt
Markdown-first
接近所见即所得
支持源码模式
支持预览模式
支持粘贴图片自动上传
支持拖拽图片上传
支持表格
支持代码块
支持 Callout
支持链接
支持图片
支持分割线
```

保存策略：

```txt
content_markdown：主内容
content_html：发布时生成的渲染缓存
content_text：纯文本，用于搜索
```

### 媒体管理 `/admin/assets`

功能：

```txt
上传图片
粘贴图片自动上传
拖拽上传
批量上传
查看图片
复制图片 URL
删除图片
按文章关联查看
生成缩略图，可选
图片压缩，可选
```

存储：

```txt
R2
```

### 评论管理 `/admin/comments`

功能：

```txt
查看评论
审核评论
删除评论
标记垃圾评论
按文章筛选
按状态筛选
```

评论默认：

```txt
pending
```

### 站点设置 `/admin/settings`

配置：

```txt
站点名称
站点描述
站点 URL
Logo
头像
默认 OG 图
作者名称
作者简介
社交链接
导航菜单
页脚内容
RSS 设置
评论设置
SEO 设置
主题设置
自定义 CSS
自定义 head 注入，Admin only
```

---

## 7.3 评论系统

评论功能必须自研，基于 D1。

访客评论字段：

```txt
昵称
邮箱
个人网站，可选
评论内容
```

邮箱不公开展示。

评论能力：

```txt
发表评论
回复评论
最多 2 层嵌套
默认待审核
后台审核
后台删除
垃圾评论标记
评论开关
文章级评论开关
```

反垃圾策略：

```txt
Cloudflare Turnstile
IP 限流
评论内容长度限制
链接数量限制
关键词过滤
同文章短时间评论限制
Honeypot 字段
```

邮件通知：

```txt
Phase 3 可选增强
未启用 Email Sending 时，不影响评论审核
```

---

## 7.4 SEO / RSS / OG / Sitemap

### SEO

每篇文章支持：

```txt
seo_title
seo_description
canonical_url
robots
structured_data
```

自动生成：

```txt
title
description
canonical
Open Graph
Twitter Card
JSON-LD
```

### OG 图

支持三种：

```txt
手动上传
默认站点 OG 图
自动生成 OG 图
```

第一阶段要求：

```txt
默认 OG 图
文章级 OG metadata
```

后续增强：

```txt
发布文章时生成 OG 图并存入 R2
```

### RSS

支持：

```txt
/rss.xml
/feed.xml
```

可选：

```txt
/atom.xml
/jsonfeed.json
```

### Sitemap

支持：

```txt
/sitemap.xml
/sitemap-posts.xml
```

包含：

```txt
文章
标签
作品集
```

### Robots

支持：

```txt
/robots.txt
```

后台可配置：

```txt
是否允许搜索引擎索引
是否隐藏某些路径
```

---

## 7.5 搜索

第一阶段：

```txt
D1 LIKE / 简单全文匹配
```

第二阶段：

```txt
D1 FTS5 或构建搜索索引 JSON
```

第三阶段可选：

```txt
外部搜索服务
```

优先保持 Cloudflare-only。

---

## 7.6 导入导出

### Markdown 导入

支持：

```txt
单个 .md
单个 .mdx
zip：Markdown + images
```

导入过程：

```txt
解析 frontmatter
自动生成 slug
上传本地图片到 R2
替换 Markdown 图片路径
生成 content_html
保存为 draft 或 published
```

### HTML 导入

支持：

```txt
.html
.htm
zip：index.html + assets
```

HTML 模式：

```txt
sanitized：安全 HTML
trusted：Admin only，通过 iframe sandbox 渲染
```

### 图片集导入

支持：

```txt
批量图片上传
zip 图片包上传
自动创建 gallery 类型文章
```

### 导出

支持：

```txt
全部文章 Markdown
全部 HTML
全部图片资源
站点设置 JSON
评论 JSON / CSV
完整备份 ZIP
```

导出目录结构：

```txt
export/
  posts/
  assets/
  comments.json
  site.json
```

---

## 7.7 OpenAPI / API Token

提供：

```txt
/openapi.json
/docs/api
```

核心 API：

```txt
POST /api/posts
PATCH /api/posts/:id
GET /api/posts
GET /api/posts/:id
DELETE /api/posts/:id

POST /api/import/markdown
POST /api/import/html
POST /api/import/zip

POST /api/assets
GET /api/assets

GET /api/export

POST /api/comments/:id/approve
POST /api/comments/:id/spam
POST /api/comments/:id/delete
```

API Token 支持：

```txt
创建
撤销
设置过期时间
查看最后使用时间
权限范围控制
```

权限范围：

```txt
posts:read
posts:write
posts:publish
assets:write
comments:moderate
site:read
site:write
export:read
```

---

## 7.8 OpenAPI 自动化

主路径：

```txt
OpenAPI + API Token + Skill
```

基础接口：

```txt
GET /openapi.json
POST /api/posts
PATCH /api/posts/:id
POST /api/import/markdown
POST /api/import/html
POST /api/import/zip
POST /api/assets
GET /api/export
POST /api/backups
POST /api/comments/:id/approve
```

AI 使用场景：

```txt
AI 通过 OpenAPI 发布文章
AI 通过 OpenAPI 导入 Markdown
AI 通过 OpenAPI 导出备份
AI 通过 OpenAPI 处理评论审核
AI 通过 OpenAPI 验证站点状态
```

---

# 8. AI Skill 需求

## 8.1 Skill 名称

```txt
01mvp-blog
```

## 8.2 Skill 目标

让 AI 能够尽可能自动完成一个新博客的初始化、Cloudflare 资源配置、部署和验证。

## 8.3 Skill 执行原则

```txt
AI 自动执行优先
用户授权兜底
手动操作最后兜底
```

优先使用：

```txt
Cloudflare 官方 Skill / Agent Skill
Wrangler 或 Cloudflare API，由 Cloudflare Skill 负责
Computer Use，如果需要操作 Dashboard
API Token
```

## 8.4 Skill 初始化流程

流程：

```txt
1. 询问项目名称
2. 询问博客名称
3. 询问博客描述
4. 询问作者名称
5. 询问作者邮箱
6. 确认部署域名 blog.01mvp.com
7. 询问主题风格
8. 询问是否启用评论
9. 询问是否启用 Email Sending
10. 询问是否启用 GitHub Actions / CI
11. 检查本地 Node / pnpm / vp，并建议安装 Cloudflare 对应 Skill
12. 克隆模板或使用 create 命令初始化
13. 写入站点配置
14. 生成 Tailwind theme preset
15. 通过 Cloudflare Skill 处理登录、资源、DNS 和部署
16. 写入 wrangler 配置
17. 执行数据库迁移
18. 部署 Worker
19. 创建 Admin 用户
20. 创建或引导创建 API Token
21. 通过 /openapi.json 验证自动化接口
22. 通过 OpenAPI 写入站点设置
23. 通过 OpenAPI 创建第一篇文章、上传资源、导出备份
24. 验证前台访问
25. 验证后台登录
26. 验证第一篇示例文章
27. 验证 RSS / sitemap / OG
28. 输出 OpenAPI 维护说明
```

## 8.5 Skill 人工介入点

只有以下场景让用户操作：

```txt
Cloudflare 登录授权
Cloudflare 账号注册
接受条款
选择是否开通 Paid
手动创建 API Token
复制 Token 给 AI
确认 DNS 修改
完成域名验证
完成邮箱验证
```

## 8.6 Skill 验收

Skill 必须能完成初始化并部署到：

```txt
blog.01mvp.com
```

且部署记录必须来自 Skill 模拟真实用户流程，不能手工搭建后补材料。

---

# 9. 版本路线图

## Phase 1：CMS 核心闭环

目标：模板站 `blog.01mvp.com` 可以作为完整博客 CMS 使用。

功能：

```txt
基于 tanstarter-plus 初始化
Cloudflare Workers 部署
D1 数据库
R2 图片上传
邮箱 + 密码登录
后台文章 CRUD
MDXEditor
前台首页
博客列表
文章详情
标签
归档
关于页
自研评论系统
评论默认待审核
后台评论审核
Turnstile 防垃圾
基础站点设置
Tailwind theme preset
SEO metadata
RSS
sitemap
robots.txt
基础 OG
```

验收标准：

```txt
1. blog.01mvp.com 可访问。
2. 后台可登录。
3. 可创建 Admin 用户。
4. 可新建文章。
5. 可编辑 Markdown 内容。
6. 可上传图片到 R2。
7. 可发布文章。
8. 前台文章详情页正常渲染。
9. 文章 SEO metadata 正常。
10. /rss.xml 可访问。
11. /sitemap.xml 可访问。
12. /robots.txt 可访问。
13. 评论可提交。
14. 评论默认进入 pending。
15. 后台可审核评论。
16. 审核后评论在前台展示。
17. 不开启 Cloudflare Email Sending 也能完整运行。
```

---

## Phase 2：导入导出 + OpenAPI 自动化

目标：内容可迁移，AI 可自动化操作。

功能：

```txt
Markdown 导入
HTML 导入基础版
ZIP 导入：Markdown + 图片
完整导出
API Token
OpenAPI JSON
API 文档页
OpenAPI 发布
OpenAPI 导入
OpenAPI 导出
OpenAPI 备份
OpenAPI 评论审核
内容校验
```

验收标准：

```txt
1. 可以上传 Markdown 创建文章。
2. 可以上传 HTML 创建文章。
3. 可以上传 ZIP 导入 Markdown + 图片。
4. 可以导出完整站点数据。
5. 导出的 Markdown 可被其他静态博客读取。
6. /openapi.json 可访问。
7. API Token 可创建和撤销。
8. OpenAPI 可发布一篇文章。
9. OpenAPI 可导出内容。
10. AI 可通过 OpenAPI 完成“创建文章 -> 发布 -> 返回 URL”。
```

---

## Phase 3：邮件与自动任务增强

目标：启用 Cloudflare Email Sending 后，系统具备通知和自动备份能力。

功能：

```txt
评论邮件通知
忘记密码邮件
可选邮箱验证码登录
导入导出完成通知
手动备份
备份 ZIP 存 R2
备份保留策略
```

验收标准：

```txt
1. 开启 Email Sending 后，评论会发邮件给站长。
2. 忘记密码邮件可用。
3. 导出任务完成后可发邮件通知。
4. 自动备份可按计划生成。
5. R2 中可看到备份文件。
6. 关闭 Email Sending 后，系统仍能正常登录和管理。
```

---

## Phase 4：Skill 端到端复现

目标：验证 AI Skill 能基于模板生成一个新博客站点。

功能：

```txt
Skill 安装
Skill 初始化
Skill 自动配置项目
Skill 自动调用 OpenAPI
Skill 推荐使用 Cloudflare Skill 处理资源与部署
Skill 部署站点
Skill 创建第一篇文章
Skill 生成执行日志
```

验收站点：

```txt
blog.01mvp.com
```

验收标准：

```txt
1. blog.01mvp.com 可访问。
2. 该站点由 Skill 生成，而不是手工搭建。
3. 站点名称、作者、描述、主题风格来自模拟用户输入。
4. 后台可登录。
5. 可发布文章。
6. 可上传图片。
7. 可提交评论。
8. 可审核评论。
9. RSS 可访问。
10. sitemap 可访问。
11. OG metadata 正常。
12. Skill 产生日志，明确记录 AI 自动完成的步骤和用户授权步骤。
13. 如果某些 Cloudflare 步骤无法自动完成，Skill 能正确提示用户创建 Token 或完成 Dashboard 操作。
```

---

# 10. 验收总标准

最终项目完成时，必须交付：

```txt
1. GitHub 仓库：01mvp-blog-starter
2. 统一部署站点：blog.01mvp.com
3. 完整 PRD：docs/prd.md
4. 架构文档：docs/specs/architecture.md
5. 部署文档：docs/specs/deployment.md
6. API 文档：docs/specs/api.md
7. Skill 文档：docs/specs/skill.md
8. 验收文档：docs/specs/acceptance.md
9. Skill 包：skills/01mvp-blog
```

最终必须证明两件事：

```txt
1. 模板本身是一个可运行、可部署、可写作、可评论、可导入导出、可自动化操作的 Cloudflare-native Personal Blog CMS。
2. AI 安装 Skill 后，可以基于模板创建一个新的、独立的、可访问的博客站点。
```

---

# 11. 给 Codex 的最终任务摘要

可以直接把下面这段放进任务说明：

```txt
基于 https://github.com/mugnavo/tanstarter-plus 构建 01mvp-blog-starter。

这是一个 Cloudflare-native Personal Blog CMS + AI Init Skill 项目。

要求：
1. 使用 tanstarter-plus 作为主底座。
2. 参考 mohamede1945/tanstack-start-blog 的博客功能，包括 SEO、RSS、OG、博客前台结构。
3. 使用 TanStack Start + Cloudflare Workers。
4. 使用 D1 存储文章、评论、设置、用户和 API Token。
5. 使用 R2 存储图片、附件、导入包和备份包。
6. 使用 MDXEditor 作为 Markdown-first 编辑器。
7. 实现后台 CMS：登录、文章管理、图片上传、评论审核、站点设置。
8. 实现前台博客：首页、文章列表、文章详情、标签、关于页、作品集。
9. 实现评论系统：匿名昵称 + 邮箱 + 内容，默认 pending，后台审核，Turnstile 防垃圾。
10. 实现 SEO、RSS、sitemap、robots.txt、基础 OG。
11. 实现导入导出、OpenAPI、API Token 和 Skill 自动化。
12. 实现 skills/01mvp-blog，让 AI 可以自动初始化、部署和维护一个新博客。
13. 最终交付唯一站点：blog.01mvp.com。
14. 邮件发送基于 Cloudflare Email Service，作为 Phase 3 可选增强，不得阻塞免费核心版。
15. 所有功能按 Phase 1-4 分阶段实现和验收。
```

最终拍板版：

```txt
主底座：mugnavo/tanstarter-plus
博客参考：mohamede1945/tanstack-start-blog
(以下面这个域名为准）
统一部署站点：blog.01mvp.com （站点中需要有文档，README 中也说明这个仓库）
项目定位：Cloudflare-native Personal Blog CMS + AI Init Skill
代码放在 github.com/01mvp/blog-starter 中， 开源 MIT
```

[1]: https://github.com/mugnavo/tanstarter-plus?utm_source=chatgpt.com "mugnavo/tanstarter-plus: Vite+ monorepo template with 🏝️ ..."
[2]: https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/?utm_source=chatgpt.com "TanStack Start · Cloudflare Workers docs"
[3]: https://developers.cloudflare.com/changelog/post/2025-10-24-tanstack-start/?utm_source=chatgpt.com "Build TanStack Start apps with the Cloudflare Vite plugin"
