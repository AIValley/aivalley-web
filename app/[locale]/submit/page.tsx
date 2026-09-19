import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getCurrentUser } from "@/lib/auth";
import { isLocale, type Locale } from "@/lib/i18n";
import { getTaxonomy } from "@/lib/resources/options";
import { SubmitForm } from "@/components/submit-form";

export default async function SubmitPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "zh";
  const t = await getTranslations({ locale });

  const user = await getCurrentUser();
  if (!user) redirect(`/${locale}/login`);

  const taxonomy = await getTaxonomy();

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold">{t("submit.title")}</h1>
      <p className="mt-2 text-muted-foreground">{t("submit.subtitle")}</p>

      <div className="mt-8 glass rounded-2xl p-6">
        <SubmitForm
          typeOptions={taxonomy.type}
          categoryOptions={taxonomy.category}
          pricingOptions={taxonomy.pricing}
        />
      </div>
    </div>
  );
}
