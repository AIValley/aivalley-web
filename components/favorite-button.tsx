"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { toggleFavorite } from "@/lib/actions";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  resourceId,
  initialFavorited = false,
}: {
  resourceId: string;
  initialFavorited?: boolean;
}) {
  const [favorited, setFavorited] = useState(initialFavorited);
  const [pending, setPending] = useState(false);
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  async function onClick() {
    if (pending) return;
    setPending(true);
    const res = await toggleFavorite(resourceId);
    setPending(false);

    if (res.needLogin) {
      router.push(`/${locale}/login`);
      return;
    }
    if (res.ok && typeof res.favorited === "boolean") {
      setFavorited(res.favorited);
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      title={favorited ? t("favorite.added") : t("favorite.add")}
      aria-label={favorited ? t("favorite.added") : t("favorite.add")}
      className={cn(
        "relative z-10 inline-flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground",
        favorited && "border-primary/40 text-primary"
      )}
    >
      <Heart className={cn("size-4", favorited && "fill-primary")} />
    </button>
  );
}
