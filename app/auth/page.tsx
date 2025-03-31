// ✅ FICHIER : app/auth/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { signUpUser } from '@/lib/auth'
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

  useEffect(() => {
    const fetchFranchises = async () => {
      const { data, error } = await supabase.from('franchises').select('id, nom')
      if (error) {
        console.error('Erreur chargement franchises:', error.message)
      }
      if (data) setFranchises(data)
      console.log('Franchises chargées :', data)

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
  
      await signUpUser({
        prenom,
        nom,
        email,
        password,
        telephone,
        role,
        franchise_id: franchiseId,
      })
  
      setMessage('✅ Compte créé avec succès ! Vérifie tes mails.')
    } catch (err: any) {
      setMessage(`❌ Erreur : ${err.message}`)
    } finally {
      setLoading(false)
    }
  }
  

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white px-4 py-10">
      <Image src="/logo-tsizer.png" alt="Logo TSizer" width={160} height={80} className="mb-6" />

      <Tabs defaultValue="signup" className="w-full max-w-xl">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Créer un compte</TabsTrigger>
          <TabsTrigger value="login" disabled>Se connecter</TabsTrigger>
        </TabsList>

        <TabsContent value="signup">
          <Card className="mt-4 bg-[#F9FAFB] border border-[#1E4763] shadow-md">
            <CardHeader>
              <CardTitle className="text-[#1E4763]">Créer un compte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
              <div>
                <Label>Mot de passe *</Label>
                <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
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
              <div>
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
      </Tabs>
    </main>
  )
}
