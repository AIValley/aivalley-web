import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getCurrentUser } from "@/lib/auth";
import { isLocale, type Locale } from "@/lib/i18n";
import { getPendingResources } from "@/lib/resources/queries";
import { AdminReview } from "@/components/admin-review";

export default async function DashboardReviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "zh";
  const t = await getTranslations({ locale });

  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return (
      <div className="py-16 text-center">
        <p className="text-muted-foreground">{t("admin.notAdmin")}</p>
        <Link
          href={`/${locale}`}
          className="mt-5 inline-flex h-10 items-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          {t("common.backHome")}
        </Link>
      </div>
    );
  }

  const pending = await getPendingResources();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t("dashboard.review.title")}</h1>
        <p className="mt-1 text-muted-foreground">
          {t("dashboard.review.subtitle")}
        </p>
      </div>
      <AdminReview items={pending} />
    </div>
  );
}
