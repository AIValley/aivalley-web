import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getCurrentUser } from "@/lib/auth";
import { isLocale, type Locale } from "@/lib/i18n";
import { AccountClient } from "@/components/dashboard/account-client";

export default async function DashboardAccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "zh";
  const t = await getTranslations({ locale });

  const user = await getCurrentUser();
  if (!user) redirect(`/${locale}/login`);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t("dashboard.account.title")}</h1>
        <p className="mt-1 text-muted-foreground">
          {t("dashboard.account.subtitle")}
        </p>
      </div>
      <AccountClient currentName={user.name} />
    </div>
  );
}
