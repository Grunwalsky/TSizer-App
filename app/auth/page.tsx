// ✅ FICHIER : app/auth/page.tsx

'use client'

import { useState } from 'react'
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
    <main className="flex items-center justify-center min-h-screen bg-white px-4">
      <Tabs defaultValue="signup" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Créer un compte</TabsTrigger>
          <TabsTrigger value="login" disabled>Se connecter</TabsTrigger>
        </TabsList>

        <TabsContent value="signup">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Créer un compte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Prénom</Label>
                <Input value={prenom} onChange={e => setPrenom(e.target.value)} />
              </div>
              <div>
                <Label>Nom</Label>
                <Input value={nom} onChange={e => setNom(e.target.value)} />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div>
                <Label>Mot de passe</Label>
                <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <div>
                <Label>Téléphone (facultatif)</Label>
                <Input value={telephone} onChange={e => setTelephone(e.target.value)} />
              </div>
              <div>
                <Label>Rôle</Label>
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
                <Label>ID de la franchise</Label>
                <Input value={franchiseId} onChange={e => setFranchiseId(e.target.value)} />
              </div>
              <Button onClick={handleSignup} disabled={loading} className="w-full">
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
