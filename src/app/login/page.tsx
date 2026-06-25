"use client"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await signIn("credentials", { email, password, redirect: false })
    if (result?.error) setError("Email ou mot de passe incorrect")
    else router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-xl shadow-lg w-96 space-y-6">
        <h1 className="text-2xl font-bold text-center text-white">Hermès Nexus</h1>
        <p className="text-gray-400 text-sm text-center">Connectez-vous</p>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 outline-none" required />
        <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 outline-none" required />
        <button type="submit" className="w-full p-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition">
          Se connecter
        </button>
        <p className="text-gray-500 text-xs text-center">
          <a href="/api/auth/register" className="text-blue-400 hover:underline">Créer un compte</a>
        </p>
      </form>
    </div>
  )
}
