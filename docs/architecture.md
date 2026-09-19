# 架构总览

## 技术栈

| 用途 | 选择 |
| --- | --- |
| 框架 | Next.js 16（App Router + Turbopack） |
| UI 层 | React 19 + TypeScript 5 |
| 样式 | Tailwind CSS 4（CSS 变量 + `@theme`） |
| 数据库 | SQLite + Prisma 6 |
| 登录 | 自建邮箱密码（`crypto.scrypt` 加盐哈希 + 会话 cookie） |
| Markdown | react-markdown + remark-gfm |
| 图标 | lucide-react |
| 多语言 | 自建轻量 i18n（`[locale]` 路由 + 字典） |

## 目录结构

```
aivalley-web/
├── app/
│   ├── globals.css                 # 全局样式 + 主题变量
│   └── [locale]/                   # 多语言路由段（9 种语言）
│       ├── layout.tsx              # 根布局：Provider + Header/Footer + 主题初始化
│       ├── page.tsx                # 首页
│       ├── explore/page.tsx        # 浏览
│       ├── r/[id]/page.tsx         # 资源详情
│       ├── favorites/page.tsx      # 收藏
│       ├── submit/page.tsx         # 提交资源
│       ├── blog/…                  # 博客列表 + 详情
│       ├── login/page.tsx          # 登录 / 注册
│       ├── admin/page.tsx          # 管理后台（审核）
│       ├── about/page.tsx          # 关于
│       └── dashboard/…             # 仪表板（概览/收藏/资源/提交/账户/用户）
├── components/
│   ├── ui/                         # 基础组件：badge / button / input / textarea
│   ├── resource-card.tsx           # 资源卡片
│   ├── explore-client.tsx          # 搜索 / 筛选 / 排序（客户端）
│   ├── favorite-button.tsx         # 收藏按钮
│   ├── submit-form.tsx             # 提交表单
│   ├── login-form.tsx              # 登录 / 注册表单
│   ├── markdown.tsx                # Markdown 渲染
│   ├── providers.tsx               # 字典 / 语言上下文
│   ├── locale-switcher.tsx         # 语言切换
│   ├── theme-init.tsx / theme-toggle.tsx  # 主题
│   ├── header.tsx / footer.tsx
│   └── dashboard/…                 # 仪表板各子模块
├── lib/
│   ├── db.ts                       # Prisma client 单例
│   ├── auth.ts                     # 会话（createSession / getCurrentUser 等）
│   ├── password.ts                 # 密码哈希（scrypt）
│   ├── i18n.ts                     # locales + getDictionary
│   ├── actions.ts                  # Server Actions（注册/登录/收藏/审核等）
│   ├── utils.ts                    # cn 工具
│   └── resources/
│       ├── types.ts                # Resource 类型 + type/category/pricing 常量
│       ├── meta.ts                 # 类型/分类/价格的本地化标签 + localize()
│       ├── queries.ts              # Prisma 查询（DTO 转换）
│       └── seed-data.ts            # 初始资源（69 条，含多语言）与博客文章
├── messages/                       # 界面文案字典（9 种语言）
├── prisma/
│   ├── schema.prisma               # 数据模型
│   ├── seed.ts                     # 填充脚本
│   └── dev.db                      # SQLite 数据库（本地生成）
├── proxy.ts                        # 语言路由（/ → /zh，补全 locale 前缀）
└── package.json
```

## 数据流

1. **语言路由**：请求先经过 `proxy.ts`。无语言前缀的路径（如 `/`、`/explore`）会补上默认语言前缀 `/zh`。
2. **布局与取数**：`app/[locale]/layout.tsx` 解析 `locale` 并注入 `DictionaryProvider`；各页面在服务端通过 `lib/resources/queries.ts` 读取数据库。
3. **客户端交互**：搜索筛选、收藏、表单等由客户端组件处理，调用 Server Actions（`lib/actions.ts`）写回数据库后 `router.refresh()` 刷新。

## 关键设计

### JSON 字符串列

SQLite 不支持数组/对象字段，因此以下字段以 JSON 字符串存储、读取时解析：

- `tags`：字符串数组
- `nameI18n` / `descI18n`：多语言映射对象，如 `{ "zh-TW": "…", "ja": "…" }`

详见 [database.md](./database.md) 和 [i18n.md](./i18n.md)。

### 多语言回退（`localize`）

`lib/resources/meta.ts` 的 `localize(locale, en, zh, i18n?)` 按以下优先级返回文案：

1. `zh` → 简体中文
2. `i18n[locale]` → 该语言专有翻译（资源内容）
3. `zh-TW` → 回退到简体中文
4. 其它 → 回退到英文

### 主题无闪烁脚本

`components/theme-init.tsx` 通过 `useServerInsertedHTML` 在 HTML 中直接注入一段设置 `data-theme` 的脚本，避免 React 19 对 `<script>` 的告警，也避免页面刷新时主题闪烁。

### Server Actions

写操作（注册、登录、收藏、提交、审核、删除等）集中在 `lib/actions.ts`，页面/组件直接调用，无需手写 API 路由。
