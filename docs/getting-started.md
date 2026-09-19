# 快速开始

## 环境要求

- **Node.js 20+**（项目按 Node 20 类型定义，建议使用 20 或更高版本）
- 无需额外数据库服务 —— 使用本地 SQLite（`prisma/dev.db`）

## 安装依赖

```bash
npm install
```

## 配置环境变量

项目已提供 `.env.example`，内容为：

```env
# SQLite 数据库文件（相对于 prisma/ 目录）
DATABASE_URL="file:./dev.db"
```

首次使用时复制一份为 `.env`（若已存在则跳过）：

```bash
cp .env.example .env
```

## 初始化数据库

```bash
# 1. 根据 schema 生成/同步数据库表
npm run db:push

# 2. 填充初始数据（69 条资源 + 博客文章 + 管理员账号）
npm run db:seed
```

`db:seed` 是幂等的：资源会先清空再重新填充，管理员账号和博客文章已存在时会跳过。

## 运行开发服务器

```bash
npm run dev
```

打开 <http://localhost:3000>，会自动跳转到默认语言 `/zh`。

## 生产构建

```bash
npm run build   # 构建产物到 .next/
npm start       # 启动生产服务器
```

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 启动开发服务器（热更新） |
| `npm run build` | 生产构建 |
| `npm start` | 启动生产服务器 |
| `npm run lint` | 代码检查 |
| `npm run db:push` | 同步 Prisma schema 到 SQLite |
| `npm run db:seed` | 填充初始数据 |

## 默认管理员账号

seed 脚本会创建一个管理员账号（若不存在）：

- 邮箱：`admin@aivalley.local`
- 初始密码：见 `prisma/seed.ts`（首次 seed 时也会打印到控制台）

> ⚠️ 登录后请在「仪表板 → 账户」里修改密码。

管理员可以访问 `/admin` 审核用户提交的资源，并在仪表板管理资源与用户。

## 常用页面路径

| 路径（以 `/zh` 为例） | 说明 |
| --- | --- |
| `/zh` | 首页 |
| `/zh/explore` | 浏览 + 搜索/筛选/排序 |
| `/zh/r/[id]` | 资源详情 |
| `/zh/favorites` | 我的收藏（需登录） |
| `/zh/submit` | 提交资源（需登录） |
| `/zh/blog`、`/zh/blog/[slug]` | 博客 |
| `/zh/login` | 登录 / 注册 |
| `/zh/dashboard` | 个人仪表板（需登录） |
| `/zh/admin` | 管理后台（需管理员） |
