import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

function getPrisma(): PrismaClient | null {
  if (globalForPrisma.prisma) return globalForPrisma.prisma
  if (!process.env.DATABASE_URL) return null
  try {
    const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })
    const client = new PrismaClient({ adapter })
    globalForPrisma.prisma = client
    return client
  } catch {
    return null
  }
}

export { getPrisma }
