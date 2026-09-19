import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";
import type { I18nMap, Resource } from "./types";
import type { ResourceSpec } from "./spec";
import { getTaxonomy, type EnumOptionDto, type Taxonomy } from "./options";

const specInclude = {
  tool: true,
  model: true,
  agent: true,
  skill: true,
  learning: true,
  _count: { select: { favorites: true } },
} as const;

const resourceWithSpec = Prisma.validator<Prisma.ResourceDefaultArgs>()({
  include: specInclude,
});
type ResourceWithSpec = Prisma.ResourceGetPayload<typeof resourceWithSpec>;

function parseJson(json: string | null | undefined, fallback: unknown) {
  try {
    return JSON.parse(json ?? "");
  } catch {
    return fallback;
  }
}

function stringArray(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
}

function findLabel(options: EnumOptionDto[], value: string): I18nMap {
  return options.find((o) => o.value === value)?.labelI18n ?? {};
}

function specFromRow(row: ResourceWithSpec): ResourceSpec | null {
  switch (row.type) {
    case "tool":
      return row.tool
        ? { platform: row.tool.platform ?? undefined, apiAccess: row.tool.apiAccess }
        : null;
    case "model":
      return row.model
        ? {
            provider: row.model.provider ?? undefined,
            openSource: row.model.openSource,
            contextWindow: row.model.contextWindow,
            modalities: stringArray(parseJson(row.model.modalities, [])),
          }
        : null;
    case "agent":
      return row.agent
        ? { agentKind: row.agent.agentKind ?? undefined, openSource: row.agent.openSource }
        : null;
    case "skill":
      return row.skill
        ? {
            author: row.skill.author ?? undefined,
            version: row.skill.version ?? undefined,
            trigger: row.skill.trigger ?? undefined,
          }
        : null;
    case "learning":
      return row.learning
        ? { level: row.learning.level ?? undefined, format: row.learning.format ?? undefined }
        : null;
    default:
      return null;
  }
}

function toDto(row: ResourceWithSpec, taxonomy: Taxonomy): Resource {
  const tags = parseJson(row.tags, []);
  const nameI18n = parseJson(row.nameI18n, {});
  const descI18n = parseJson(row.descI18n, {});
  return {
    id: row.id,
    uuid: row.uuid,
    type: row.type,
    nameEn: row.nameEn,
    nameZh: row.nameZh,
    descEn: row.descEn,
    descZh: row.descZh,
    nameI18n:
      nameI18n && typeof nameI18n === "object" ? (nameI18n as Record<string, string>) : {},
    descI18n:
      descI18n && typeof descI18n === "object" ? (descI18n as Record<string, string>) : {},
    url: row.url,
    category: row.category,
    tags: Array.isArray(tags) ? tags : [],
    pricing: row.pricing,
    logo: row.logo,
    featured: row.featured,
    status: row.status,
    createdAt: row.createdAt.toISOString(),
    favoriteCount: row._count.favorites,
    spec: specFromRow(row),
    typeLabelI18n: findLabel(taxonomy.type, row.type),
    categoryLabelI18n: findLabel(taxonomy.category, row.category),
    pricingLabelI18n: findLabel(taxonomy.pricing, row.pricing),
    statusLabelI18n: findLabel(taxonomy.status, row.status),
  };
}

export async function getPublishedResources(): Promise<Resource[]> {
  const [rows, taxonomy] = await Promise.all([
    prisma.resource.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      include: specInclude,
    }),
    getTaxonomy(),
  ]);
  return rows.map((r) => toDto(r, taxonomy));
}

export async function getFeaturedResources(): Promise<Resource[]> {
  const [rows, taxonomy] = await Promise.all([
    prisma.resource.findMany({
      where: { status: "PUBLISHED", featured: true },
      orderBy: { createdAt: "desc" },
      include: specInclude,
    }),
    getTaxonomy(),
  ]);
  return rows.map((r) => toDto(r, taxonomy));
}

export async function getResourceById(id: string): Promise<Resource | null> {
  const [row, taxonomy] = await Promise.all([
    prisma.resource.findFirst({
      where: { id, status: "PUBLISHED" },
      include: specInclude,
    }),
    getTaxonomy(),
  ]);
  return row ? toDto(row, taxonomy) : null;
}

