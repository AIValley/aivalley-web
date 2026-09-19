import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Resource } from "@/lib/resources/types";
import { detailPath, localize } from "@/lib/resources/meta";
import { optionLabel } from "@/lib/resources/options";
import { Badge } from "./ui/badge";
import { ResourceLogo } from "./resource-logo";
import { FavoriteButton } from "./favorite-button";

export function ResourceListItem({
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
    <div className="glass group relative flex items-center gap-4 rounded-xl p-4 transition-all hover:border-primary/40 hover:shadow-[0_0_30px_-10px_var(--primary)] focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-ring/60">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-foreground/5">
        <ResourceLogo
          logo={resource.logo}
          type={resource.type}
          className="size-6 text-primary"
        />
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold text-foreground">{name}</h3>
        <p className="mt-0.5 truncate text-sm text-muted-foreground">{desc}</p>
      </div>

      <div className="hidden shrink-0 items-center gap-1.5 md:flex">
        <Badge>{optionLabel(locale, resource.typeLabelI18n, resource.type)}</Badge>
        <Badge>{optionLabel(locale, resource.categoryLabelI18n, resource.category)}</Badge>
        <Badge>{optionLabel(locale, resource.pricingLabelI18n, resource.pricing)}</Badge>
      </div>

      <FavoriteButton resourceId={resource.id} initialFavorited={favorited} />

      <Link
        href={`/${locale}${detailPath(resource.type, resource.id)}`}
        className="absolute inset-0 cursor-pointer rounded-xl focus:outline-none"
        aria-label={name}
      />
    </div>
  );
}
