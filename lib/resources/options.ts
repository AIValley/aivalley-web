import { cache } from "react";
import { prisma } from "@/lib/db";
import type { Locale } from "@/lib/i18n";
import type { I18nMap } from "./types";
import { localize } from "./meta";

/** EnumOption 的四种 kind */
export const ENUM_KINDS = ["type", "category", "pricing", "status"] as const;
export type EnumKind = (typeof ENUM_KINDS)[number];

export function isEnumKind(value: string): value is EnumKind {
  return (ENUM_KINDS as readonly string[]).includes(value);
}

/** 序列化友好的选项 DTO（labelI18n 已解析为对象） */
export type EnumOptionDto = {
  id: string;
  kind: string;
  value: string;
  labelI18n: I18nMap;
  sortOrder: number;
  active: boolean;
};

export type Taxonomy = Record<EnumKind, EnumOptionDto[]>;

function parseI18n(json: string | null | undefined): I18nMap {
  try {
    const v = JSON.parse(json ?? "{}");
    return v && typeof v === "object" ? (v as I18nMap) : {};
  } catch {
    return {};
  }
}

function toDto(row: {
  id: string;
  kind: string;
  value: string;
  labelI18n: string;
  sortOrder: number;
  active: boolean;
}): EnumOptionDto {
  return {
    id: row.id,
    kind: row.kind,
    value: row.value,
    labelI18n: parseI18n(row.labelI18n),
    sortOrder: row.sortOrder,
    active: row.active,
  };
}

/** 取某个 kind 的启用选项（按 sortOrder 排序） */
export async function getEnumOptions(kind: EnumKind): Promise<EnumOptionDto[]> {
  const rows = await prisma.enumOption.findMany({
    where: { kind, active: true },
  });
  return rows.map(toDto);
}

/** 一次取回全部四类启用选项（React cache 保证单请求内只查一次库） */
export const getTaxonomy = cache(async (): Promise<Taxonomy> => {
  const rows = await prisma.enumOption.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });
  const taxonomy: Taxonomy = { type: [], category: [], pricing: [], status: [] };
  for (const row of rows) {
    if (isEnumKind(row.kind)) taxonomy[row.kind].push(toDto(row));
  }
  return taxonomy;
});

/**
 * 从选项的多语言标签解析当前语言文案，未知值回退显示原值。
 * 回退逻辑与 `localize` 一致：zh→zh、zh-TW→zh、其余优先 i18n[locale] 再 en。
 */
export function optionLabel(
  locale: Locale,
  i18n: I18nMap,
  fallback = ""
): string {
  const en = i18n.en ?? fallback;
  const zh = i18n.zh ?? fallback ?? en;
  const label = localize(locale, en, zh, i18n);
  return label || fallback;
}
