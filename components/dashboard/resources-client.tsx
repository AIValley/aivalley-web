"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { createResource, deleteResource, updateResource } from "@/lib/actions";
import type { Resource } from "@/lib/resources/types";
import { localize } from "@/lib/resources/meta";
import { optionLabel, type EnumOptionDto } from "@/lib/resources/options";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ResourceForm } from "./resource-form";

const statusStyle: Record<string, string> = {
  PENDING: "border-amber-400/40 bg-amber-400/10 text-amber-300",
  PUBLISHED: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  REJECTED: "border-rose-400/40 bg-rose-400/10 text-rose-300",
};

export function ResourcesClient({
  items,
  typeOptions,
  categoryOptions,
  pricingOptions,
}: {
  items: Resource[];
  typeOptions: EnumOptionDto[];
  categoryOptions: EnumOptionDto[];
  pricingOptions: EnumOptionDto[];
}) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  function run(fn: () => Promise<unknown>) {
    startTransition(async () => {
      await fn();
      router.refresh();
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setCreating((v) => !v)}>
          {creating
            ? t("dashboard.resources.cancel")
            : t("dashboard.resources.create")}
        </Button>
      </div>

      {creating && (
        <div className="glass rounded-xl p-5">
          <ResourceForm
            action={createResource}
            submitLabel={t("dashboard.resources.create")}
            showFeatured
            typeOptions={typeOptions}
            categoryOptions={categoryOptions}
            pricingOptions={pricingOptions}
            onSuccess={() => {
              setCreating(false);
              router.refresh();
            }}
          />
        </div>
      )}

      {items.map((item) => (
        <div key={item.id} className="glass rounded-xl p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">
                  {localize(locale, item.nameEn, item.nameZh, item.nameI18n)}
                </h3>
                <span
                  className={cn(
                    "rounded-full border px-2 py-0.5 text-xs",
                    statusStyle[item.status]
                  )}
                >
                  {optionLabel(locale, item.statusLabelI18n, item.status)}
                </span>
                {item.featured && (
                  <Badge className="border-primary/40 text-primary">★</Badge>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {localize(locale, item.descEn, item.descZh, item.descI18n)}
              </p>
            </div>

            <div className="flex shrink-0 gap-2">
              <button
                onClick={() =>
                  setEditingId(editingId === item.id ? null : item.id)
                }
                className="rounded-lg border border-border px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-foreground/5"
              >
                {t("dashboard.resources.edit")}
              </button>
              <button
                onClick={() => {
                  if (window.confirm(t("dashboard.resources.confirmDelete")))
                    run(() => deleteResource(item.id));
                }}
                className="rounded-lg border border-rose-400/30 px-3 py-1.5 text-xs text-rose-300 transition-colors hover:bg-rose-400/10"
              >
                {t("dashboard.resources.delete")}
              </button>
            </div>
          </div>

          {editingId === item.id && (
            <div className="mt-4 border-t border-border pt-4">
              <ResourceForm
                action={updateResource}
                id={item.id}
                defaults={{
                  nameEn: item.nameEn,
                  nameZh: item.nameZh,
                  descEn: item.descEn,
                  descZh: item.descZh,
                  url: item.url,
                  type: item.type,
                  category: item.category,
                  pricing: item.pricing,
                  tags: item.tags,
                  featured: item.featured,
                  spec: item.spec,
                }}
                submitLabel={t("dashboard.resources.edit")}
                showFeatured
                typeOptions={typeOptions}
                categoryOptions={categoryOptions}
                pricingOptions={pricingOptions}
                onSuccess={() => {
                  setEditingId(null);
                  router.refresh();
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
