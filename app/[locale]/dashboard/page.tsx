import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getCurrentUser } from "@/lib/auth";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDashboardStats } from "@/lib/resources/queries";
import { StatCard } from "@/components/dashboard/stat-card";

export default async function DashboardOverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "zh";
  const t = await getTranslations({ locale });

  const user = await getCurrentUser();
  if (!user) redirect(`/${locale}/login`);

  const stats = await getDashboardStats(user.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t("dashboard.overview.title")}</h1>
        <p className="mt-1 text-muted-foreground">
          {t("dashboard.overview.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard
          label={t("dashboard.overview.submissions")}
          value={stats.submissions}
        />
        <StatCard
          label={t("dashboard.overview.pending")}
          value={stats.pending}
          accent
        />
        <StatCard
          label={t("dashboard.overview.published")}
          value={stats.published}
        />
        <StatCard
          label={t("dashboard.overview.rejected")}
          value={stats.rejected}
        />
        <StatCard
          label={t("dashboard.overview.favorites")}
          value={stats.favorites}
        />
      </div>
    </div>
  );
}
