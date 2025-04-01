'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getUserFullName } from '@/lib/auth/utils'

export default function InfosClientPage() {
  const params = useParams()
  const projectId = params.id as string

  const [projectData, setProjectData] = useState({
    nom: '',
    prenom: '',
    adresse: '',
    code_postal: '',
    ville: '',
    telephone: '',
    email: '',
  })

  const [userFullName, setUserFullName] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const [etat, setEtat] = useState('en_cours')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase.from('projects').select('*').eq('id', projectId).single()
      if (data) {
        setProjectData({
          nom: data.nom || '',
          prenom: data.prenom || '',
          adresse: data.adresse || '',
          code_postal: data.code_postal || '',
          ville: data.ville || '',
          telephone: data.telephone || '',
          email: data.email || '',
        })
        setCreatedAt(data.created_at?.split('T')[0])
        setEtat(data.etat || 'en_cours')
      }
    }

    const fetchUser = async () => {
      const fullName = await getUserFullName()
      setUserFullName(fullName)
    }

    fetchUser()
    fetchProject()
  }, [projectId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    setLoading(true)
    const { error } = await supabase
      .from('projects')
      .update(projectData)
      .eq('id', projectId)

    if (error) {
      setMessage("Erreur lors de l'enregistrement")
    } else {
      setMessage('✅ Données enregistrées')
    }
    setLoading(false)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-gray-500 text-sm">État : <span className="font-semibold capitalize">{etat}</span></p>
          <p className="text-gray-500 text-sm">Créé le : {createdAt}</p>
          <p className="text-gray-500 text-sm">Par : {userFullName || 'Utilisateur inconnu'}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input name="nom" placeholder="Nom" value={projectData.nom} onChange={handleChange} />
        <Input name="prenom" placeholder="Prénom" value={projectData.prenom} onChange={handleChange} />
        <Input name="adresse" placeholder="Adresse" value={projectData.adresse} onChange={handleChange} />
        <Input name="code_postal" placeholder="Code postal" value={projectData.code_postal} onChange={handleChange} />
        <Input name="ville" placeholder="Ville" value={projectData.ville} onChange={handleChange} />
        <Input name="telephone" placeholder="Téléphone" value={projectData.telephone} onChange={handleChange} />
        <Input name="email" placeholder="Adresse e-mail" type="email" value={projectData.email} onChange={handleChange} />
      </div>

      {message && <p className="text-sm mt-4">{message}</p>}

      <Button onClick={handleSave} disabled={loading} className="mt-6">
        {loading ? 'Enregistrement...' : 'Enregistrer'}
      </Button>
    </div>
  )
}
