import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getFormatter, getTranslations } from "next-intl/server";
import { isLocale, type Locale } from "@/lib/i18n";
import { localize } from "@/lib/resources/meta";
import { getPostBySlug } from "@/lib/resources/queries";
import { Markdown } from "@/components/markdown";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "zh";
  const t = await getTranslations({ locale });

  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const title = localize(locale, post.titleEn, post.titleZh);
  const content = localize(locale, post.contentEn, post.contentZh);
  const formatter = await getFormatter({ locale });
  const date = formatter.dateTime(post.createdAt, { dateStyle: "long" });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href={`/${locale}/blog`}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {t("blog.backToList")}
      </Link>

      <h1 className="mt-6 text-3xl font-bold">{title}</h1>
      <p className="mt-3 text-sm text-muted-foreground">{date}</p>

      <div className="mt-8 border-t border-border pt-8">
        <Markdown content={content} />
      </div>
    </div>
  );
}
