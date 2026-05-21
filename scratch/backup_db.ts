import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function backup() {
  console.log("Starting database backup...");
  try {
    const users = await prisma.user.findMany();
    const appointments = await prisma.appointment.findMany();
    const orders = await prisma.order.findMany();
    const activities = await prisma.activity.findMany();

    const backupData = {
      timestamp: new Date().toISOString(),
      users,
      appointments,
      orders,
      activities
    };

    const backupDir = '/Users/chiragyogeshpednekar/Documents/tumbledry/backups';
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const backupPath = path.join(backupDir, `backup_${Date.now()}.json`);
    fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2));

    console.log(`Backup completed successfully! Saved to: ${backupPath}`);
  } catch (error) {
    console.error("Backup failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

backup();
