"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, List, Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/lib/i18n";
import type { Resource } from "@/lib/resources/types";
import { localize } from "@/lib/resources/meta";
import { optionLabel, type EnumOptionDto } from "@/lib/resources/options";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { ResourceCard } from "./resource-card";
import { ResourceListItem } from "./resource-list-item";
import { TypeIcon } from "./type-icon";

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors",
        active
          ? "border-primary/50 bg-primary/15 text-foreground"
          : "border-border text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

function FilterItem({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={cn(
          "flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-colors",
          active
            ? "bg-primary/15 font-medium text-foreground"
            : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        )}
      >
        {children}
      </button>
    </li>
  );
}

function FilterList({
  locale,
  title,
  options,
  value,
  onChange,
  allLabel,
}: {
  locale: Locale;
  title: string;
  options: EnumOptionDto[];
  value: string;
  onChange: (v: string) => void;
  allLabel: string;
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      <ul className="mt-2 space-y-1">
        <FilterItem active={value === "all"} onClick={() => onChange("all")}>
          {allLabel}
        </FilterItem>
        {options.map((o) => (
          <FilterItem
            key={o.value}
            active={value === o.value}
            onClick={() => onChange(o.value)}
          >
            {optionLabel(locale, o.labelI18n, o.value)}
          </FilterItem>
        ))}
      </ul>
    </div>
  );
}

function Tab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "relative px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
      {active && (
        <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary" />
      )}
    </button>
  );
}

