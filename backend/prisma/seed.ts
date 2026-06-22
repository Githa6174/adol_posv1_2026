import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      name: 'Administrator',
      role: 'admin'
    }
  });

  // Dummy Category & Department
  const category = await prisma.category.create({
    data: { name: 'Makanan Utama', description: 'Kategori Makanan Utama' }
  });

  const department = await prisma.department.create({
    data: { name: 'Kitchen', description: 'Dapur Utama' }
  });

  await prisma.item.upsert({
    where: { code: 'ITM-001' },
    update: {},
    create: {
      code: 'ITM-001',
      name: 'Nasi Goreng Spesial',
      description: 'Nasi goreng dengan telur dan ayam',
      category_id: category.id,
      department_id: department.id,
      price_level_1: 25000,
      tax_percentage: 11,
      is_require_printing: true,
      printer_location: 'Kitchen',
    }
  });

  // Dummy Table Zone & Tables
  const zone = await prisma.tableZone.create({
    data: { name: 'Main Hall', description: 'Area Utama' }
  });

  await prisma.table.createMany({
    data: [
      { table_number: 'T1', zone_id: zone.id, capacity: 4 },
      { table_number: 'T2', zone_id: zone.id, capacity: 4 },
      { table_number: 'T3', zone_id: zone.id, capacity: 6 },
    ]
  });

  // Dummy Payment Methods
  await prisma.paymentMethod.createMany({
    data: [
      { name: 'Tunai (Cash)', requires_reference: false },
      { name: 'Kartu Debit', requires_reference: true },
      { name: 'Kartu Kredit', requires_reference: true },
      { name: 'QRIS', requires_reference: true },
    ]
  });

  console.log('Seed completed successfully (Admin, Items, Tables, Payments).');
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
