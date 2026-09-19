import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getCurrentUser } from "@/lib/auth";
import { isLocale, type Locale } from "@/lib/i18n";
import { getFavorites } from "@/lib/resources/queries";
import { ResourceCard } from "@/components/resource-card";

export default async function DashboardFavoritesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "zh";
  const t = await getTranslations({ locale });

  const user = await getCurrentUser();
  if (!user) redirect(`/${locale}/login`);

  const favorites = await getFavorites(user.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t("dashboard.favorites.title")}</h1>
        <p className="mt-1 text-muted-foreground">
          {t("dashboard.favorites.subtitle")}
        </p>
      </div>

      {favorites.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          {t("dashboard.favorites.empty")}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((r) => (
            <ResourceCard key={r.id} resource={r} locale={locale} favorited />
          ))}
        </div>
      )}
    </div>
  );
}
