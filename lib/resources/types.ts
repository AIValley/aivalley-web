import type { ResourceSpec } from "./spec";

export type ResourceType = "tool" | "model" | "agent" | "learning" | "skill" | "prompt" | "dataset";
export type Pricing = "free" | "freemium" | "paid";
export type ResourceStatus = "PUBLISHED" | "PENDING" | "REJECTED";

/** 多语言文案映射：键为 locale（如 zh-TW/ja/ru），值为对应译文 */
export type I18nMap = Record<string, string>;

export const RESOURCE_TYPES: ResourceType[] = [
  "tool",
  "model",
  "agent",
  "skill",
  "learning",
  "prompt",
  "dataset",
];

export const PRICINGS: Pricing[] = ["free", "freemium", "paid"];

export const CATEGORIES = [
  "chat",
  "image",
  "video",
  "audio",
  "code",
  "writing",
  "productivity",
  "search",
  "research",
  "data",
  "multimodal",
  "framework",
] as const;

export type Category = (typeof CATEGORIES)[number];

/**
 * 查询层返回给前端的资源 DTO（tags 已解析为数组、createdAt 为 ISO 字符串）。
 *
 * type / category / pricing / status 已改为数据库驱动的字符串（合法取值来自
 * `EnumOption` 表），因此这里用 `string` 而非联合类型；运行时若出现未知值，
 * 对应的 `*LabelI18n` 为空对象，调用方回退显示原值。
 */
export interface Resource {
  id: string;
  uuid: string;
  type: string;
  nameEn: string;
  nameZh: string;
  descEn: string;
  descZh: string;
  nameI18n: I18nMap;
  descI18n: I18nMap;
  url: string;
  category: string;
  tags: string[];
  pricing: string;
  logo: string | null;
  featured: boolean;
  status: string;
  createdAt: string;
  /** 被收藏的次数（用于「热门」排序） */
  favoriteCount: number;
  /** 类型专属字段（如 Model 的 provider/contextWindow），无子行或全空时为 null */
  spec: ResourceSpec | null;
  /** 从 EnumOption 解析的多语言标签映射（未知值回退空对象） */
  typeLabelI18n: I18nMap;
  categoryLabelI18n: I18nMap;
  pricingLabelI18n: I18nMap;
  statusLabelI18n: I18nMap;
}
