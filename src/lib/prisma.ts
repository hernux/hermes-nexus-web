import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }
let _prismaError: string | undefined = undefined

function getPrisma(): PrismaClient | null {
  if (globalForPrisma.prisma) return globalForPrisma.prisma
  if (!process.env.DATABASE_URL) { _prismaError = "DATABASE_URL not set"; return null }
  try {
    const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })
    const client = new PrismaClient({ adapter })
    globalForPrisma.prisma = client
    _prismaError = undefined
    return client
  } catch (e) {
    _prismaError = e instanceof Error ? e.message : String(e)
    return null
  }
}

export const getPrismaError = () => _prismaError
export const getDbUrl = () => process.env.DATABASE_URL ? process.env.DATABASE_URL.slice(0, 10) + "..." : "NOT SET"
export { getPrisma }
