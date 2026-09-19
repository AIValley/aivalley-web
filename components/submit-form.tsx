"use client";

import { useActionState, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { submitResource, type ActionResult } from "@/lib/actions";
import { optionLabel, type EnumOptionDto } from "@/lib/resources/options";
import { ResourceSpecFields } from "./resource-spec-fields";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const selectClass =
  "h-10 w-full rounded-lg border border-border bg-input px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function SubmitForm({
  typeOptions,
  categoryOptions,
  pricingOptions,
}: {
  typeOptions: EnumOptionDto[];
  categoryOptions: EnumOptionDto[];
  pricingOptions: EnumOptionDto[];
}) {
  const t = useTranslations();
  const locale = useLocale();
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(
    submitResource,
    { ok: true }
  );
  const [type, setType] = useState(typeOptions[0]?.value ?? "tool");

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="locale" value={locale} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm text-muted-foreground">
            {t("submit.nameZh")}
          </label>
          <Input name="nameZh" required placeholder="例如：ChatGPT" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm text-muted-foreground">
            {t("submit.nameEn")}
          </label>
          <Input name="nameEn" required placeholder="e.g. ChatGPT" />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm text-muted-foreground">
          {t("submit.descZh")}
        </label>
        <Textarea name="descZh" placeholder="一句话中文介绍" />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm text-muted-foreground">
          {t("submit.descEn")}
        </label>
        <Textarea name="descEn" placeholder="One-line English description" />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm text-muted-foreground">{t("submit.url")}</label>
        <Input name="url" type="url" required placeholder="https://…" />
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
          <select name="category" className={selectClass}>
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
          <select name="pricing" className={selectClass}>
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
        <Input name="tags" placeholder="ai, chatbot, writing" />
      </div>

      <ResourceSpecFields type={type} />

      {state.ok && state.message && (
        <p className="text-sm text-green-400">{state.message}</p>
      )}
      {!state.ok && state.message && (
        <p className="text-sm text-red-400">{state.message}</p>
      )}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? t("submit.submitting") : t("submit.submit")}
      </Button>
    </form>
  );
}
