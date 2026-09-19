import { getCurrentUser } from "@/lib/auth";
import { isLocale, type Locale } from "@/lib/i18n";
import { getFavoriteIds, getResourcesByType } from "@/lib/resources/queries";
import { getTaxonomy, optionLabel } from "@/lib/resources/options";
import { ExploreClient } from "@/components/explore-client";

export default async function ModelsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "zh";

  const [models, user, taxonomy] = await Promise.all([
    getResourcesByType("model"),
    getCurrentUser(),
    getTaxonomy(),
  ]);
  const favoriteIds = user ? Array.from(await getFavoriteIds(user.id)) : [];

  const isZh = locale === "zh" || locale === "zh-TW";
  const modelOption = taxonomy.type.find((o) => o.value === "model");
  const heading = modelOption
    ? optionLabel(locale, modelOption.labelI18n, "model")
    : "model";

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold">{heading}</h1>
      <p className="mt-2 text-muted-foreground">
        {isZh
          ? "驱动 AI 应用的底层大模型 —— 从开源权重到闭源旗舰。"
          : "The underlying models powering AI — from open-weight to closed flagship."}
      </p>

      <div className="mt-8">
        <ExploreClient
          resources={models}
          favoriteIds={favoriteIds}
          initialType="model"
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
