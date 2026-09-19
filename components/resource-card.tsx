import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Resource } from "@/lib/resources/types";
import { detailPath, localize } from "@/lib/resources/meta";
import { Badge } from "./ui/badge";
import { ResourceLogo } from "./resource-logo";
import { FavoriteButton } from "./favorite-button";
import { optionLabel } from "@/lib/resources/options";

export function ResourceCard({
  resource,
  locale,
  favorited = false,
}: {
  resource: Resource;
  locale: Locale;
  favorited?: boolean;
}) {
  const name = localize(locale, resource.nameEn, resource.nameZh, resource.nameI18n);
  const desc = localize(locale, resource.descEn, resource.descZh, resource.descI18n);

  return (
    <div className="glass group relative flex flex-col gap-3 rounded-xl p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_0_30px_-10px_var(--primary)] focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-ring/60">
      <div className="flex items-start justify-between">
        <span className="flex size-11 items-center justify-center rounded-lg bg-foreground/5">
          <ResourceLogo
            logo={resource.logo}
            type={resource.type}
            className="size-6 text-primary"
          />
        </span>
        <FavoriteButton resourceId={resource.id} initialFavorited={favorited} />
      </div>

      <div className="pr-6">
        <h3 className="font-semibold text-foreground">{name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{desc}</p>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-1.5">
        <Badge>{optionLabel(locale, resource.typeLabelI18n, resource.type)}</Badge>
        <Badge>{optionLabel(locale, resource.categoryLabelI18n, resource.category)}</Badge>
        <Badge>{optionLabel(locale, resource.pricingLabelI18n, resource.pricing)}</Badge>
      </div>

      <Link
        href={`/${locale}${detailPath(resource.type, resource.id)}`}
        className="absolute inset-0 cursor-pointer rounded-xl focus:outline-none"
        aria-label={name}
      />
    </div>
  );
}
