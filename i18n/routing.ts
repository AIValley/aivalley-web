import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // 所有支持的语言
  locales: ["zh", "zh-TW", "en", "ja", "ru", "ko", "es", "fr", "de"],
  // 无语言前缀时的默认语言
  defaultLocale: "zh",
});

export type AppLocale = (typeof routing.locales)[number];
