import { getDbUrl, getPrisma, getPrismaError } from "@/lib/prisma"

export async function GET() {
  const dbUrl = getDbUrl()
  const prisma = getPrisma()
  const prismaError = getPrismaError()
  return Response.json({
    envKeys: Object.keys(process.env).filter(k => k.includes("DATABASE") || k.includes("AUTH") || k === "NODE_ENV"),
    dbUrl,
    hasPrisma: !!prisma,
    prismaError,
  })
}
