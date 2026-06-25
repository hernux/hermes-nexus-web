import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { getPrisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()
    const prisma = getPrisma()
    if (!email || !password || !prisma) return NextResponse.json({ email: "Prisma non connecté" }, { status: 400 })

    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) return NextResponse.json({ error: "Email déjà utilisé" }, { status: 400 })

    const hashed = await hash(password, 12)
    const user = await prisma.user.create({
      data: { email, password: hashed, name: name || email.split("@")[0] },
    })
    return NextResponse.json({ id: user.id, email: user.email, name: user.name })
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
