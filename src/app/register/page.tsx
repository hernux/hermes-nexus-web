"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) setError(data.error || "Erreur")
    else setSuccess(true)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-96 text-center space-y-4">
          <h1 className="text-2xl font-bold text-white">Compte créé !</h1>
          <p className="text-gray-400">Vous pouvez maintenant vous connecter.</p>
          <button onClick={() => router.push("/login")}
            className="w-full p-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition">
            Se connecter
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-xl shadow-lg w-96 space-y-6">
        <h1 className="text-2xl font-bold text-center text-white">Hermès Nexus</h1>
        <p className="text-gray-400 text-sm text-center">Créer un compte</p>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 outline-none" required />
        <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 outline-none" required />
        <button type="submit" className="w-full p-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition">
          Créer mon compte
        </button>
        <p className="text-gray-500 text-xs text-center">
          <a href="/login" className="text-blue-400 hover:underline">Déjà un compte ? Connectez-vous</a>
        </p>
      </form>
    </div>
  )
}
