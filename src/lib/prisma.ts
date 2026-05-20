import { PrismaClient } from "@prisma/client"
import path from "path"
import fs from "fs"

const getDatabaseUrl = () => {
  const dbName = "dev.db"
  const srcPath = path.join(process.cwd(), "prisma", dbName)
  const destPath = path.join("/tmp", dbName)

  // In Vercel serverless environment, we copy the SQLite file to /tmp so we can read and write to it.
  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    try {
      let shouldCopy = false
      if (!fs.existsSync(destPath)) {
        shouldCopy = true
      } else {
        const srcStat = fs.statSync(srcPath)
        const destStat = fs.statSync(destPath)
        if (srcStat.mtimeMs > destStat.mtimeMs || srcStat.size !== destStat.size) {
          shouldCopy = true
        }
      }
      if (shouldCopy) {
        fs.copyFileSync(srcPath, destPath)
      }
      return `file:${destPath}`
    } catch (error) {
      console.error("Failed to copy database to /tmp:", error)
      return `file:${srcPath}`
    }
  }

  return `file:${srcPath}`
}

const dbUrl = getDatabaseUrl()

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

// Trigger hot reload after db wipe
export const prisma = globalForPrisma.prisma || new PrismaClient({
  datasources: {
    db: {
      url: dbUrl,
    },
  },
})

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

