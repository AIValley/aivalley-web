"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { typePath } from "@/lib/resources/meta";
import { optionLabel, type EnumOptionDto } from "@/lib/resources/options";
import { cn } from "@/lib/utils";
import { TypeIcon } from "./type-icon";

export function HeaderNav({
  locale,
  typeOptions,
}: {
  locale: Locale;
  typeOptions: EnumOptionDto[];
}) {
  const pathname = usePathname();

  function isActive(type: string): boolean {
    const base = `/${locale}${typePath(type)}`;
    return pathname === base || pathname.startsWith(`${base}/`);
  }

  return (
    <nav className="hidden items-center gap-1 md:flex">
      {typeOptions.map((o) => {
        const active = isActive(o.value);
        return (
          <Link
            key={o.value}
            href={`/${locale}${typePath(o.value)}`}
            aria-current={active ? "page" : undefined}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors",
              active
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
            )}
          >
            <TypeIcon type={o.value} className="size-4" />
            {optionLabel(locale, o.labelI18n, o.value)}
          </Link>
        );
      })}
    </nav>
  );
}
