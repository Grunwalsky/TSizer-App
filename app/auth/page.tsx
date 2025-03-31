'use client'

import { useState } from 'react'
import { signUpUser } from '@/lib/auth'

export default function AuthPage() {
  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [telephone, setTelephone] = useState('')
  const [role, setRole] = useState<'responsable' | 'commercial'>('commercial')
  const [franchiseId, setFranchiseId] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    try {
      setLoading(true)
      setMessage('')
      await signUpUser({
        prenom,
        nom,
        email,
        password,
        telephone,
        role,
        franchise_id: franchiseId
      })
      setMessage('✅ Compte créé avec succès ! Vérifie tes mails.')
    } catch (err: any) {
      setMessage(`❌ Erreur : ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-lg mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Créer un compte</h1>

      <input placeholder="Prénom" value={prenom} onChange={e => setPrenom(e.target.value)} className="w-full border p-2 rounded" />
      <input placeholder="Nom" value={nom} onChange={e => setNom(e.target.value)} className="w-full border p-2 rounded" />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-2 rounded" />
      <input placeholder="Mot de passe" type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-2 rounded" />
      <input placeholder="Téléphone (facultatif)" value={telephone} onChange={e => setTelephone(e.target.value)} className="w-full border p-2 rounded" />

      <select value={role} onChange={e => setRole(e.target.value as 'responsable' | 'commercial')} className="w-full border p-2 rounded">
        <option value="responsable">Responsable</option>
        <option value="commercial">Commercial</option>
      </select>

      <input placeholder="ID de la franchise" value={franchiseId} onChange={e => setFranchiseId(e.target.value)} className="w-full border p-2 rounded" />

      <button onClick={handleSignup} disabled={loading} className="bg-blue-600 text-white w-full p-2 rounded">
        {loading ? 'Chargement...' : 'Créer le compte'}
      </button>

      {message && <p className="text-center mt-4">{message}</p>}
    </div>
  )
}
