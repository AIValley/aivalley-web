import Link from "next/link";
import { ArrowLeft, GitBranch, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/lib/i18n";
import { getCurrentUser } from "@/lib/auth";
import { getRelatedSkills, isFavorited } from "@/lib/resources/queries";
import type { Resource } from "@/lib/resources/types";
import { localize } from "@/lib/resources/meta";
import { optionLabel } from "@/lib/resources/options";
import { ResourceCard } from "./resource-card";
import { ResourceLogo } from "./resource-logo";
import { Badge } from "./ui/badge";
import { FavoriteButton } from "./favorite-button";
import { SkillTabs } from "./skill-tabs";
import { GithubStats } from "./github-stats";

function securityColor(score: number): string {
  if (score >= 80) return "border-emerald-400/40 bg-emerald-500/10 text-emerald-300";
  if (score >= 50) return "border-amber-400/40 bg-amber-500/10 text-amber-300";
  return "border-rose-400/40 bg-rose-500/10 text-rose-300";
}

export async function SkillDetail({
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
  const related = await getRelatedSkills(resource.id);

  const name = localize(locale, resource.nameEn, resource.nameZh, resource.nameI18n);
  const desc = localize(locale, resource.descEn, resource.descZh, resource.descI18n);

  const spec = resource.spec;
  const githubRepo = spec?.githubRepo ?? null;
  const summary = spec?.summaryEn
    ? localize(locale, spec.summaryEn, spec.summaryZh ?? spec.summaryEn, {})
    : "";

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

          {githubRepo && (
            <a
              href={`https://github.com/${githubRepo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground transition-colors hover:bg-foreground/5"
            >
              <GitBranch className="size-4" />
              <span className="font-mono">{githubRepo}</span>
            </a>
          )}

          {summary && (
            <section className="mt-6">
              <h2 className="text-lg font-semibold">{t("skill.summary")}</h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">{summary}</p>
            </section>
          )}

          <section className="mt-8">
            <SkillTabs
              skillMd={spec?.skillMd ?? null}
              files={spec?.files ?? []}
              versions={spec?.versions ?? []}
            />
          </section>

          {related.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-bold">{t("skill.related")}</h2>
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

          <GithubStats
            resourceId={resource.id}
            githubRepo={githubRepo}
            githubStars={spec?.githubStars ?? null}
            githubForks={spec?.githubForks ?? null}
            canRefresh={user?.role === "ADMIN"}
          />

          <div className="glass rounded-xl p-4">
            <h2 className="text-sm font-semibold text-muted-foreground">
              {t("skill.securityIndex")}
            </h2>
            {spec?.securityIndex != null ? (
              <span
                className={`mt-3 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-semibold ${securityColor(spec.securityIndex)}`}
              >
                <ShieldCheck className="size-4" />
                {spec.securityIndex}
              </span>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">—</p>
            )}
          </div>

          {(spec?.author || spec?.version || spec?.trigger) && (
            <div className="glass rounded-xl p-4">
              <dl className="space-y-2 text-sm">
                {spec.author && (
                  <div className="flex items-center gap-2">
                    <dt className="shrink-0 text-muted-foreground">{t("submit.author")}</dt>
                    <dd className="text-foreground">{spec.author}</dd>
                  </div>
                )}
                {spec.version && (
                  <div className="flex items-center gap-2">
                    <dt className="shrink-0 text-muted-foreground">{t("submit.version")}</dt>
                    <dd className="text-foreground">{spec.version}</dd>
                  </div>
                )}
                {spec.trigger && (
                  <div className="flex items-center gap-2">
                    <dt className="shrink-0 text-muted-foreground">{t("submit.trigger")}</dt>
                    <dd className="text-foreground">{spec.trigger}</dd>
                  </div>
                )}
              </dl>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
