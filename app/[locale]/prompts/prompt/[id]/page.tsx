import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { getResourceById } from "@/lib/resources/queries";
import { PromptDetail } from "@/components/prompt-detail";

export default async function PromptDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale: rawLocale, id } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "zh";

  const resource = await getResourceById(id);
  if (!resource || resource.type !== "prompt") notFound();

  return (
    <PromptDetail
      resource={resource}
      locale={locale}
      backHref={`/${locale}/prompts`}
    />
  );
}
