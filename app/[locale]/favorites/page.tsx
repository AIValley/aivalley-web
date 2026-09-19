import Link from "next/link";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getCurrentUser } from "@/lib/auth";
import { isLocale, type Locale } from "@/lib/i18n";
import { getFavorites } from "@/lib/resources/queries";
import { ResourceCard } from "@/components/resource-card";

export default async function FavoritesPage({
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
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold">{t("favorites.title")}</h1>
      <p className="mt-2 text-muted-foreground">{t("favorites.subtitle")}</p>

      {favorites.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">{t("favorites.empty")}</p>
          <Link
            href={`/${locale}/explore`}
            className="mt-5 inline-flex h-10 items-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t("favorites.browse")}
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((r) => (
            <ResourceCard key={r.id} resource={r} locale={locale} favorited />
          ))}
        </div>
      )}
    </div>
  );
}
