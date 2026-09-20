"use server";

import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/password";
import { createSession, deleteSession, getCurrentUser } from "@/lib/auth";
import { isLocale, type Locale } from "@/lib/i18n";
import { getTaxonomy, isEnumKind } from "@/lib/resources/options";
import { parseSpecInput, syncSpec } from "@/lib/resources/spec";
import type { I18nMap } from "@/lib/resources/types";
import { randomUUID } from "node:crypto";

export type ActionResult = {
  ok: boolean;
  message?: string;
  needLogin?: boolean;
  favorited?: boolean;
};

function localeOf(formData: FormData): Locale {
  const v = String(formData.get("locale") || "");
  return isLocale(v) ? v : "zh";
}

function parseResourceInput(formData: FormData) {
  return {
    nameEn: String(formData.get("nameEn") || "").trim(),
    nameZh: String(formData.get("nameZh") || "").trim(),
    descEn: String(formData.get("descEn") || "").trim(),
    descZh: String(formData.get("descZh") || "").trim(),
    url: String(formData.get("url") || "").trim(),
    type: String(formData.get("type") || "tool"),
    category: String(formData.get("category") || "chat"),
    pricing: String(formData.get("pricing") || "free"),
    tags: String(formData.get("tags") || "")
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean),
  };
}

/** 审核流程依赖的三个系统状态，不允许在管理界面删除 */
const PROTECTED_STATUSES = ["PENDING", "PUBLISHED", "REJECTED"];

/** 校验 type/category/pricing 是 EnumOption 里的启用值，非法返回本地化错误文案 */
async function validateEnum(
  input: { type: string; category: string; pricing: string },
  locale: Locale
): Promise<string | null> {
  const t = await getTranslations({ locale });
  const taxonomy = await getTaxonomy();
  const valid = {
    type: new Set(taxonomy.type.map((o) => o.value)),
    category: new Set(taxonomy.category.map((o) => o.value)),
    pricing: new Set(taxonomy.pricing.map((o) => o.value)),
  };
  if (
    !valid.type.has(input.type) ||
    !valid.category.has(input.category) ||
    !valid.pricing.has(input.pricing)
  ) {
    return t("dashboard.taxonomy.invalid");
  }
  return null;
}

/** 从 formData 读取 9 个语言的标签输入，组成 I18nMap */
function parseLabelI18n(formData: FormData): I18nMap {
  const result: I18nMap = {};
  for (const l of ["zh", "zh-TW", "en", "ja", "ru", "ko", "es", "fr", "de"]) {
    const v = String(formData.get(`label_${l}`) || "").trim();
    if (v) result[l] = v;
  }
  return result;
}

// ---------- 认证 ----------

export async function register(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const locale = localeOf(formData);
  const t = await getTranslations({ locale });
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const name = String(formData.get("name") || "").trim();

  if (!email || password.length < 6) {
    return { ok: false, message: t("login.registerError") };
  }
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { ok: false, message: t("login.registerError") };
  }

  const user = await prisma.user.create({
    data: {
      email,
      name: name || null,
      passwordHash: hashPassword(password),
      role: "USER",
    },
  });
  await createSession(user.id);
  redirect(`/${locale}`);
}

export async function login(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const locale = localeOf(formData);
  const t = await getTranslations({ locale });
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return { ok: false, message: t("login.error") };
  }

  await createSession(user.id);
  redirect(`/${locale}`);
}

export async function logout(): Promise<void> {
  await deleteSession();
}

// ---------- 收藏 ----------

export async function toggleFavorite(
  resourceId: string
): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, needLogin: true };

  const existing = await prisma.favorite.findUnique({
    where: { userId_resourceId: { userId: user.id, resourceId } },
  });

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } });
    return { ok: true, favorited: false };
  }

  await prisma.favorite.create({ data: { userId: user.id, resourceId } });
  return { ok: true, favorited: true };
}

// ---------- 提交资源 ----------

export async function submitResource(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const locale = localeOf(formData);
  const t = await getTranslations({ locale });
  const user = await getCurrentUser();
  if (!user) return { ok: false, message: t("submit.loginRequired"), needLogin: true };

  const nameEn = String(formData.get("nameEn") || "").trim();
  const nameZh = String(formData.get("nameZh") || "").trim();
  const descEn = String(formData.get("descEn") || "").trim();
  const descZh = String(formData.get("descZh") || "").trim();
  const url = String(formData.get("url") || "").trim();
  const type = String(formData.get("type") || "tool");
  const category = String(formData.get("category") || "chat");
  const pricing = String(formData.get("pricing") || "free");
  const tags = String(formData.get("tags") || "")
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);

  if (!nameEn || !nameZh || !url) {
    return { ok: false, message: t("submit.error") };
  }
  const invalidEnum = await validateEnum({ type, category, pricing }, locale);
  if (invalidEnum) return { ok: false, message: invalidEnum };

  const id = randomUUID();
  const spec = parseSpecInput(formData, type);
  await prisma.$transaction(async (tx) => {
    await tx.resource.create({
      data: {
        id,
        uuid: id,
        type,
        nameEn,
        nameZh,
        descEn,
        descZh,
        url,
        category,
        pricing,
        tags: JSON.stringify(tags),
        status: "PENDING",
        submittedById: user.id,
      },
    });
    await syncSpec(tx, id, type, spec);
  });

  return { ok: true, message: t("submit.success") };
}

