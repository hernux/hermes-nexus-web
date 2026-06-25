import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getPrisma } from "@/lib/prisma"

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const prisma = getPrisma()
  const users = prisma ? await prisma.user.findMany({ select: { id: true, email: true, name: true, createdAt: true } }) : []

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">⚡ Hermès Nexus</h1>
        <p className="text-gray-400 mb-8">
          Connecté en tant que <span className="text-blue-400">{session.user.email}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h2 className="text-lg font-semibold mb-1">🧠 Routage Intelligent</h2>
            <p className="text-3xl font-bold text-green-400">7 types</p>
            <p className="text-gray-500 text-sm">code, data, web, maths...</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h2 className="text-lg font-semibold mb-1">🔗 Cascade</h2>
            <p className="text-3xl font-bold text-blue-400">5 LLMs</p>
            <p className="text-gray-500 text-sm">Groq → OpenRouter ×3</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h2 className="text-lg font-semibold mb-1">💰 Coût</h2>
            <p className="text-3xl font-bold text-green-400">0 €</p>
            <p className="text-gray-500 text-sm">100% gratuit</p>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 mb-8">
          <h2 className="text-lg font-semibold mb-4">📊 Cascade de décision</h2>
          <div className="space-y-3">
            {[
              { step: "0", label: "Image/vidéo ?", action: "FAL.ai / Pollinations", icon: "🎨" },
              { step: "1", label: "Vision input ?", action: "OpenRouter multimodal", icon: "🖼️" },
              { step: "2", label: "Deep Research ?", action: "Perplexity", icon: "🔬" },
              { step: "3", label: "Web search ?", action: "Google via Playwright", icon: "🌐" },
              { step: "4", label: "Routage intelligent", action: "smart-router.js", icon: "🧠" },
              { step: "5", label: "Cascade API", action: "Groq → OpenRouter ×3", icon: "⚡" },
              { step: "6", label: "Fallback", action: "Claude → ChatGPT → ...", icon: "🌍" },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-4 p-3 bg-gray-800 rounded-lg">
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <span className="text-gray-400 text-sm">Étape {item.step}</span>
                  <p className="font-medium">{item.label}</p>
                </div>
                <span className="text-blue-400 text-sm">{item.action}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <h2 className="text-lg font-semibold mb-4">👥 Utilisateurs ({users.length})</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-800">
                <th className="text-left pb-2">Email</th>
                <th className="text-left pb-2">Nom</th>
                <th className="text-left pb-2">Créé le</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-gray-800/50">
                  <td className="py-2">{u.email}</td>
                  <td className="py-2">{u.name || "-"}</td>
                  <td className="py-2 text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
