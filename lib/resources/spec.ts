import type { Prisma } from "@prisma/client";

/** 各类型专属字段的可选取值（代码内常量，不接入 EnumOption 分类体系） */
export const PLATFORMS = ["web", "desktop", "mobile", "cli", "plugin", "ide"];
export const AGENT_KINDS = ["framework", "autonomous", "platform"];
export const LEVELS = ["beginner", "intermediate", "advanced"];
export const LEARNING_FORMATS = ["course", "tutorial", "papers", "video", "guide"];
export const MODALITIES = ["text", "image", "audio", "video"];

/** 扁平化的类型专属字段（DTO 与表单共用；仅该类型会用到的字段有值） */
export interface ResourceSpec {
  // tool
  platform?: string;
  apiAccess?: boolean;
  // model
  provider?: string;
  openSource?: boolean;
  contextWindow?: number | null;
  modalities?: string[];
  // agent
  agentKind?: string;
  // skill
  author?: string;
  version?: string;
  trigger?: string;
  githubRepo?: string;
  summaryEn?: string;
  summaryZh?: string;
  skillMd?: string;
  files?: string[];
  versions?: string[];
  githubStars?: number | null;
  githubForks?: number | null;
  securityIndex?: number | null;
  // prompt（author 复用上方 skill 的 author）
  content?: string;
  model?: string; // 目标模型（与 "model" 资源类型同名，但此处是 prompt 的目标模型）
  variables?: string[];
  // dataset（format 复用上方 learning 的 format）
  rows?: number | null;
  license?: string;
  source?: string;
  columns?: string[];
  // learning
  level?: string;
  format?: string;
}

function str(v: FormDataEntryValue | null): string | undefined {
  const s = typeof v === "string" ? v.trim() : "";
  return s || undefined;
}

function bool(v: FormDataEntryValue | null): boolean {
  return v === "on" || v === "true";
}

function num(v: FormDataEntryValue | null): number | null | undefined {
  const s = typeof v === "string" ? v.trim() : "";
  if (!s) return undefined;
  const n = Number(s);
  return Number.isFinite(n) ? n : undefined;
}

function list(vals: FormDataEntryValue[]): string[] {
  return vals
    .filter((v): v is string => typeof v === "string")
    .map((v) => v.trim())
    .filter(Boolean);
}

function lines(v: FormDataEntryValue | null): string[] {
  const s = typeof v === "string" ? v : "";
  return s
    .split(/\r?\n/)
    .map((x) => x.trim())
    .filter(Boolean);
}

/** 从 formData 读取某类型的专属字段（type 决定读哪些字段） */
export function parseSpecInput(formData: FormData, type: string): ResourceSpec {
  switch (type) {
    case "tool":
      return {
        platform: str(formData.get("spec_platform")),
        apiAccess: bool(formData.get("spec_apiAccess")),
      };
    case "model":
      return {
        provider: str(formData.get("spec_provider")),
        openSource: bool(formData.get("spec_openSource")),
        contextWindow: num(formData.get("spec_contextWindow")),
        modalities: list(formData.getAll("spec_modalities")),
      };
    case "agent":
      return {
        agentKind: str(formData.get("spec_agentKind")),
        openSource: bool(formData.get("spec_openSource")),
      };
    case "skill":
      return {
        author: str(formData.get("spec_author")),
        version: str(formData.get("spec_version")),
        trigger: str(formData.get("spec_trigger")),
        githubRepo: str(formData.get("spec_githubRepo")),
        summaryEn: str(formData.get("spec_summaryEn")),
        summaryZh: str(formData.get("spec_summaryZh")),
        skillMd: str(formData.get("spec_skillMd")),
        files: lines(formData.get("spec_files")),
        versions: lines(formData.get("spec_versions")),
        githubStars: num(formData.get("spec_githubStars")),
        githubForks: num(formData.get("spec_githubForks")),
        securityIndex: num(formData.get("spec_securityIndex")),
      };
    case "prompt":
      return {
        content: str(formData.get("spec_content")),
        model: str(formData.get("spec_model")),
        author: str(formData.get("spec_author")),
        variables: lines(formData.get("spec_variables")),
      };
    case "dataset":
      return {
        format: str(formData.get("spec_format")),
        rows: num(formData.get("spec_rows")),
        license: str(formData.get("spec_license")),
        source: str(formData.get("spec_source")),
        columns: lines(formData.get("spec_columns")),
      };
    case "learning":
      return {
        level: str(formData.get("spec_level")),
        format: str(formData.get("spec_format")),
      };
    default:
      return {};
  }
}

/**
 * 把某资源的专属字段同步到对应子表：先删该 resource 下所有子行，再按 type 建对应行。
 * 采用「先删后建」保证 type 变更时不残留孤儿子行。须在事务内调用。
 */
export async function syncSpec(
  tx: Prisma.TransactionClient,
  resourceId: string,
  type: string,
  spec: ResourceSpec
): Promise<void> {
  await tx.tool.deleteMany({ where: { resourceId } });
  await tx.model.deleteMany({ where: { resourceId } });
  await tx.agent.deleteMany({ where: { resourceId } });
  await tx.skill.deleteMany({ where: { resourceId } });
  await tx.learning.deleteMany({ where: { resourceId } });
  await tx.prompt.deleteMany({ where: { resourceId } });
  await tx.dataset.deleteMany({ where: { resourceId } });

  switch (type) {
    case "tool":
      await tx.tool.create({
        data: {
          resourceId,
          platform: spec.platform ?? null,
          apiAccess: spec.apiAccess ?? false,
        },
      });
      break;
    case "model":
      await tx.model.create({
        data: {
          resourceId,
          provider: spec.provider ?? null,
          openSource: spec.openSource ?? false,
          contextWindow: spec.contextWindow ?? null,
          modalities: JSON.stringify(spec.modalities ?? []),
        },
      });
      break;
    case "agent":
      await tx.agent.create({
        data: {
          resourceId,
          agentKind: spec.agentKind ?? null,
          openSource: spec.openSource ?? false,
        },
      });
      break;
    case "skill":
      await tx.skill.create({
        data: {
          resourceId,
          author: spec.author ?? null,
          version: spec.version ?? null,
          trigger: spec.trigger ?? null,
          githubRepo: spec.githubRepo ?? null,
          summaryEn: spec.summaryEn ?? null,
          summaryZh: spec.summaryZh ?? null,
          skillMd: spec.skillMd ?? null,
          files: JSON.stringify(spec.files ?? []),
          versions: JSON.stringify(spec.versions ?? []),
          githubStars: spec.githubStars ?? null,
          githubForks: spec.githubForks ?? null,
          securityIndex: spec.securityIndex ?? null,
        },
      });
      break;
    case "prompt":
      await tx.prompt.create({
        data: {
          resourceId,
          content: spec.content ?? null,
          model: spec.model ?? null,
          author: spec.author ?? null,
          variables: JSON.stringify(spec.variables ?? []),
        },
      });
      break;
    case "dataset":
      await tx.dataset.create({
        data: {
          resourceId,
          format: spec.format ?? null,
          rows: spec.rows ?? null,
          license: spec.license ?? null,
          source: spec.source ?? null,
          columns: JSON.stringify(spec.columns ?? []),
        },
      });
      break;
    case "learning":
      await tx.learning.create({
        data: {
          resourceId,
          level: spec.level ?? null,
          format: spec.format ?? null,
        },
      });
      break;
    default:
      break;
  }
}
