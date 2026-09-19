import { getTranslations } from "next-intl/server";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "zh";
  const t = await getTranslations({ locale });

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-gradient">{t("about.title")}</h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        {t("about.content")}
      </p>
    </div>
  );
}
