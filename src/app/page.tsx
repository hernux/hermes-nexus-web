import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold mb-4">⚡ Hermès Nexus</h1>
        <p className="text-xl text-gray-400 mb-8">
          Cascade IA 100% gratuite — Routage intelligent multi-modèles
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { label: "Groq", desc: "14 000 req/j", color: "green" },
            { label: "OpenRouter", desc: "150 req/j", color: "blue" },
            { label: "Navigateurs", desc: "5 LLMs", color: "purple" },
          ].map((item) => (
            <div key={item.label} className="bg-gray-900 p-4 rounded-xl border border-gray-800">
              <p className="text-2xl font-bold text-${item.color}-400">{item.label}</p>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-center">
          <Link href="/login"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition">
            Se connecter
          </Link>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer"
            className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold transition">
            GitHub
          </a>
        </div>

        <p className="mt-8 text-gray-600 text-sm">
          Stack: Next.js · NeonDB · Prisma · NextAuth · Vercel
        </p>
      </div>
    </div>
  )
}
