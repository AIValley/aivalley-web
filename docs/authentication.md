# 认证与会话

AI Valley 采用**自建邮箱密码登录**，不依赖第三方服务。密码用 Node 内置 `crypto.scrypt` 加盐哈希，会话存数据库 + httpOnly cookie。

## 核心文件

| 文件 | 职责 |
| --- | --- |
| `lib/password.ts` | `hashPassword()` / `verifyPassword()`，基于 `crypto.scrypt` 加盐哈希 |
| `lib/auth.ts` | 会话管理：`createSession()` / `deleteSession()` / `getCurrentUser()` |
| `lib/actions.ts` | 注册、登录、登出等 Server Actions |

## 密码哈希

- 使用 `crypto.scrypt` + 随机盐，存储格式为 `盐:哈希`（十六进制）。
- 登录时 `verifyPassword()` 重新计算并比对，明文密码不落库。

## 会话

- 登录成功后生成一个 64 位随机 token，写入 `Session` 表（`token` 唯一 + `expiresAt`）。
- cookie 名为 `session`，属性：`httpOnly`、`SameSite=Lax`、生产环境 `secure`、有效期 30 天。
- `getCurrentUser()` 是 React `cache` 包裹的服务端函数，读取 cookie → 查会话 → 校验过期 → 返回用户信息（含 `role`）。

## 角色

| 角色 | 说明 |
| --- | --- |
| `USER` | 普通用户，可收藏、提交资源、使用仪表板 |
| `ADMIN` | 管理员，可审核资源、管理资源与用户（`/admin`、仪表板管理页） |

服务端组件/Server Action 通过 `getCurrentUser()` 判断登录态与角色，未登录访问受保护页面会被重定向到登录页。

## 主要流程

1. **注册**：校验邮箱唯一 → `hashPassword` → 建 `User`（`role="USER"`）→ 建会话 → 写 cookie。
2. **登录**：查用户 → `verifyPassword` → 建会话 → 写 cookie。
3. **登出**：删除对应 `Session` 记录 + 清除 cookie。

## 如何创建/提升管理员

- **默认管理员**：seed 脚本自动创建 `admin@aivalley.local`（初始密码见 `prisma/seed.ts`）。
- **提升已有用户为管理员**：将其 `role` 字段改为 `ADMIN`。可直接修改数据库，或在 seed/脚本中设置。
