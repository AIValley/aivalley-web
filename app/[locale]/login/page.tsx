import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getCurrentUser } from "@/lib/auth";
import { isLocale, type Locale } from "@/lib/i18n";
import { LoginForm } from "@/components/login-form";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "zh";
  const t = await getTranslations({ locale });

  const user = await getCurrentUser();
  if (user) redirect(`/${locale}`);

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-center text-3xl font-bold">{t("login.title")}</h1>
      <div className="mt-8 glass rounded-2xl p-6">
        <LoginForm />
      </div>
    </div>
  );
}
