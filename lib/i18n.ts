import { routing, type AppLocale } from "@/i18n/routing";

export const locales = routing.locales;
export const defaultLocale: Locale = routing.defaultLocale;
export type Locale = AppLocale;

export function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}
