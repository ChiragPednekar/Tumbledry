import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const dummyUsers = [
    { id: "USR-891", name: "Rahul Sharma", email: "rahul.s@example.com", phone: "+91 98765 43210", location: "Andheri West", status: "Active" },
    { id: "USR-892", name: "Priya Patel", email: "priya.p@example.com", phone: "+91 98765 43211", location: "Bandra Kurla", status: "Active" },
    { id: "USR-893", name: "Amit Singh", email: "amit.singh@example.com", phone: "+91 98765 43212", location: "Powai", status: "Active" },
    { id: "USR-894", name: "Neha Gupta", email: "neha.g@example.com", phone: "+91 98765 43213", location: "Juhu", status: "Active" },
    { id: "USR-895", name: "Vikram Reddy", email: "vikram.r@example.com", phone: "+91 98765 43214", location: "Goregaon", status: "Blocked" },
  ];

  for (const user of dummyUsers) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    })
  }

  console.log("Seeding complete.")
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
