import Link from "next/link";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { isLocale, type Locale } from "@/lib/i18n";
import { getFeaturedResources, getStats } from "@/lib/resources/queries";
import { typePath } from "@/lib/resources/meta";
import { getTaxonomy, optionLabel } from "@/lib/resources/options";
import { ResourceCard } from "@/components/resource-card";
import { TypeIcon } from "@/components/type-icon";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "zh";
  const t = await getTranslations({ locale });

  const [featured, stats, taxonomy] = await Promise.all([
    getFeaturedResources(),
    getStats(),
    getTaxonomy(),
  ]);
  const typeOptions = taxonomy.type;

  const statItems = [
    { key: "resources", value: stats.resources },
    { key: "tools", value: stats.tools },
    { key: "models", value: stats.models },
    { key: "agents", value: stats.agents },
    { key: "learning", value: stats.learning },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4">
      {/* Hero */}
      <section className="flex flex-col items-center py-20 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-foreground">
          <Sparkles className="size-4 text-primary" />
          {t("hero.badge")}
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {t("hero.title")}{" "}
          <span className="text-gradient">{t("hero.titleHighlight")}</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg text-muted-foreground">
          {t("hero.subtitle")}
        </p>

        <form
          action={`/${locale}/explore`}
          method="GET"
          className="mt-8 flex w-full max-w-xl items-center gap-2 rounded-xl border border-border bg-card p-1.5 transition-shadow focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-ring/30"
        >
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              name="q"
              placeholder={t("hero.searchPlaceholder")}
              className="h-10 w-full rounded-lg bg-transparent pl-9 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none"
            />
          </div>
          <button
            type="submit"
            className="h-10 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
          >
            {t("hero.browseAll")}
          </button>
        </form>
      </section>

      {/* 统计 */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {statItems.map((item) => (
          <div key={item.key} className="glass rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gradient">{item.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">
              {t(`home.stats.${item.key}`)}
            </div>
          </div>
        ))}
      </section>

      {/* 精选 */}
      <section className="mt-16">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">{t("home.featuredTitle")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("home.featuredSubtitle")}
            </p>
          </div>
          <Link
            href={`/${locale}/explore`}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("home.viewAll")}
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((r) => (
            <ResourceCard key={r.id} resource={r} locale={locale} />
          ))}
        </div>
      </section>

      {/* 按类型浏览 */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold">{t("home.browseByType")}</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
          {typeOptions.map((o) => (
            <Link
              key={o.value}
              href={`/${locale}${typePath(o.value)}`}
              className="glass group flex flex-col items-center gap-3 rounded-xl p-8 transition-all hover:-translate-y-0.5 hover:border-primary/40"
            >
              <TypeIcon type={o.value} className="size-9 text-primary" />
              <span className="font-medium text-foreground">
                {optionLabel(locale, o.labelI18n, o.value)}
              </span>
              <span className="text-sm text-muted-foreground">
                {o.labelI18n.en}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
