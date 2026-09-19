import Link from "next/link";
import { Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/lib/i18n";

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border">
      <div className="flex flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row md:px-8 lg:px-10">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          <span className="text-sm font-medium">
            AI <span className="text-gradient">Valley</span>
          </span>
          <span className="text-sm text-muted-foreground">
            · {t("footer.tagline")}
          </span>
        </div>
        <nav className="flex items-center gap-5 text-sm text-muted-foreground">
          <Link
            href={`/${locale}/blog`}
            className="transition-colors hover:text-foreground"
          >
            {t("nav.blog")}
          </Link>
          <Link
            href={`/${locale}/about`}
            className="transition-colors hover:text-foreground"
          >
            {t("nav.about")}
          </Link>
        </nav>
        <p className="text-sm text-muted-foreground">
          © {year} AI Valley · {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
