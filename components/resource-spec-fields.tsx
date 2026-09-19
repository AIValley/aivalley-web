"use client";

import { useTranslations } from "next-intl";
import { Input } from "./ui/input";
import {
  AGENT_KINDS,
  LEARNING_FORMATS,
  LEVELS,
  MODALITIES,
  PLATFORMS,
  type ResourceSpec,
} from "@/lib/resources/spec";

const selectClass =
  "h-10 w-full rounded-lg border border-border bg-input px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-sm text-muted-foreground">{children}</label>;
}

function Checkbox({
  name,
  checked,
  label,
}: {
  name: string;
  checked?: boolean;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2 self-end pb-2 text-sm text-muted-foreground">
      <input
        type="checkbox"
        name={name}
        defaultChecked={checked ?? false}
        className="size-4 accent-[var(--primary)]"
      />
      {label}
    </label>
  );
}

/** 按 type 条件渲染各类型的专属字段；字段名以 spec_ 前缀与 parseSpecInput 对齐 */
export function ResourceSpecFields({
  type,
  spec,
}: {
  type: string;
  spec?: ResourceSpec | null;
}) {
  const t = useTranslations();

  if (!["tool", "model", "agent", "skill", "learning"].includes(type)) return null;

  return (
    <div className="space-y-4 border-t border-border pt-4">
      <h3 className="text-sm font-semibold">{t("submit.spec")}</h3>

      {type === "tool" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>{t("submit.platform")}</Label>
            <select name="spec_platform" className={selectClass} defaultValue={spec?.platform ?? ""}>
              <option value="">—</option>
              {PLATFORMS.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <Checkbox name="spec_apiAccess" checked={spec?.apiAccess} label={t("submit.apiAccess")} />
        </div>
      )}

      {type === "model" && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>{t("submit.provider")}</Label>
              <Input name="spec_provider" defaultValue={spec?.provider ?? ""} placeholder="OpenAI / Anthropic / Google…" />
            </div>
            <div className="space-y-1.5">
              <Label>{t("submit.contextWindow")}</Label>
              <Input name="spec_contextWindow" type="number" defaultValue={spec?.contextWindow ?? ""} placeholder="128000" />
            </div>
          </div>
          <Checkbox name="spec_openSource" checked={spec?.openSource} label={t("submit.openSource")} />
          <div className="space-y-1.5">
            <Label>{t("submit.modalities")}</Label>
            <div className="flex flex-wrap gap-3">
              {MODALITIES.map((v) => (
                <label key={v} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    name="spec_modalities"
                    value={v}
                    defaultChecked={spec?.modalities?.includes(v) ?? false}
                    className="size-4 accent-[var(--primary)]"
                  />
                  {v}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {type === "agent" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>{t("submit.agentKind")}</Label>
            <select name="spec_agentKind" className={selectClass} defaultValue={spec?.agentKind ?? ""}>
              <option value="">—</option>
              {AGENT_KINDS.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <Checkbox name="spec_openSource" checked={spec?.openSource} label={t("submit.openSource")} />
        </div>
      )}

      {type === "skill" && (
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label>{t("submit.author")}</Label>
            <Input name="spec_author" defaultValue={spec?.author ?? ""} placeholder="Anthropic" />
          </div>
          <div className="space-y-1.5">
            <Label>{t("submit.version")}</Label>
            <Input name="spec_version" defaultValue={spec?.version ?? ""} placeholder="1.0" />
          </div>
          <div className="space-y-1.5">
            <Label>{t("submit.trigger")}</Label>
            <Input name="spec_trigger" defaultValue={spec?.trigger ?? ""} placeholder="/skill" />
          </div>
        </div>
      )}

      {type === "learning" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>{t("submit.level")}</Label>
            <select name="spec_level" className={selectClass} defaultValue={spec?.level ?? ""}>
              <option value="">—</option>
              {LEVELS.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label>{t("submit.format")}</Label>
            <select name="spec_format" className={selectClass} defaultValue={spec?.format ?? ""}>
              <option value="">—</option>
              {LEARNING_FORMATS.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
