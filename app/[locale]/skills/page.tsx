import { getCurrentUser } from "@/lib/auth";
import { isLocale, type Locale } from "@/lib/i18n";
import { getFavoriteIds, getResourcesByType } from "@/lib/resources/queries";
import { getTaxonomy, optionLabel } from "@/lib/resources/options";
import { ExploreClient } from "@/components/explore-client";

export default async function SkillsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "zh";

  const [skills, user, taxonomy] = await Promise.all([
    getResourcesByType("skill"),
    getCurrentUser(),
    getTaxonomy(),
  ]);
  const favoriteIds = user ? Array.from(await getFavoriteIds(user.id)) : [];

  const isZh = locale === "zh" || locale === "zh-TW";
  const skillOption = taxonomy.type.find((o) => o.value === "skill");
  const heading = skillOption
    ? optionLabel(locale, skillOption.labelI18n, "skill")
    : "skill";

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold">{heading}</h1>
      <p className="mt-2 text-muted-foreground">
        {isZh
          ? "可复用的 AI 技能包 —— 即插即用的智能体能力。"
          : "Reusable AI capability packs — plug-and-play skills for agents and workflows."}
      </p>

      <div className="mt-8">
        <ExploreClient
          resources={skills}
          favoriteIds={favoriteIds}
          initialType="skill"
          showTypeFilter={false}
          sidebar
          typeOptions={taxonomy.type}
          categoryOptions={taxonomy.category}
          pricingOptions={taxonomy.pricing}
        />
      </div>
    </div>
  );
}
