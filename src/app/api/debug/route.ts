import { getDbUrl, getPrisma } from "@/lib/prisma"

export async function GET() {
  const dbUrl = getDbUrl()
  const prisma = getPrisma()
  return Response.json({
    envKeys: Object.keys(process.env).filter(k => k.includes("DATABASE") || k.includes("AUTH") || k === "NODE_ENV"),
    dbUrl,
    hasPrisma: !!prisma,
  })
}
