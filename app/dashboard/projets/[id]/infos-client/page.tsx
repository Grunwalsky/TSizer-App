'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getUserFullName } from '@/lib/auth/utils'

export default function InfosClientPage() {
  const { id } = useParams()
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [adresse, setAdresse] = useState('')
  const [codePostal, setCodePostal] = useState('')
  const [ville, setVille] = useState('')
  const [telephone, setTelephone] = useState('')
  const [email, setEmail] = useState('')
  const [etat, setEtat] = useState('en_cours')
  const [dateCreation, setDateCreation] = useState('')
  const [userFullName, setUserFullName] = useState('')

  // Charger les infos du projet si existantes
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()

      if (data) {
        setNom(data.nom || '')
        setPrenom(data.prenom || '')
        setAdresse(data.adresse || '')
        setCodePostal(data.code_postal || '')
        setVille(data.ville || '')
        setTelephone(data.telephone || '')
        setEmail(data.email || '')
        setEtat(data.etat || 'en_cours')
        setDateCreation(new Date(data.created_at).toLocaleDateString())
      }

      const fullName = await getUserFullName()
      setUserFullName(fullName)
    }

    fetchData()
  }, [id])

  const handleSave = async () => {
    const { error } = await supabase.from('projects').update({
      nom,
      prenom,
      adresse,
      code_postal: codePostal,
      ville,
      telephone,
      email
    }).eq('id', id)

    if (error) {
      alert('Erreur lors de l\'enregistrement')
    } else {
      alert('Projet enregistré avec succès !')
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Infos en haut */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-[#1E4763]">État : {etat}</h2>
          <p className="text-sm text-gray-500">Créé le : {dateCreation}</p>
        </div>
        <p className="text-sm italic text-gray-700">Connecté en tant que : {userFullName}</p>
      </div>

      {/* Champs à remplir */}
      <div className="grid grid-cols-2 gap-4">
        <Input placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} />
        <Input placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
        <Input placeholder="Adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
        <Input placeholder="Code Postal" value={codePostal} onChange={(e) => setCodePostal(e.target.value)} />
        <Input placeholder="Ville" value={ville} onChange={(e) => setVille(e.target.value)} />
        <Input placeholder="Téléphone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      {/* Bouton enregistrer */}
      <div className="flex justify-end">
        <Button className="bg-[#95C11F] text-white hover:bg-[#85ab1c]" onClick={handleSave}>
          Enregistrer
        </Button>
      </div>
    </div>
  )
}
