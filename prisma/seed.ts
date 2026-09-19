import { prisma } from "../lib/db";
import { hashPassword } from "../lib/password";
import { randomUUID } from "node:crypto";
import { seedPosts, seedResources } from "../lib/resources/seed-data";
import {
  CATEGORY_SEED,
  PRICING_SEED,
  STATUS_SEED,
  TYPE_SEED,
} from "../lib/resources/seed-options";
import { syncSpec } from "../lib/resources/spec";

async function main() {
  // 1. 管理员账号
  const adminEmail = "admin@aivalley.local";
  const adminPassword = "admin123456"; // 初始密码，登录后可改
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });
  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: "Admin",
        passwordHash: hashPassword(adminPassword),
        role: "ADMIN",
      },
    });
    console.log(`✅ 管理员账号已创建：${adminEmail} / ${adminPassword}`);
  } else {
    console.log(`ℹ️ 管理员账号已存在，跳过创建`);
  }

  // 2. 枚举选项（upsert 写入基线，保留管理员后续改动）
  const optionSeeds = [
    ...TYPE_SEED.map((o) => ({ kind: "type", ...o })),
    ...CATEGORY_SEED.map((o) => ({ kind: "category", ...o })),
    ...PRICING_SEED.map((o) => ({ kind: "pricing", ...o })),
    ...STATUS_SEED.map((o) => ({ kind: "status", ...o })),
  ];
  for (const o of optionSeeds) {
    await prisma.enumOption.upsert({
      where: { kind_value: { kind: o.kind, value: o.value } },
      update: {}, // 已存在则跳过，避免覆盖管理员对标签/排序/启用的改动
      create: {
        kind: o.kind,
        value: o.value,
        labelI18n: JSON.stringify(o.labelI18n),
        sortOrder: o.sortOrder,
        active: true,
      },
    });
  }
  console.log(`✅ 已就绪 ${optionSeeds.length} 个枚举选项`);

  // 3. 资源（重新填充，重置已收录的资源）
  await prisma.favorite.deleteMany();
  await prisma.tool.deleteMany();
  await prisma.model.deleteMany();
  await prisma.agent.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.learning.deleteMany();
  await prisma.resource.deleteMany();
  for (const r of seedResources) {
    const id = randomUUID();
    await prisma.$transaction(async (tx) => {
      await tx.resource.create({
        data: {
          id,
          uuid: id,
          type: r.type,
          nameEn: r.nameEn,
          nameZh: r.nameZh,
          descEn: r.descEn,
          descZh: r.descZh,
          nameI18n: r.i18n?.name ? JSON.stringify(r.i18n.name) : "{}",
          descI18n: r.i18n?.desc ? JSON.stringify(r.i18n.desc) : "{}",
          url: r.url,
          category: r.category,
          tags: JSON.stringify(r.tags),
          pricing: r.pricing,
          logo: r.logo ?? null,
          featured: r.featured ?? false,
          status: "PUBLISHED",
        },
      });
      await syncSpec(tx, id, r.type, {});
    });
  }
  console.log(`✅ 已填充 ${seedResources.length} 条资源`);

  // 4. 博客文章（按 slug 幂等创建）
  for (const p of seedPosts) {
    const existing = await prisma.post.findUnique({ where: { slug: p.slug } });
    if (!existing) {
      await prisma.post.create({
        data: {
          slug: p.slug,
          titleEn: p.titleEn,
          titleZh: p.titleZh,
          contentEn: p.contentEn,
          contentZh: p.contentZh,
          published: true,
        },
      });
    }
  }
  console.log(`✅ 博客文章已就绪`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
