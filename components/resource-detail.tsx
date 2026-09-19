import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/lib/i18n";
import { getCurrentUser } from "@/lib/auth";
import { getRelatedResources, isFavorited } from "@/lib/resources/queries";
import type { Resource } from "@/lib/resources/types";
import { localize } from "@/lib/resources/meta";
import { optionLabel } from "@/lib/resources/options";
import { ResourceCard } from "./resource-card";
import { ResourceLogo } from "./resource-logo";
import { Badge } from "./ui/badge";
import { FavoriteButton } from "./favorite-button";

function buildSpecItems(resource: Resource, t: (key: string) => string) {
  const s = resource.spec;
  if (!s) return [];
  const items: { label: string; value: string }[] = [];
  const push = (label: string, value: string) => items.push({ label, value });
  switch (resource.type) {
    case "tool":
      if (s.platform) push(t("submit.platform"), s.platform);
      if (s.apiAccess) push(t("submit.apiAccess"), "✓");
      break;
    case "model":
      if (s.provider) push(t("submit.provider"), s.provider);
      if (s.openSource) push(t("submit.openSource"), "✓");
      if (s.contextWindow != null)
        push(t("submit.contextWindow"), String(s.contextWindow));
      if (s.modalities?.length)
        push(t("submit.modalities"), s.modalities.join(", "));
      break;
    case "agent":
      if (s.agentKind) push(t("submit.agentKind"), s.agentKind);
      if (s.openSource) push(t("submit.openSource"), "✓");
      break;
    case "skill":
      if (s.author) push(t("submit.author"), s.author);
      if (s.version) push(t("submit.version"), s.version);
      if (s.trigger) push(t("submit.trigger"), s.trigger);
      break;
    case "learning":
      if (s.level) push(t("submit.level"), s.level);
      if (s.format) push(t("submit.format"), s.format);
      break;
  }
  return items;
}

export async function ResourceDetail({
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
  const related = await getRelatedResources(resource);

  const name = localize(locale, resource.nameEn, resource.nameZh, resource.nameI18n);
  const desc = localize(locale, resource.descEn, resource.descZh, resource.descI18n);
  const specs = buildSpecItems(resource, t);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {t("detail.back")}
      </Link>

      <div className="mt-6 glass rounded-2xl p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <span className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-foreground/5">
            <ResourceLogo
              logo={resource.logo}
              type={resource.type}
              className="size-9 text-primary"
            />
          </span>

          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-3xl font-bold">{name}</h1>
              <FavoriteButton
                resourceId={resource.id}
                initialFavorited={favorited}
              />
            </div>

            <p className="mt-3 text-muted-foreground">{desc}</p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              <Badge>{optionLabel(locale, resource.typeLabelI18n, resource.type)}</Badge>
              <Badge>{optionLabel(locale, resource.categoryLabelI18n, resource.category)}</Badge>
              <Badge>{optionLabel(locale, resource.pricingLabelI18n, resource.pricing)}</Badge>
            </div>

            {resource.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {resource.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-foreground/5 px-2.5 py-0.5 text-xs text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {specs.length > 0 && (
              <div className="mt-5 rounded-lg border border-border bg-foreground/5 p-4">
                <h2 className="text-sm font-semibold text-muted-foreground">
                  {t("submit.spec")}
                </h2>
                <dl className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {specs.map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-sm">
                      <dt className="shrink-0 text-muted-foreground">{item.label}</dt>
                      <dd className="text-foreground">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_0_20px_-6px_var(--primary)] transition-opacity hover:opacity-90"
            >
              {t("detail.visit")}
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold">{t("detail.related")}</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ResourceCard key={r.id} resource={r} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
