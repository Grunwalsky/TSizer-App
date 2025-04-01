// ✅ FICHIER : app/auth/page.tsx

'use client'

import { useEffect, useState } from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

export default function AuthPage() {
  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [telephone, setTelephone] = useState('')
  const [role, setRole] = useState<'responsable' | 'commercial'>('commercial')
  const [franchiseId, setFranchiseId] = useState('')
  const [franchises, setFranchises] = useState<{ id: string; nom: string }[]>([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [tab, setTab] = useState<'signup' | 'login'>('signup')

  useEffect(() => {
    const fetchFranchises = async () => {
      const { data, error } = await supabase.from('franchises').select('id, nom')
      if (error) {
        console.error('Erreur chargement franchises:', error.message)
      }
      if (data) setFranchises(data)
    }
    fetchFranchises()
  }, [])

  const handleSignup = async () => {
    try {
      setLoading(true)
      setMessage('')

      if (!franchiseId) {
        setMessage('❌ Veuillez sélectionner une franchise.')
        return
      }

      if (!prenom.match(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)) {
        setMessage('❌ Le prénom ne doit contenir que des lettres.')
        return
      }

      if (!nom.match(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)) {
        setMessage('❌ Le nom ne doit contenir que des lettres.')
        return
      }

      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        setMessage('❌ L’adresse email n’est pas valide.')
        return
      }

      if (password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
        setMessage('❌ Le mot de passe doit contenir au moins 8 caractères, une majuscule et une minuscule.')
        return
      }

      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prenom,
          nom,
          email,
          password,
          telephone,
          role,
          franchise_id: franchiseId,
        }),
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Erreur inconnue.')
      setMessage('✅ Compte créé avec succès ! Vérifie tes mails.')
    } catch (err: any) {
      setMessage(`❌ Erreur : ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async () => {
    try {
      setLoading(true)
      setMessage('')

      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Erreur inconnue.')

      setMessage('✅ Connexion réussie !')
    } catch (err: any) {
      setMessage(`❌ Erreur : ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white px-4 py-4">
      <Image src="/logo-tsizer.png" alt="Logo TSizer" width={320} height={160} className="mb-4" />

      <Tabs value={tab} onValueChange={(val) => setTab(val as 'signup' | 'login')} className="w-full max-w-lg">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Créer un compte</TabsTrigger>
          <TabsTrigger value="login">Se connecter</TabsTrigger>
        </TabsList>

        {/* --- CRÉATION DE COMPTE --- */}
        <TabsContent value="signup">
          <Card className="mt-4 bg-[#F9FAFB] border border-[#1E4763] shadow-md">
            <CardHeader>
              <CardTitle className="text-[#1E4763] text-center text-xl">Créer un compte</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-3 p-4">
              <div>
                <Label>Prénom *</Label>
                <Input value={prenom} onChange={e => setPrenom(e.target.value)} />
              </div>
              <div>
                <Label>Nom *</Label>
                <Input value={nom} onChange={e => setNom(e.target.value)} />
              </div>
              <div>
                <Label>Email *</Label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="relative">
                <Label>Mot de passe *</Label>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-[34px] text-sm text-gray-500"
                  tabIndex={-1}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              <div>
                <Label>Téléphone</Label>
                <Input value={telephone} onChange={e => setTelephone(e.target.value)} />
              </div>
              <div>
                <Label>Fonction *</Label>
                <select
                  value={role}
                  onChange={e => setRole(e.target.value as 'responsable' | 'commercial')}
                  className="w-full border p-2 rounded"
                >
                  <option value="responsable">Responsable</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
              <div className="relative z-10">
                <Label>Franchise *</Label>
                <select
                  value={franchiseId}
                  onChange={e => setFranchiseId(e.target.value)}
                  className="w-full border p-2 rounded"
                >
                  <option value="">-- Sélectionner une franchise --</option>
                  {franchises.map(f => (
                    <option key={f.id} value={f.id}>{f.nom}</option>
                  ))}
                </select>
              </div>
              <Button onClick={handleSignup} disabled={loading} className="w-full bg-[#95C11F] text-[#1E4763] hover:bg-[#85ab1c]">
                {loading ? 'Création en cours...' : 'Créer le compte'}
              </Button>
              {message && <p className="text-center text-sm mt-2">{message}</p>}
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- CONNEXION --- */}
        <TabsContent value="login">
          <Card className="mt-4 bg-[#F9FAFB] border border-[#1E4763] shadow-md">
            <CardHeader>
              <CardTitle className="text-[#1E4763] text-center text-xl">Se connecter</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-3 p-4">
              <div>
                <Label>Email</Label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="relative">
                <Label>Mot de passe</Label>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-[34px] text-sm text-gray-500"
                  tabIndex={-1}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              <Button onClick={handleLogin} disabled={loading} className="w-full bg-[#95C11F] text-[#1E4763] hover:bg-[#85ab1c]">
                {loading ? 'Connexion en cours...' : 'Se connecter'}
              </Button>
              {message && <p className="text-center text-sm mt-2">{message}</p>}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
