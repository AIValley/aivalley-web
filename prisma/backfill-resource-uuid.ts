import { PrismaClient } from "@prisma/client";
import { randomUUID } from "node:crypto";

const prisma = new PrismaClient();

async function main() {
  const resources = await prisma.resource.findMany();
  let migrated = 0;
  for (const r of resources) {
    const { id, ...data } = r;
    const newId = randomUUID();
    await prisma.$transaction(async (tx) => {
      await tx.resource.create({ data: { ...data, id: newId } });
      await tx.favorite.updateMany({
        where: { resourceId: id },
        data: { resourceId: newId },
      });
      await tx.resource.delete({ where: { id } });
    });
    migrated++;
  }
  console.log(`✅ 已迁移 ${migrated} 条资源到 UUID`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
