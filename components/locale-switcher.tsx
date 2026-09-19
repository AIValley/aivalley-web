"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, ChevronDown, Globe } from "lucide-react";
import { defaultLocale, locales, type Locale } from "@/lib/i18n";

const LABELS: Record<Locale, string> = {
  zh: "中文",
  "zh-TW": "繁體中文",
  en: "English",
  ja: "日本語",
  ru: "Русский",
  ko: "한국어",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
};

export function LocaleSwitcher() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current: Locale =
    locales.find(
      (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
    ) ?? defaultLocale;

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function targetPath(locale: Locale) {
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/") || `/${locale}`;
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
      >
        <Globe className="size-4" />
        <span>{LABELS[current]}</span>
        <ChevronDown
          className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="menu"
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-lg border border-border bg-card py-1 shadow-xl"
        >
          {locales.map((locale) => (
            <li key={locale}>
              <Link
                href={targetPath(locale)}
                onClick={() => setOpen(false)}
                role="menuitem"
                className="flex items-center justify-between px-3 py-2 text-sm text-foreground transition-colors hover:bg-foreground/5"
              >
                <span>{LABELS[locale]}</span>
                {locale === current && (
                  <Check className="size-4 text-primary" />
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
