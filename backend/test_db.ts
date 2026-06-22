import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });

async function test() {
  const users = await prisma.user.findMany();
  console.log('Database connected successfully. Users count:', users.length);
}
test().catch(console.error).finally(() => prisma.$disconnect());
