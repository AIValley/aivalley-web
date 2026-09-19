import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { isLocale, type Locale } from "@/lib/i18n";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default async function DashboardLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>;
  children: ReactNode;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "zh";

  const user = await getCurrentUser();
  if (!user) redirect(`/${locale}/login`);

  return (
    <div className="px-4 py-8">
      <div className="flex flex-col gap-6 md:flex-row">
        <DashboardSidebar
          locale={locale}
          isAdmin={user.role === "ADMIN"}
          userName={user.name || user.email}
        />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
