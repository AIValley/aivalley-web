"use client";

import { useTranslations } from "next-intl";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
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

  if (!["tool", "model", "agent", "skill", "learning", "prompt", "dataset"].includes(type)) return null;

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
        <div className="space-y-4">
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

          <div className="space-y-1.5">
            <Label>{t("skill.github")}</Label>
            <Input name="spec_githubRepo" defaultValue={spec?.githubRepo ?? ""} placeholder="owner/repo" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>{t("skill.summaryEn")}</Label>
              <Textarea name="spec_summaryEn" defaultValue={spec?.summaryEn ?? ""} placeholder="A short summary of what this skill does." />
            </div>
            <div className="space-y-1.5">
              <Label>{t("skill.summaryZh")}</Label>
              <Textarea name="spec_summaryZh" defaultValue={spec?.summaryZh ?? ""} placeholder="该技能作用的简要说明。" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>{t("skill.tabs.skillMd")}</Label>
            <Textarea name="spec_skillMd" defaultValue={spec?.skillMd ?? ""} rows={8} placeholder="# SKILL.md" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>{t("skill.tabs.files")}</Label>
              <Textarea name="spec_files" defaultValue={spec?.files?.join("\n") ?? ""} placeholder={"SKILL.md\nLICENSE\nscripts/vet.py"} />
            </div>
            <div className="space-y-1.5">
              <Label>{t("skill.tabs.versions")}</Label>
              <Textarea name="spec_versions" defaultValue={spec?.versions?.join("\n") ?? ""} placeholder={"1.0.0\n0.9.0"} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label>{t("skill.stars")}</Label>
              <Input name="spec_githubStars" type="number" defaultValue={spec?.githubStars != null ? spec.githubStars : ""} placeholder="0" />
            </div>
            <div className="space-y-1.5">
              <Label>{t("skill.forks")}</Label>
              <Input name="spec_githubForks" type="number" defaultValue={spec?.githubForks != null ? spec.githubForks : ""} placeholder="0" />
            </div>
            <div className="space-y-1.5">
              <Label>{t("skill.securityIndex")}</Label>
              <Input name="spec_securityIndex" type="number" defaultValue={spec?.securityIndex != null ? spec.securityIndex : ""} placeholder="0–100" />
            </div>
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

      {type === "prompt" && (
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>{t("submit.content")}</Label>
            <Textarea name="spec_content" defaultValue={spec?.content ?? ""} rows={8} placeholder="You are a helpful…" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>{t("submit.model")}</Label>
              <Input name="spec_model" defaultValue={spec?.model ?? ""} placeholder="GPT-4o / Claude" />
            </div>
            <div className="space-y-1.5">
              <Label>{t("submit.author")}</Label>
              <Input name="spec_author" defaultValue={spec?.author ?? ""} placeholder="Anthropic" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>{t("submit.variables")}</Label>
            <Textarea name="spec_variables" defaultValue={spec?.variables?.join("\n") ?? ""} placeholder={"{{topic}}\n{{tone}}"} />
          </div>
        </div>
      )}

      {type === "dataset" && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>{t("submit.format")}</Label>
              <Input name="spec_format" defaultValue={spec?.format ?? ""} placeholder="csv / json / parquet" />
            </div>
            <div className="space-y-1.5">
              <Label>{t("submit.rows")}</Label>
              <Input name="spec_rows" type="number" defaultValue={spec?.rows != null ? spec.rows : ""} placeholder="1000000" />
            </div>
            <div className="space-y-1.5">
              <Label>{t("submit.license")}</Label>
              <Input name="spec_license" defaultValue={spec?.license ?? ""} placeholder="MIT / CC-BY-4.0" />
            </div>
            <div className="space-y-1.5">
              <Label>{t("submit.source")}</Label>
              <Input name="spec_source" defaultValue={spec?.source ?? ""} placeholder="Hugging Face / Kaggle" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>{t("submit.columns")}</Label>
            <Textarea name="spec_columns" defaultValue={spec?.columns?.join("\n") ?? ""} placeholder={"id\nprompt\nresponse"} />
          </div>
        </div>
      )}
    </div>
  );
}
