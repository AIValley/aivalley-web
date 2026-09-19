"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { reviewSubmission } from "@/lib/actions";
import type { Resource } from "@/lib/resources/types";
import { localize } from "@/lib/resources/meta";
import { optionLabel } from "@/lib/resources/options";
import { Badge } from "./ui/badge";

type PendingItem = Resource & { submitterEmail: string | null };

export function AdminReview({ items }: { items: PendingItem[] }) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handle(id: string, action: "approve" | "reject") {
    startTransition(async () => {
      await reviewSubmission(id, action);
      router.refresh();
    });
  }

  if (items.length === 0) {
    return <p className="text-muted-foreground">{t("admin.noPending")}</p>;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="glass rounded-xl p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="font-semibold">
                {localize(locale, item.nameEn, item.nameZh, item.nameI18n)}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {localize(locale, item.descEn, item.descZh, item.descI18n)}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Badge>{optionLabel(locale, item.typeLabelI18n, item.type)}</Badge>
                <Badge>{optionLabel(locale, item.categoryLabelI18n, item.category)}</Badge>
                <Badge>{optionLabel(locale, item.pricingLabelI18n, item.pricing)}</Badge>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {t("admin.submittedBy")}: {item.submitterEmail ?? "—"}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => handle(item.id, "approve")}
                disabled={pending}
                className="h-9 rounded-lg bg-emerald-500/90 px-4 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {t("admin.approve")}
              </button>
              <button
                onClick={() => handle(item.id, "reject")}
                disabled={pending}
                className="h-9 rounded-lg border border-border px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/5 disabled:opacity-50"
              >
                {t("admin.reject")}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
