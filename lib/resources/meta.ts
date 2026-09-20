import type { I18nMap } from "./types";
import type { Locale } from "@/lib/i18n";

export function localize(
  locale: Locale,
  en: string,
  zh: string,
  i18n?: I18nMap
): string {
  if (locale === "zh") return zh;
  if (i18n?.[locale]) return i18n[locale];
  if (locale === "zh-TW") return zh; // 繁体缺省回退简体
  return en;
}

/** 资源类型的落地页路径：各类型走独立落地页，未知类型回退 /explore */
export function typePath(type: string): string {
  switch (type) {
    case "tool":
      return "/tools";
    case "model":
      return "/models";
    case "agent":
      return "/agents";
    case "learning":
      return "/learning";
    case "skill":
      return "/skills";
    case "prompt":
      return "/prompts";
    case "dataset":
      return "/datasets";
    default:
      return "/explore";
  }
}

/** 资源详情页路径：各类型走专属路径 /<typePath>/<type>/<id> */
export function detailPath(type: string, id: string): string {
  return `${typePath(type)}/${type}/${id}`;
}
