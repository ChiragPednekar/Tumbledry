import { PrismaClient } from "@prisma/client"

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "file:./dev.db"
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

// Trigger hot reload after db wipe
export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
