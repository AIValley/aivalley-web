"use client";

import { useEffect, useActionState, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  createEnumOption,
  deleteEnumOption,
  updateEnumOption,
  type ActionResult,
} from "@/lib/actions";
import {
  ENUM_KINDS,
  optionLabel,
  type EnumKind,
  type EnumOptionDto,
} from "@/lib/resources/options";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const LOCALES = ["zh", "zh-TW", "en", "ja", "ru", "ko", "es", "fr", "de"] as const;

function OptionForm({
  kind,
  option,
  action,
  submitLabel,
  onSuccess,
}: {
  kind: EnumKind;
  option?: EnumOptionDto;
  action: (prev: ActionResult, formData: FormData) => Promise<ActionResult>;
  submitLabel: string;
  onSuccess?: () => void;
}) {
  const t = useTranslations();
  const locale = useLocale();
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(
    action,
    { ok: true }
  );

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
      <input type="hidden" name="kind" value={kind} />
      {option && <input type="hidden" name="id" value={option.id} />}

      <div className="grid gap-3 sm:grid-cols-3">
        {!option && (
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">
              {t("dashboard.taxonomy.value")}
            </label>
            <Input name="value" required placeholder="tool / chat / free" />
            <p className="text-xs text-muted-foreground">
              {t("dashboard.taxonomy.valueHint")}
            </p>
          </div>
        )}
        <div className="space-y-1">
          <label className="text-sm text-muted-foreground">
            {t("dashboard.taxonomy.sortOrder")}
          </label>
          <Input
            name="sortOrder"
            type="number"
            defaultValue={option?.sortOrder ?? 0}
          />
        </div>
        <label className="flex items-end gap-2 pb-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            name="active"
            defaultChecked={option ? option.active : true}
            className="size-4 accent-[var(--primary)]"
          />
          {t("dashboard.taxonomy.active")}
        </label>
      </div>

      <div>
        <p className="mb-1.5 text-sm text-muted-foreground">
          {t("dashboard.taxonomy.labels")}
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          {LOCALES.map((l) => (
            <div key={l} className="flex items-center gap-2">
              <span className="w-12 shrink-0 text-xs text-muted-foreground">
                {l}
              </span>
              <Input
                name={`label_${l}`}
                defaultValue={option?.labelI18n[l] ?? ""}
                className="h-9"
              />
            </div>
          ))}
        </div>
      </div>

      {state.ok && state.message && (
        <p className="text-sm text-green-400">{state.message}</p>
      )}
      {!state.ok && state.message && (
        <p className="text-sm text-red-400">{state.message}</p>
      )}

      <div className="flex gap-2">
        <Button type="submit" disabled={pending}>
          {pending ? "…" : submitLabel}
        </Button>
        {onSuccess && (
          <Button type="button" variant="outline" onClick={onSuccess}>
            {t("dashboard.taxonomy.cancel")}
          </Button>
        )}
      </div>
    </form>
  );
}

export function TaxonomyClient({
  taxonomy,
}: {
  taxonomy: Record<EnumKind, EnumOptionDto[]>;
}) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [kind, setKind] = useState<EnumKind>("type");
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  function run(fn: () => Promise<unknown>) {
    startTransition(async () => {
      await fn();
      router.refresh();
    });
  }

  function switchKind(next: EnumKind) {
    setKind(next);
    setCreating(false);
    setEditingId(null);
  }

  const options = taxonomy[kind];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {ENUM_KINDS.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => switchKind(k)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-sm transition-colors",
              kind === k
                ? "border-primary/50 bg-primary/15 text-foreground"
                : "border-border text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
            )}
          >
            {t(`dashboard.taxonomy.kinds.${k}`)}
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => {
            setCreating((v) => !v);
            setEditingId(null);
          }}
        >
          {creating
            ? t("dashboard.taxonomy.cancel")
            : t("dashboard.taxonomy.add")}
        </Button>
      </div>

      {creating && (
        <div className="glass rounded-xl p-5">
          <OptionForm
            kind={kind}
            action={createEnumOption}
            submitLabel={t("dashboard.taxonomy.add")}
            onSuccess={() => {
              setCreating(false);
              router.refresh();
            }}
          />
        </div>
      )}

      <div className="space-y-3">
        {options.map((o) => (
          <div key={o.id} className="glass rounded-xl p-4">
            {editingId === o.id ? (
              <OptionForm
                kind={kind}
                option={o}
                action={updateEnumOption}
                submitLabel={t("dashboard.taxonomy.save")}
                onSuccess={() => {
                  setEditingId(null);
                  router.refresh();
                }}
              />
            ) : (
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      {optionLabel(locale, o.labelI18n, o.value)}
                    </span>
                    <code className="rounded bg-foreground/10 px-1.5 py-0.5 text-xs text-muted-foreground">
                      {o.value}
                    </code>
                    {!o.active && (
                      <span className="text-xs text-muted-foreground">
                        · {t("dashboard.taxonomy.active")}: ✕
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {t("dashboard.taxonomy.sortOrder")}: {o.sortOrder}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => setEditingId(o.id)}
                    className="rounded-lg border border-border px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-foreground/5"
                  >
                    {t("dashboard.taxonomy.edit")}
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(t("dashboard.taxonomy.confirmDelete")))
                        run(() => deleteEnumOption(o.id, locale));
                    }}
                    className="rounded-lg border border-rose-400/30 px-3 py-1.5 text-xs text-rose-300 transition-colors hover:bg-rose-400/10"
                  >
                    {t("dashboard.taxonomy.delete")}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
