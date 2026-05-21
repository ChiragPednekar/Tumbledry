import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanup() {
  console.log("Starting database cleanup...");
  try {
    // Delete all dependent entities
    const deletedActivities = await prisma.activity.deleteMany({});
    console.log(`Deleted ${deletedActivities.count} activity logs.`);

    const deletedAppointments = await prisma.appointment.deleteMany({});
    console.log(`Deleted ${deletedAppointments.count} appointments.`);

    const deletedOrders = await prisma.order.deleteMany({});
    console.log(`Deleted ${deletedOrders.count} orders.`);

    // Delete all users except ADMIN
    const deletedUsers = await prisma.user.deleteMany({
      where: {
        NOT: {
          role: 'ADMIN'
        }
      }
    });
    console.log(`Deleted ${deletedUsers.count} users (preserved ADMIN users).`);

    console.log("Cleanup complete!");
  } catch (error) {
    console.error("Cleanup failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

cleanup();
