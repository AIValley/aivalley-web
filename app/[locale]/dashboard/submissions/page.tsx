import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getCurrentUser } from "@/lib/auth";
import { isLocale, type Locale } from "@/lib/i18n";
import { getMySubmissions } from "@/lib/resources/queries";
import { getTaxonomy } from "@/lib/resources/options";
import { SubmissionsClient } from "@/components/dashboard/submissions-client";

export default async function DashboardSubmissionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "zh";
  const t = await getTranslations({ locale });

  const user = await getCurrentUser();
  if (!user) redirect(`/${locale}/login`);

  const [submissions, taxonomy] = await Promise.all([
    getMySubmissions(user.id),
    getTaxonomy(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          {t("dashboard.submissions.title")}
        </h1>
        <p className="mt-1 text-muted-foreground">
          {t("dashboard.submissions.subtitle")}
        </p>
      </div>
      <SubmissionsClient
        items={submissions}
        typeOptions={taxonomy.type}
        categoryOptions={taxonomy.category}
        pricingOptions={taxonomy.pricing}
      />
    </div>
  );
}
