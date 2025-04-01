// ✅ FICHIER : app/dashboard/projets/page.tsx

// ✅ FICHIER : app/dashboard/projets/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/utils'

type Projet = {
  id: string
  etat: 'en_cours' | 'valide' | 'abandonne' | 'test'
  nom: string
  ville: string
  telephone: string
  responsable: string
  date_creation: string
}

const STATUS_COLORS = {
  en_cours: 'bg-yellow-400',
  valide: 'bg-green-500',
  abandonne: 'bg-red-500',
  test: 'bg-gray-300',
}

export default function ProjetsPage() {
  const [projets, setProjets] = useState<Projet[]>([])

  useEffect(() => {
    // Pour l'instant on simule des données
    setProjets([
      {
        id: '1',
        etat: 'en_cours',
        nom: 'Martin',
        ville: 'Lyon',
        telephone: '0601020304',
        responsable: 'SM',
        date_creation: '01/04/2025',
      },
      {
        id: '2',
        etat: 'valide',
        nom: 'Dupont',
        ville: 'Paris',
        telephone: '0611223344',
        responsable: 'AD',
        date_creation: '30/03/2025',
      },
    ])
  }, [])

  return (
    <div className="px-6 py-4">
      <h1 className="text-2xl font-bold text-[#1E4763]">Projets</h1>
      <p className="text-sm text-gray-500 mb-6">Gérez vos projets</p>

      <div className="space-y-4">
        {projets.map(projet => (
          <div
            key={projet.id}
            className="flex items-center justify-between bg-white shadow-sm rounded-md p-4 border border-gray-200"
          >
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  'w-4 h-4 rounded-full',
                  STATUS_COLORS[projet.etat]
                )}
              />
              <span className="font-medium">{projet.nom}</span>
            </div>
            <div className="text-gray-700">{projet.ville}</div>
            <div className="text-gray-700">{projet.telephone}</div>
            <div className="text-gray-700">
              <div className="w-8 h-8 flex items-center justify-center bg-[#1E4763] text-white rounded-full text-sm font-semibold">
                {projet.responsable}
              </div>
            </div>
            <div className="text-gray-500 text-sm">{projet.date_creation}</div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="text-sm">👁️</Button>
              <Button variant="outline" size="icon" className="text-sm">✏️</Button>
              <Button variant="destructive" size="icon" className="text-sm">🗑️</Button>
            </div>
          </div>
        ))}
      </div>

      {/* Légende des pastilles */}
      <div className="mt-6 text-sm text-gray-600 space-x-4">
        <span><span className="inline-block w-3 h-3 rounded-full bg-yellow-400 mr-1" />En cours</span>
        <span><span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1" />Validé</span>
        <span><span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-1" />Abandonné</span>
        <span><span className="inline-block w-3 h-3 rounded-full bg-gray-300 mr-1" />Test</span>
      </div>
    </div>
  )
}

  