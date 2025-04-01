'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getUserFullName } from '@/lib/auth/utils'

export default function InfosClientPage() {
  const { id } = useParams()
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    adresse: '',
    code_postal: '',
    ville: '',
    telephone: '',
    email: '',
  })

  const [etat, setEtat] = useState('')
  const [dateCreation, setDateCreation] = useState('')
  const [userFullName, setUserFullName] = useState('')

  // Charger données si déjà existantes
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('projects').select().eq('id', id).single()
      if (!error && data) {
        setFormData({
          nom: data.nom || '',
          prenom: data.prenom || '',
          adresse: data.adresse || '',
          code_postal: data.code_postal || '',
          ville: data.ville || '',
          telephone: data.telephone || '',
          email: data.email || '',
        })
        setEtat(data.etat || '')
        setDateCreation(new Date(data.created_at).toLocaleDateString('fr-FR'))
      }

      const name = await getUserFullName()
      setUserFullName(name)
    }

    fetchData()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    const { error } = await supabase
      .from('projects')
      .update({ ...formData })
      .eq('id', id)

    if (!error) alert('Infos enregistrées ! ✅')
    else alert("❌ Erreur lors de l'enregistrement.")
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <p className="text-sm text-gray-500">État du projet : <strong>{etat}</strong></p>
        <p className="text-sm text-gray-500">Créé le : <strong>{dateCreation}</strong></p>
        <p className="text-sm text-gray-500">Par : <strong>{userFullName}</strong></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" />
        <Input name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Prénom" />
        <Input name="adresse" value={formData.adresse} onChange={handleChange} placeholder="Adresse" />
        <Input name="code_postal" value={formData.code_postal} onChange={handleChange} placeholder="Code postal" />
        <Input name="ville" value={formData.ville} onChange={handleChange} placeholder="Ville" />
        <Input name="telephone" value={formData.telephone} onChange={handleChange} placeholder="Téléphone" />
        <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      </div>

      <Button className="mt-6 bg-[#95C11F] hover:bg-[#85ab1c] text-white" onClick={handleSubmit}>
        Enregistrer
      </Button>
    </div>
  )
  }
