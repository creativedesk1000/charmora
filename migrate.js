const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRawUnsafe(`CREATE TABLE IF NOT EXISTS "SiteConfig" ("id" TEXT NOT NULL, "logoUrl" TEXT, "navMenu" JSONB, "footer" JSONB, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "SiteConfig_pkey" PRIMARY KEY ("id"));`);
  console.log('Table Created!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
