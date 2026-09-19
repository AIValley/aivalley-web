import { redirect } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "zh";
  redirect(`/${locale}/dashboard/review`);
}
