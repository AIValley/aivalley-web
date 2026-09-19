import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { isLocale, type Locale } from "@/lib/i18n";
import { localize } from "@/lib/resources/meta";
import { getPosts } from "@/lib/resources/queries";

function excerpt(content: string): string {
  const plain = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#*_>`\[\]()~|-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return plain.length > 140 ? `${plain.slice(0, 140)}…` : plain;
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "zh";
  const t = await getTranslations({ locale });

  const posts = await getPosts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">{t("blog.title")}</h1>
      <p className="mt-2 text-muted-foreground">{t("blog.subtitle")}</p>

      <div className="mt-8 space-y-4">
        {posts.map((post) => {
          const title = localize(locale, post.titleEn, post.titleZh);
          const content = localize(locale, post.contentEn, post.contentZh);
          return (
            <Link
              key={post.id}
              href={`/${locale}/blog/${post.slug}`}
              className="glass block rounded-xl p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40"
            >
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {excerpt(content)}
              </p>
              <span className="mt-3 inline-block text-sm text-accent">
                {t("blog.readMore")} →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
