import Link from "next/link";
import { LayoutDashboard, LogOut, Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { SessionUser } from "@/lib/auth";
import { logout } from "@/lib/actions";
import type { Locale } from "@/lib/i18n";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Logo } from "./logo";
import { HeaderNav } from "./header-nav";
import type { EnumOptionDto } from "@/lib/resources/options";

export async function Header({
  locale,
  user,
  typeOptions,
}: {
  locale: Locale;
  user: SessionUser | null;
  typeOptions: EnumOptionDto[];
}) {
  const t = await getTranslations({ locale });

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="flex h-16 items-center justify-between gap-3 px-6 md:px-8 lg:px-10">
        <div className="flex gap-6">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <Logo/>
          </Link>
          <HeaderNav locale={locale} typeOptions={typeOptions} />
        </div>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
          <Link href={`/${locale}/submit`} className="hidden sm:block">
            <Button variant="outline" size="sm">
              {t("header.submit")}
            </Button>
          </Link>

          {user ? (
            <>
              <Link
                href={`/${locale}/dashboard`}
                className="inline-flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
                title={t("header.dashboard")}
                aria-label={t("header.dashboard")}
              >
                <LayoutDashboard className="size-4" />
              </Link>
              <form action={logout}>
                <Button variant="ghost" size="sm" type="submit">
                  <LogOut className="size-4" />
                  <span className="hidden sm:inline">{t("header.logout")}</span>
                </Button>
              </form>
            </>
          ) : (
            <Link href={`/${locale}/login`}>
              <Button size="sm">{t("header.login")}</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