// ---------- 审核 ----------

export async function reviewSubmission(
  resourceId: string,
  action: "approve" | "reject"
): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") return { ok: false };

  if (action === "approve") {
    await prisma.resource.update({
      where: { id: resourceId },
      data: { status: "PUBLISHED" },
    });
  } else {
    await prisma.resource.update({
      where: { id: resourceId },
      data: { status: "REJECTED" },
    });
  }

  return { ok: true };
}

// ---------- 个人资料 ----------

export async function updateProfile(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const locale = localeOf(formData);
  const t = await getTranslations({ locale });
  const user = await getCurrentUser();
  if (!user) return { ok: false, needLogin: true };

  const name = String(formData.get("name") || "").trim();
  await prisma.user.update({
    where: { id: user.id },
    data: { name: name || null },
  });
  return { ok: true, message: t("dashboard.account.saved") };
}

export async function changePassword(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const locale = localeOf(formData);
  const t = await getTranslations({ locale });
  const user = await getCurrentUser();
  if (!user) return { ok: false, needLogin: true };

  const current = String(formData.get("currentPassword") || "");
  const next = String(formData.get("newPassword") || "");
  const full = await prisma.user.findUnique({ where: { id: user.id } });
  if (!full || !verifyPassword(current, full.passwordHash)) {
    return { ok: false, message: t("dashboard.account.wrongPassword") };
  }
  if (next.length < 6) {
    return { ok: false, message: t("dashboard.account.passwordTooShort") };
  }
  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: hashPassword(next) },
  });
  return { ok: true, message: t("dashboard.account.passwordSaved") };
}

// ---------- 我的提交 ----------

export async function updateSubmission(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const locale = localeOf(formData);
  const t = await getTranslations({ locale });
  const user = await getCurrentUser();
  if (!user) return { ok: false, needLogin: true };

  const id = String(formData.get("id") || "");
  const input = parseResourceInput(formData);
  if (!input.nameEn || !input.nameZh || !input.url) {
    return { ok: false, message: t("submit.error") };
  }
  const invalidEnum = await validateEnum(input, locale);
  if (invalidEnum) return { ok: false, message: invalidEnum };
  const existing = await prisma.resource.findFirst({
    where: { id, submittedById: user.id },
  });
  if (!existing) {
    return { ok: false, message: t("dashboard.submissions.notFound") };
  }
  const spec = parseSpecInput(formData, input.type);
  await prisma.$transaction(async (tx) => {
    await tx.resource.update({
      where: { id },
      data: {
        ...input,
        tags: JSON.stringify(input.tags),
        status: "PENDING",
      },
    });
    await syncSpec(tx, id, input.type, spec);
  });
  return { ok: true, message: t("dashboard.submissions.updated") };
}

export async function deleteSubmission(
  resourceId: string
): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, needLogin: true };
  const existing = await prisma.resource.findFirst({
    where: { id: resourceId, submittedById: user.id },
  });
  if (!existing) return { ok: false };
  await prisma.resource.delete({ where: { id: resourceId } });
  return { ok: true };
}

export async function resubmitSubmission(
  resourceId: string
): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, needLogin: true };
  const existing = await prisma.resource.findFirst({
    where: { id: resourceId, submittedById: user.id, status: "REJECTED" },
  });
  if (!existing) return { ok: false };
  await prisma.resource.update({
    where: { id: resourceId },
    data: { status: "PENDING" },
  });
  return { ok: true };
}

// ---------- 管理员：资源管理 ----------

export async function createResource(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const locale = localeOf(formData);
  const t = await getTranslations({ locale });
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") return { ok: false };

  const input = parseResourceInput(formData);
  if (!input.nameEn || !input.nameZh || !input.url) {
    return { ok: false, message: t("submit.error") };
  }
  const invalidEnum = await validateEnum(input, locale);
  if (invalidEnum) return { ok: false, message: invalidEnum };
  const featured = formData.get("featured") === "on";
  const id = randomUUID();
  const spec = parseSpecInput(formData, input.type);
  await prisma.$transaction(async (tx) => {
    await tx.resource.create({
      data: {
        ...input,
        id,
        uuid: id,
        tags: JSON.stringify(input.tags),
        featured,
        status: "PUBLISHED",
      },
    });
    await syncSpec(tx, id, input.type, spec);
  });
  return { ok: true, message: t("dashboard.resources.created") };
}