export function ExploreClient({
  resources,
  favoriteIds,
  initialQ = "",
  initialType = "all",
  showTypeFilter = true,
  sidebar = false,
  typeOptions,
  categoryOptions,
  pricingOptions,
}: {
  resources: Resource[];
  favoriteIds: string[];
  initialQ?: string;
  initialType?: string;
  showTypeFilter?: boolean;
  sidebar?: boolean;
  typeOptions: EnumOptionDto[];
  categoryOptions: EnumOptionDto[];
  pricingOptions: EnumOptionDto[];
}) {
  const t = useTranslations();
  const locale = useLocale();
  const [q, setQ] = useState(initialQ);
  const [type, setType] = useState<string>(initialType);
  const [category, setCategory] = useState<string>("all");
  const [pricing, setPricing] = useState<string>("all");
  const [sort, setSort] = useState<"featured" | "name">("featured");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchOpen, setSearchOpen] = useState(false);
  const [tab, setTab] = useState<"trending" | "featured" | "recent">("trending");

  const isZh = locale.startsWith("zh");

  const favSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    const list = resources.filter((r) => {
      if (type !== "all" && r.type !== type) return false;
      if (category !== "all" && r.category !== category) return false;
      if (pricing !== "all" && r.pricing !== pricing) return false;
      if (sidebar && tab === "featured" && !r.featured) return false;
      if (query) {
        const haystack =
          `${r.nameEn} ${r.nameZh} ${r.descEn} ${r.descZh} ${r.tags.join(" ")}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });

    return list.sort((a, b) => {
      const byDate =
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sidebar) {
        if (tab === "recent" || tab === "featured") return byDate;
        // trending：收藏数优先，其次精选，再按最新
        return (
          b.favoriteCount - a.favoriteCount ||
          Number(b.featured) - Number(a.featured) ||
          byDate
        );
      }
      if (sort === "name") {
        return localize(locale, a.nameEn, a.nameZh, a.nameI18n).localeCompare(
          localize(locale, b.nameEn, b.nameZh, b.nameI18n)
        );
      }
      return Number(b.featured) - Number(a.featured);
    });
  }, [resources, q, type, category, pricing, tab, sort, sidebar, locale]);

  // sidebar 模式下，Category / Pricing 移到左侧栏，移动端仍以内联 chips 展示
  const inlineChipCls = sidebar ? "lg:hidden" : undefined;

  const content = (
    <>
      {!sidebar && (
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("explore.searchPlaceholder")}
            className="pl-9"
          />
        </div>
      )}

      {showTypeFilter && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">{t("explore.type")}</span>
          <Chip active={type === "all"} onClick={() => setType("all")}>
            {t("explore.all")}
          </Chip>
          {typeOptions.map((o) => (
            <Chip key={o.value} active={type === o.value} onClick={() => setType(o.value)}>
              <TypeIcon type={o.value} className="size-3.5" />
              {optionLabel(locale, o.labelI18n, o.value)}
            </Chip>
          ))}
        </div>
      )}

      <div className={cn("flex flex-wrap items-center gap-2", inlineChipCls)}>
        <span className="text-sm text-muted-foreground">
          {t("explore.category")}
        </span>
        <Chip active={category === "all"} onClick={() => setCategory("all")}>
          {t("explore.all")}
        </Chip>
        {categoryOptions.map((o) => (
          <Chip key={o.value} active={category === o.value} onClick={() => setCategory(o.value)}>
            {optionLabel(locale, o.labelI18n, o.value)}
          </Chip>
        ))}
      </div>

      <div className={cn("flex flex-wrap items-center gap-2", inlineChipCls)}>
        <span className="text-sm text-muted-foreground">
          {t("explore.pricing")}
        </span>
        <Chip active={pricing === "all"} onClick={() => setPricing("all")}>
          {t("explore.all")}
        </Chip>
        {pricingOptions.map((o) => (
          <Chip key={o.value} active={pricing === o.value} onClick={() => setPricing(o.value)}>
            {optionLabel(locale, o.labelI18n, o.value)}
          </Chip>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <p className="text-sm text-muted-foreground">
            {t("explore.results", { count: filtered.length })}
          </p>

          {!sidebar && (
            <div className="flex items-center gap-1">
              <Chip active={sort === "featured"} onClick={() => setSort("featured")}>
                {t("explore.sortFeatured")}
              </Chip>
              <Chip active={sort === "name"} onClick={() => setSort("name")}>
                {t("explore.sortName")}
              </Chip>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">

          {sidebar && (
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              title={isZh ? "搜索" : "Search"}
              aria-label={isZh ? "搜索" : "Search"}
              aria-expanded={searchOpen}
              aria-pressed={searchOpen}
              className={cn(
                "flex size-9 items-center justify-center rounded-lg border border-border transition-colors",
                searchOpen
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
              )}
            >
              <Search className="size-4" />
            </button>
          )}

          <div className="flex shrink-0 items-center rounded-lg border border-border p-0.5">
            <button
              type="button"
              onClick={() => setView("grid")}
              title={isZh ? "卡片视图" : "Card view"}
              aria-label={isZh ? "卡片视图" : "Card view"}
              aria-pressed={view === "grid"}
              className={cn(
                "flex size-8 items-center justify-center rounded-md transition-colors",
                view === "grid"
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <LayoutGrid className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              title={isZh ? "列表视图" : "List view"}
              aria-label={isZh ? "列表视图" : "List view"}
              aria-pressed={view === "list"}
              className={cn(
                "flex size-8 items-center justify-center rounded-md transition-colors",
                view === "list"
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <List className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {sidebar && searchOpen && (
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("explore.searchPlaceholder")}
            className="pl-9"
            autoFocus
          />
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-muted-foreground">
          {t("explore.empty")}
        </p>
      ) : view === "list" ? (
        <div className="flex flex-col gap-3">
          {filtered.map((r) => (
            <ResourceListItem
              key={r.id}
              resource={r}
              locale={locale}
              favorited={favSet.has(r.id)}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <ResourceCard
              key={r.id}
              resource={r}
              locale={locale}
              favorited={favSet.has(r.id)}
            />
          ))}
        </div>
      )}
    </>
  );

  if (!sidebar) {
    return <div className="space-y-6">{content}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-1 border-b border-border">
        <Tab active={tab === "trending"} onClick={() => setTab("trending")}>
          {t("explore.tabTrending")}
        </Tab>
        <Tab active={tab === "featured"} onClick={() => setTab("featured")}>
          {t("explore.tabFeatured")}
        </Tab>
        <Tab active={tab === "recent"} onClick={() => setTab("recent")}>
          {t("explore.tabRecent")}
        </Tab>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
        <aside className="hidden shrink-0 lg:block lg:w-56">
          <div className="sticky top-20 max-h-[calc(100vh-6rem)] space-y-8 overflow-y-auto pr-1">
            <FilterList
              locale={locale}
              title={t("explore.category")}
              options={categoryOptions}
              value={category}
              onChange={setCategory}
              allLabel={t("explore.all")}
            />
            <FilterList
              locale={locale}
              title={t("explore.pricing")}
              options={pricingOptions}
              value={pricing}
              onChange={setPricing}
              allLabel={t("explore.all")}
            />
          </div>
        </aside>

        <div className="min-w-0 flex-1 space-y-6">{content}</div>
      </div>
    </div>
  );
}
