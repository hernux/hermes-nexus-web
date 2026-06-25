import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

function getPrisma(): PrismaClient | null {
  if (globalForPrisma.prisma) return globalForPrisma.prisma
  if (!process.env.DATABASE_URL) return null
  try {
    const client = new PrismaClient()
    globalForPrisma.prisma = client
    return client
  } catch {
    return null
  }
}

export { getPrisma }
