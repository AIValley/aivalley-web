import { PrismaClient } from "@prisma/client";
import { syncSpec } from "../lib/resources/spec";

const prisma = new PrismaClient();

async function main() {
  const resources = await prisma.resource.findMany();
  let created = 0;
  let skipped = 0;

  for (const r of resources) {
    // 仅当该资源缺少对应类型的子行时才补建，保证幂等且不覆盖已有数据
    let exists = false;
    switch (r.type) {
      case "tool":
        exists = !!(await prisma.tool.findUnique({ where: { resourceId: r.id } }));
        break;
      case "model":
        exists = !!(await prisma.model.findUnique({ where: { resourceId: r.id } }));
        break;
      case "agent":
        exists = !!(await prisma.agent.findUnique({ where: { resourceId: r.id } }));
        break;
      case "skill":
        exists = !!(await prisma.skill.findUnique({ where: { resourceId: r.id } }));
        break;
      case "learning":
        exists = !!(await prisma.learning.findUnique({ where: { resourceId: r.id } }));
        break;
      default:
        exists = true; // 未知类型无需子行
    }
    if (exists) {
      skipped++;
      continue;
    }
    await prisma.$transaction((tx) => syncSpec(tx, r.id, r.type, {}));
    created++;
  }

  console.log(`✅ 已为 ${created} 条资源建立空子行，跳过 ${skipped} 条已有/无需子行的资源`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
