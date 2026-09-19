"use client";

import { useEffect, useActionState, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { optionLabel, type EnumOptionDto } from "@/lib/resources/options";
import type { ResourceSpec } from "@/lib/resources/spec";
import type { ActionResult } from "@/lib/actions";
import { ResourceSpecFields } from "../resource-spec-fields";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const selectClass =
  "h-10 w-full rounded-lg border border-border bg-input px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export type ResourceFormDefaults = {
  nameEn?: string;
  nameZh?: string;
  descEn?: string;
  descZh?: string;
  url?: string;
  type?: string;
  category?: string;
  pricing?: string;
  tags?: string[];
  featured?: boolean;
  spec?: ResourceSpec | null;
};

export function ResourceForm({
  action,
  defaults = {},
  id,
  submitLabel,
  showFeatured = false,
  onSuccess,
  typeOptions,
  categoryOptions,
  pricingOptions,
}: {
  action: (prev: ActionResult, formData: FormData) => Promise<ActionResult>;
  defaults?: ResourceFormDefaults;
  id?: string;
  submitLabel: string;
  showFeatured?: boolean;
  onSuccess?: () => void;
  typeOptions: EnumOptionDto[];
  categoryOptions: EnumOptionDto[];
  pricingOptions: EnumOptionDto[];
}) {
  const t = useTranslations();
  const locale = useLocale();
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(
    action,
    { ok: true }
  );
  const [type, setType] = useState(defaults.type ?? typeOptions[0]?.value ?? "tool");

  const onSuccessRef = useRef(onSuccess);
  useEffect(() => {
    onSuccessRef.current = onSuccess;
  });
  useEffect(() => {
    if (state.ok && state.message) onSuccessRef.current?.();
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="locale" value={locale} />
      {id && <input type="hidden" name="id" value={id} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm text-muted-foreground">
            {t("submit.nameZh")}
          </label>
          <Input name="nameZh" required defaultValue={defaults.nameZh} placeholder="例如：ChatGPT" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm text-muted-foreground">
            {t("submit.nameEn")}
          </label>
          <Input name="nameEn" required defaultValue={defaults.nameEn} placeholder="e.g. ChatGPT" />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm text-muted-foreground">
          {t("submit.descZh")}
        </label>
        <Textarea name="descZh" defaultValue={defaults.descZh} placeholder="一句话中文介绍" />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm text-muted-foreground">
          {t("submit.descEn")}
        </label>
        <Textarea name="descEn" defaultValue={defaults.descEn} placeholder="One-line English description" />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm text-muted-foreground">{t("submit.url")}</label>
        <Input name="url" type="url" required defaultValue={defaults.url} placeholder="https://…" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <label className="text-sm text-muted-foreground">
            {t("submit.type")}
          </label>
          <select name="type" className={selectClass} value={type} onChange={(e) => setType(e.target.value)}>
            {typeOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {optionLabel(locale, o.labelI18n, o.value)}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm text-muted-foreground">
            {t("submit.category")}
          </label>
          <select name="category" className={selectClass} defaultValue={defaults.category ?? categoryOptions[0]?.value}>
            {categoryOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {optionLabel(locale, o.labelI18n, o.value)}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm text-muted-foreground">
            {t("submit.pricing")}
          </label>
          <select name="pricing" className={selectClass} defaultValue={defaults.pricing ?? pricingOptions[0]?.value}>
            {pricingOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {optionLabel(locale, o.labelI18n, o.value)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm text-muted-foreground">{t("submit.tags")}</label>
        <Input name="tags" defaultValue={defaults.tags?.join(", ")} placeholder="ai, chatbot, writing" />
      </div>

      <ResourceSpecFields type={type} spec={defaults.spec} />

      {showFeatured && (
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={defaults.featured}
            className="size-4 accent-[var(--primary)]"
          />
          {t("dashboard.resources.featured")}
        </label>
      )}

      {state.ok && state.message && (
        <p className="text-sm text-green-400">{state.message}</p>
      )}
      {!state.ok && state.message && (
        <p className="text-sm text-red-400">{state.message}</p>
      )}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? t("submit.submitting") : submitLabel}
      </Button>
    </form>
  );
}
