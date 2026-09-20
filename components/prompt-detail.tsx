import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/lib/i18n";
import { getCurrentUser } from "@/lib/auth";
import { getRelatedByType, isFavorited } from "@/lib/resources/queries";
import type { Resource } from "@/lib/resources/types";
import { localize } from "@/lib/resources/meta";
import { optionLabel } from "@/lib/resources/options";
import { ResourceCard } from "./resource-card";
import { ResourceLogo } from "./resource-logo";
import { Badge } from "./ui/badge";
import { FavoriteButton } from "./favorite-button";

export async function PromptDetail({
  resource,
  locale,
  backHref,
}: {
  resource: Resource;
  locale: Locale;
  backHref: string;
}) {
  const t = await getTranslations({ locale });
  const user = await getCurrentUser();
  const favorited = user ? await isFavorited(user.id, resource.id) : false;
  const related = await getRelatedByType(resource.id, "prompt");

  const name = localize(locale, resource.nameEn, resource.nameZh, resource.nameI18n);
  const desc = localize(locale, resource.descEn, resource.descZh, resource.descI18n);

  const spec = resource.spec;
  const content = spec?.content ?? null;
  const variables = spec?.variables ?? [];
  const model = spec?.model ?? null;
  const author = spec?.author ?? null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {t("detail.back")}
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* 左栏：主内容 */}
        <div className="min-w-0">
          <div className="flex items-start gap-4">
            <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-foreground/5">
              <ResourceLogo
                logo={resource.logo}
                type={resource.type}
                className="size-8 text-primary"
              />
            </span>
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl font-bold">{name}</h1>
              <p className="mt-2 text-muted-foreground">{desc}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Badge>{optionLabel(locale, resource.typeLabelI18n, resource.type)}</Badge>
                <Badge>{optionLabel(locale, resource.categoryLabelI18n, resource.category)}</Badge>
                <Badge>{optionLabel(locale, resource.pricingLabelI18n, resource.pricing)}</Badge>
              </div>
            </div>
          </div>

          {content && (
            <section className="mt-8">
              <h2 className="text-lg font-semibold">{t("prompt.content")}</h2>
              <pre className="mt-3 whitespace-pre-wrap rounded-xl border border-border bg-foreground/5 p-5 font-mono text-sm leading-relaxed text-foreground/90">
                {content}
              </pre>
            </section>
          )}

          {variables.length > 0 && (
            <section className="mt-8">
              <h2 className="text-lg font-semibold">{t("prompt.variables")}</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {variables.map((v) => (
                  <span
                    key={v}
                    className="rounded-lg border border-border bg-foreground/5 px-2.5 py-1 font-mono text-xs text-foreground/90"
                  >
                    {`{{${v}}}`}
                  </span>
                ))}
              </div>
            </section>
          )}

          {related.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-bold">{t("prompt.related")}</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {related.map((r) => (
                  <ResourceCard key={r.id} resource={r} locale={locale} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* 右栏：侧边栏 */}
        <aside className="space-y-4">
          <div className="glass rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                {t("favorite.add")}
              </span>
              <FavoriteButton resourceId={resource.id} initialFavorited={favorited} />
            </div>
          </div>

          {(model || author) && (
            <div className="glass rounded-xl p-4">
              <dl className="space-y-2 text-sm">
                {model && (
                  <div className="flex items-center gap-2">
                    <dt className="shrink-0 text-muted-foreground">{t("submit.model")}</dt>
                    <dd className="text-foreground">{model}</dd>
                  </div>
                )}
                {author && (
                  <div className="flex items-center gap-2">
                    <dt className="shrink-0 text-muted-foreground">{t("submit.author")}</dt>
                    <dd className="text-foreground">{author}</dd>
                  </div>
                )}
              </dl>
            </div>
          )}

          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground shadow-[0_0_20px_-6px_var(--primary)] transition-opacity hover:opacity-90"
          >
            {t("detail.visit")}
            <ArrowUpRight className="size-4" />
          </a>
        </aside>
      </div>
    </div>
  );
}
