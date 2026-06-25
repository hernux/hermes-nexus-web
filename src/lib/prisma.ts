import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | null }
let prisma: PrismaClient | null = null

try {
  prisma = globalForPrisma.prisma ?? new PrismaClient()
  if (process.env.NODE_ENV !== "production" && prisma) globalForPrisma.prisma = prisma
} catch {
  console.warn("⚠️ Prisma non initialisé — vérifier DATABASE_URL")
}

export { prisma }
// Deployed: 2026-06-25 06:39
