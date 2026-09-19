import { getCurrentUser } from "@/lib/auth";
import { getTranslations } from "next-intl/server";
import { isLocale, type Locale } from "@/lib/i18n";
import { getFavoriteIds, getPublishedResources } from "@/lib/resources/queries";
import { getTaxonomy } from "@/lib/resources/options";
import { ExploreClient } from "@/components/explore-client";

export default async function ExplorePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "zh";
  const t = await getTranslations({ locale });

  const sp = await searchParams;
  const initialQ = typeof sp.q === "string" ? sp.q : "";

  const [resources, user, taxonomy] = await Promise.all([
    getPublishedResources(),
    getCurrentUser(),
    getTaxonomy(),
  ]);
  const favoriteIds = user ? Array.from(await getFavoriteIds(user.id)) : [];

  const typeValues = taxonomy.type.map((o) => o.value);
  const initialType =
    typeof sp.type === "string" && typeValues.includes(sp.type)
      ? sp.type
      : "all";

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold">{t("explore.title")}</h1>
      <p className="mt-2 text-muted-foreground">{t("explore.subtitle")}</p>

      <div className="mt-8">
        <ExploreClient
          resources={resources}
          favoriteIds={favoriteIds}
          initialQ={initialQ}
          initialType={initialType}
          typeOptions={taxonomy.type}
          categoryOptions={taxonomy.category}
          pricingOptions={taxonomy.pricing}
        />
      </div>
    </div>
  );
}
