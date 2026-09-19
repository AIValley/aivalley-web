import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { getResourceById } from "@/lib/resources/queries";
import { ResourceDetail } from "@/components/resource-detail";

export default async function LearningDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale: rawLocale, id } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "zh";

  const resource = await getResourceById(id);
  if (!resource || resource.type !== "learning") notFound();

  return (
    <ResourceDetail
      resource={resource}
      locale={locale}
      backHref={`/${locale}/learning`}
    />
  );
}