export async function getRelatedResources(
  resource: Resource,
  limit = 3
): Promise<Resource[]> {
  const [rows, taxonomy] = await Promise.all([
    prisma.resource.findMany({
      where: {
        status: "PUBLISHED",
        id: { not: resource.id },
        OR: [{ type: resource.type }, { category: resource.category }],
      },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      take: limit,
      include: specInclude,
    }),
    getTaxonomy(),
  ]);
  return rows.map((r) => toDto(r, taxonomy));
}

export async function getResourcesByType(type: string): Promise<Resource[]> {
  const [rows, taxonomy] = await Promise.all([
    prisma.resource.findMany({
      where: { status: "PUBLISHED", type },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      include: specInclude,
    }),
    getTaxonomy(),
  ]);
  return rows.map((r) => toDto(r, taxonomy));
}

export async function getStats() {
  const [resources, tools, models, agents, learning] = await Promise.all([
    prisma.resource.count({ where: { status: "PUBLISHED" } }),
    prisma.resource.count({ where: { status: "PUBLISHED", type: "tool" } }),
    prisma.resource.count({ where: { status: "PUBLISHED", type: "model" } }),
    prisma.resource.count({ where: { status: "PUBLISHED", type: "agent" } }),
    prisma.resource.count({ where: { status: "PUBLISHED", type: "learning" } }),
  ]);
  return { resources, tools, models, agents, learning };
}

export async function getFavorites(userId: string): Promise<Resource[]> {
  const [favs, taxonomy] = await Promise.all([
    prisma.favorite.findMany({
      where: { userId },
      include: { resource: { include: specInclude } },
      orderBy: { createdAt: "desc" },
    }),
    getTaxonomy(),
  ]);
  return favs
    .map((f) => f.resource)
    .filter((r) => r.status === "PUBLISHED")
    .map((r) => toDto(r, taxonomy));
}

export async function isFavorited(
  userId: string,
  resourceId: string
): Promise<boolean> {
  const fav = await prisma.favorite.findUnique({
    where: { userId_resourceId: { userId, resourceId } },
  });
  return !!fav;
}

export async function getFavoriteIds(userId: string): Promise<Set<string>> {
  const rows = await prisma.favorite.findMany({
    where: { userId },
    select: { resourceId: true },
  });
  return new Set(rows.map((r) => r.resourceId));
}

export type PendingResource = Resource & { submitterEmail: string | null };

export async function getPendingResources(): Promise<PendingResource[]> {
  const [rows, taxonomy] = await Promise.all([
    prisma.resource.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: "asc" },
      include: { submittedBy: { select: { email: true } }, ...specInclude },
    }),
    getTaxonomy(),
  ]);
  return rows.map((row) => ({
    ...toDto(row, taxonomy),
    submitterEmail: row.submittedBy?.email ?? null,
  }));
}

export async function getPosts() {
  return prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      slug: true,
      titleEn: true,
      titleZh: true,
      contentEn: true,
      contentZh: true,
      createdAt: true,
    },
  });
}

export async function getPostBySlug(slug: string) {
  return prisma.post.findFirst({
    where: { slug, published: true },
  });
}

export async function getMySubmissions(userId: string): Promise<Resource[]> {
  const [rows, taxonomy] = await Promise.all([
    prisma.resource.findMany({
      where: { submittedById: userId },
      orderBy: { createdAt: "desc" },
      include: specInclude,
    }),
    getTaxonomy(),
  ]);
  return rows.map((r) => toDto(r, taxonomy));
}

export async function getAllResources(): Promise<Resource[]> {
  const [rows, taxonomy] = await Promise.all([
    prisma.resource.findMany({
      orderBy: [{ createdAt: "desc" }],
      include: specInclude,
    }),
    getTaxonomy(),
  ]);
  return rows.map((r) => toDto(r, taxonomy));
}

export async function getAllUsers() {
  const rows = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });
  return rows.map((u) => ({
    id: u.id,
    email: u.email,
    name: u.name,
    role: u.role,
    createdAt: u.createdAt.toISOString(),
  }));
}

export async function getDashboardStats(userId: string) {
  const [submissions, pending, published, rejected, favorites] =
    await Promise.all([
      prisma.resource.count({ where: { submittedById: userId } }),
      prisma.resource.count({
        where: { submittedById: userId, status: "PENDING" },
      }),
      prisma.resource.count({
        where: { submittedById: userId, status: "PUBLISHED" },
      }),
      prisma.resource.count({
        where: { submittedById: userId, status: "REJECTED" },
      }),
      prisma.favorite.count({ where: { userId } }),
    ]);
  return { submissions, pending, published, rejected, favorites };
}
