# AI Valley 项目文档

AI Valley 是一个精心整理的 **AI 资源中心**：聚合 AI 工具 / 模型 / Agent / 学习资料，支持搜索筛选、收藏、提交审核、博客，并提供中英等多语言界面。

本目录存放项目的技术文档，按主题拆分：

| 文档 | 说明 |
| --- | --- |
| [getting-started.md](./getting-started.md) | 快速开始：安装、初始化数据库、运行、构建、默认账号 |
| [architecture.md](./architecture.md) | 架构总览：技术栈、目录结构、数据流、关键设计 |
| [database.md](./database.md) | 数据模型：Prisma schema、字段与枚举、迁移命令 |
| [i18n.md](./i18n.md) | 多语言系统：9 种语言、界面文案与资源内容翻译、如何扩展 |
| [authentication.md](./authentication.md) | 认证与会话：邮箱密码登录、会话、角色、管理员 |

## 一分钟了解项目

- **框架**：Next.js 16（App Router）+ React 19 + TypeScript
- **样式**：Tailwind CSS 4，深色科技感主题
- **数据库**：SQLite + Prisma 6（本地 `dev.db`，无需云服务）
- **登录**：自建邮箱密码登录（`crypto.scrypt` 加盐哈希 + httpOnly 会话 cookie）
- **语言**：9 种语言（默认中文），`/[locale]` 路由前缀

## 快速开始（最简）

```bash
npm install
npm run db:push   # 生成数据库
npm run db:seed   # 填充资源 + 管理员账号
npm run dev       # 打开 http://localhost:3000（自动跳转 /zh）
```

详细步骤见 [getting-started.md](./getting-started.md)。