export async function updateResource(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const locale = localeOf(formData);
  const t = await getTranslations({ locale });
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") return { ok: false };

  const id = String(formData.get("id") || "");
  const input = parseResourceInput(formData);
  if (!input.nameEn || !input.nameZh || !input.url) {
    return { ok: false, message: t("submit.error") };
  }
  const invalidEnum = await validateEnum(input, locale);
  if (invalidEnum) return { ok: false, message: invalidEnum };
  const featured = formData.get("featured") === "on";
  const spec = parseSpecInput(formData, input.type);
  await prisma.$transaction(async (tx) => {
    await tx.resource.update({
      where: { id },
      data: {
        ...input,
        tags: JSON.stringify(input.tags),
        featured,
      },
    });
    await syncSpec(tx, id, input.type, spec);
  });
  return { ok: true, message: t("dashboard.resources.updated") };
}

export async function deleteResource(
  resourceId: string
): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") return { ok: false };
  await prisma.resource.delete({ where: { id: resourceId } });
  return { ok: true };
}

// ---------- 管理员：用户管理 ----------

export async function setUserRole(
  userId: string,
  role: "USER" | "ADMIN"
): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") return { ok: false };
  await prisma.user.update({ where: { id: userId }, data: { role } });
  return { ok: true };
}

export async function deleteUser(userId: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") return { ok: false };
  if (userId === user.id) return { ok: false }; // 不能删除自己
  await prisma.user.delete({ where: { id: userId } });
  return { ok: true };
}

// ---------- 管理员：枚举选项管理 ----------

export async function createEnumOption(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const locale = localeOf(formData);
  const t = await getTranslations({ locale });
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") return { ok: false };

  const kind = String(formData.get("kind") || "");
  const value = String(formData.get("value") || "").trim();
  const sortOrder = Number(formData.get("sortOrder") || 0);
  const active = formData.get("active") === "on";
  const labelI18n = parseLabelI18n(formData);

  if (!isEnumKind(kind) || !value) {
    return { ok: false, message: t("dashboard.taxonomy.invalid") };
  }
  try {
    await prisma.enumOption.create({
      data: {
        kind,
        value,
        labelI18n: JSON.stringify(labelI18n),
        sortOrder,
        active,
      },
    });
  } catch {
    return { ok: false, message: t("dashboard.taxonomy.duplicate") };
  }
  return { ok: true, message: t("dashboard.taxonomy.created") };
}

export async function updateEnumOption(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const locale = localeOf(formData);
  const t = await getTranslations({ locale });
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") return { ok: false };

  const id = String(formData.get("id") || "");
  const sortOrder = Number(formData.get("sortOrder") || 0);
  const active = formData.get("active") === "on";
  const labelI18n = parseLabelI18n(formData);

  if (!id) return { ok: false, message: t("dashboard.taxonomy.invalid") };
  await prisma.enumOption.update({
    where: { id },
    data: { labelI18n: JSON.stringify(labelI18n), sortOrder, active },
  });
  return { ok: true, message: t("dashboard.taxonomy.saved") };
}

export async function deleteEnumOption(
  id: string,
  locale: Locale
): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") return { ok: false };
  const t = await getTranslations({ locale });

  const opt = await prisma.enumOption.findUnique({ where: { id } });
  if (!opt) return { ok: false, message: t("dashboard.taxonomy.invalid") };
  if (opt.kind === "status" && PROTECTED_STATUSES.includes(opt.value)) {
    return { ok: false, message: t("dashboard.taxonomy.protected") };
  }

  const where =
    opt.kind === "type"
      ? { type: opt.value }
      : opt.kind === "category"
        ? { category: opt.value }
        : opt.kind === "pricing"
          ? { pricing: opt.value }
          : { status: opt.value };
  const inUse = await prisma.resource.count({ where });
  if (inUse > 0) {
    return { ok: false, message: t("dashboard.taxonomy.inUse") };
  }

  await prisma.enumOption.delete({ where: { id } });
  return { ok: true, message: t("dashboard.taxonomy.deleted") };
}

export async function reorderEnumOptions(
  kind: string,
  orderedIds: string[]
): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") return { ok: false };
  if (!isEnumKind(kind) || !Array.isArray(orderedIds)) return { ok: false };

  // 按新次序重写每个选项的 sortOrder（从 1 开始递增），仅作用于同 kind 的选项
  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.enumOption.updateMany({
        where: { id, kind },
        data: { sortOrder: index + 1 },
      })
    )
  );
  return { ok: true };
}

// ---------- 管理员：Skill GitHub 快照刷新 ----------

export async function refreshSkillGithubStats(
  resourceId: string
): Promise<ActionResult & { githubStars?: number; githubForks?: number }> {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") return { ok: false };

  const skill = await prisma.skill.findUnique({ where: { resourceId } });
  if (!skill?.githubRepo) return { ok: false };

  const [owner, repo] = skill.githubRepo.split("/");
  if (!owner || !repo) return { ok: false };

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
      cache: "no-store",
    });
    if (!res.ok) return { ok: false };

    const data = (await res.json()) as {
      stargazers_count?: number;
      forks_count?: number;
    };
    const githubStars = data.stargazers_count ?? 0;
    const githubForks = data.forks_count ?? 0;

    await prisma.skill.update({
      where: { resourceId },
      data: { githubStars, githubForks },
    });
    return { ok: true, githubStars, githubForks };
  } catch {
    return { ok: false };
  }
}
