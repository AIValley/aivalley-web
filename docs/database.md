# 数据模型

数据库为 **SQLite**（`prisma/dev.db`），由 **Prisma 6** 管理，schema 定义在 `prisma/schema.prisma`。

## 模型

### User（用户）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | String (cuid) | 主键 |
| email | String | 唯一，登录邮箱 |
| name | String? | 昵称 |
| passwordHash | String | 密码哈希（scrypt） |
| role | String | `USER` / `ADMIN`，默认 `USER` |
| createdAt | DateTime | 创建时间 |

### Session（会话）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | String (cuid) | 主键 |
| token | String | 唯一，随机 64 位十六进制 |
| userId | String | 关联用户（级联删除） |
| expiresAt | DateTime | 过期时间（默认 30 天） |
| createdAt | DateTime | 创建时间 |

### Resource（资源）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | String (cuid) | 主键 |
| type | String | `tool` / `model` / `agent` / `learning` |
| nameEn / nameZh | String | 英文 / 简体中文名称 |
| descEn / descZh | String | 英文 / 简体中文简介 |
| nameI18n | String | JSON 字符串：名称的多语言映射 |
| descI18n | String | JSON 字符串：简介的多语言映射 |
| url | String | 外链地址 |
| category | String | 分类（见下方枚举） |
| tags | String | JSON 字符串数组 |
| pricing | String | `free` / `freemium` / `paid` |
| logo | String? | 图标（emoji），为空时用类型默认图标 |
| featured | Boolean | 是否精选，默认 `false` |
| status | String | `PUBLISHED` / `PENDING` / `REJECTED` |
| submittedById | String? | 提交者（自建资源为空） |
| createdAt | DateTime | 创建时间 |

### Favorite（收藏）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | String (cuid) | 主键 |
| userId | String | 用户 |
| resourceId | String | 资源 |
| createdAt | DateTime | 收藏时间 |

`userId + resourceId` 唯一，防止重复收藏。

### Post（博客文章）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | String (cuid) | 主键 |
| slug | String | 唯一，URL 标识 |
| titleEn / titleZh | String | 标题 |
| contentEn / contentZh | String | 正文（Markdown） |
| published | Boolean | 是否发布，默认 `true` |
| createdAt / updatedAt | DateTime | 时间 |

## 枚举值

**资源类型 `type`**：`tool`（工具）、`model`（模型）、`agent`（Agent）、`learning`（学习）

**分类 `category`**（12 种）：

`chat`（对话助手）、`image`（图像）、`video`（视频）、`audio`（音频）、`code`（编程）、`writing`（写作）、`productivity`（效率）、`search`（搜索）、`research`（研究）、`data`（数据）、`multimodal`（多模态）、`framework`（框架）

**价格 `pricing`**：`free`（免费）、`freemium`（部分免费）、`paid`（付费）

**状态 `status`**：`PUBLISHED`（已上架）、`PENDING`（待审核）、`REJECTED`（已驳回）

## 迁移与填充

```bash
npm run db:push   # 同步 schema（生成/更新表结构）
npm run db:seed   # 填充数据
```

> 说明：项目使用 `db push` 而非 `migrate`（本地轻量场景）。修改 schema 后运行 `db:push` 即可同步。

## JSON 字符串字段

`tags`、`nameI18n`、`descI18n` 在 SQLite 中以 JSON 字符串存储：

```jsonc
// tags
["chatbot", "assistant", "openai"]

// nameI18n / descI18n
{ "zh-TW": "通義千問", "ja": "アリババ…" }
```

读取时由 `lib/resources/queries.ts` 的 `parseJson` 解析为对象/数组（`toDto` 转换），前端拿到的是结构化的 `Resource` DTO（见 `lib/resources/types.ts`）。
