"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  Boxes,
  FileText,
  Heart,
  LayoutDashboard,
  ShieldCheck,
  Tags,
  User,
  Users,
} from "lucide-react";
import type { ComponentType } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type Item = {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
};

export function DashboardSidebar({
  locale,
  isAdmin,
  userName,
}: {
  locale: string;
  isAdmin: boolean;
  userName: string;
}) {
  const t = useTranslations();
  const pathname = usePathname();
  const base = `/${locale}/dashboard`;

  const items: Item[] = [
    { href: base, label: t("dashboard.nav.overview"), icon: LayoutDashboard },
    {
      href: `${base}/submissions`,
      label: t("dashboard.nav.submissions"),
      icon: FileText,
    },
    { href: `${base}/favorites`, label: t("dashboard.nav.favorites"), icon: Heart },
    { href: `${base}/account`, label: t("dashboard.nav.account"), icon: User },
  ];

  const adminItems: Item[] = [
    { href: `${base}/resources`, label: t("dashboard.nav.resources"), icon: Boxes },
    { href: `${base}/review`, label: t("dashboard.nav.review"), icon: ShieldCheck },
    { href: `${base}/taxonomy`, label: t("dashboard.nav.taxonomy"), icon: Tags },
    { href: `${base}/users`, label: t("dashboard.nav.users"), icon: Users },
  ];

  const all = isAdmin ? [...items, ...adminItems] : items;

  return (
    <aside className="w-full shrink-0 md:w-56">
      <div className="glass rounded-xl p-4">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-lg font-semibold text-primary">
            {userName.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              {userName}
            </p>
            {isAdmin && (
              <p className="text-xs text-accent">
                {t("dashboard.users.roleAdmin")}
              </p>
            )}
          </div>
        </div>

        <nav className="mt-3 flex flex-col gap-1">
          {all.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-primary/15 text-foreground"
                    : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href={`/${locale}`}
          className="mt-3 flex items-center gap-2 border-t border-border pt-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {t("dashboard.backToSite")}
        </Link>
      </div>
    </aside>
  );
}
