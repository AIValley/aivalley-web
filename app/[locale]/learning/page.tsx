import { getCurrentUser } from "@/lib/auth";
import { isLocale, type Locale } from "@/lib/i18n";
import { getFavoriteIds, getResourcesByType } from "@/lib/resources/queries";
import { getTaxonomy, optionLabel } from "@/lib/resources/options";
import { ExploreClient } from "@/components/explore-client";

export default async function LearningPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "zh";

  const [learning, user, taxonomy] = await Promise.all([
    getResourcesByType("learning"),
    getCurrentUser(),
    getTaxonomy(),
  ]);
  const favoriteIds = user ? Array.from(await getFavoriteIds(user.id)) : [];

  const isZh = locale === "zh" || locale === "zh-TW";
  const learningOption = taxonomy.type.find((o) => o.value === "learning");
  const heading = learningOption
    ? optionLabel(locale, learningOption.labelI18n, "learning")
    : "learning";

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold">{heading}</h1>
      <p className="mt-2 text-muted-foreground">
        {isZh
          ? "课程、论文与教程 —— 助你系统提升 AI 技能。"
          : "Courses, papers and tutorials to level up your AI skills."}
      </p>

      <div className="mt-8">
        <ExploreClient
          resources={learning}
          favoriteIds={favoriteIds}
          initialType="learning"
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
