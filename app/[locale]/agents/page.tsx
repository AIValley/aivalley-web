import { getCurrentUser } from "@/lib/auth";
import { isLocale, type Locale } from "@/lib/i18n";
import { getFavoriteIds, getResourcesByType } from "@/lib/resources/queries";
import { getTaxonomy, optionLabel } from "@/lib/resources/options";
import { ExploreClient } from "@/components/explore-client";

export default async function AgentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "zh";

  const [agents, user, taxonomy] = await Promise.all([
    getResourcesByType("agent"),
    getCurrentUser(),
    getTaxonomy(),
  ]);
  const favoriteIds = user ? Array.from(await getFavoriteIds(user.id)) : [];

  const isZh = locale === "zh" || locale === "zh-TW";
  const agentOption = taxonomy.type.find((o) => o.value === "agent");
  const heading = agentOption
    ? optionLabel(locale, agentOption.labelI18n, "agent")
    : "agent";

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold">{heading}</h1>
      <p className="mt-2 text-muted-foreground">
        {isZh
          ? "构建自主系统的智能体框架与平台。"
          : "Frameworks and platforms for building autonomous AI systems."}
      </p>

      <div className="mt-8">
        <ExploreClient
          resources={agents}
          favoriteIds={favoriteIds}
          initialType="agent"
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
