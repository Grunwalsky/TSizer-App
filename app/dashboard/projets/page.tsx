// ✅ FICHIER : app/dashboard/projets/page.tsx

'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'

export default function ProjetsPage() {
  const router = useRouter()

  const handleAddProject = () => {
    const newProjectId = uuidv4()
    router.push(`/dashboard/projets/${newProjectId}/infos-client`)
  }

  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1E4763]">Projets</h1>
          <p className="text-sm text-gray-500">Gérez vos projets</p>
        </div>
        <Button
          onClick={handleAddProject}
          className="bg-[#95C11F] text-white rounded-full w-10 h-10 hover:bg-[#85ab1c] shadow"
          title="Ajouter un projet"
        >
          <Plus size={20} />
        </Button>
      </div>

      {/* En-tête des colonnes */}
      <div className="grid grid-cols-7 gap-4 font-semibold text-gray-600 uppercase text-sm mb-2 px-2">
        <div>État</div>
        <div>Nom</div>
        <div>Ville</div>
        <div>Téléphone</div>
        <div>Responsable</div>
        <div>Date</div>
        <div>Actions</div>
      </div>

      {/* Exemple de projet affiché */}
      <Card className="grid grid-cols-7 gap-4 items-center mb-2 px-2 py-3 shadow-sm hover:shadow-md transition">
        <div>
          <span className="inline-block bg-yellow-400 w-3 h-3 rounded-full" title="En cours" />
        </div>
        <div>Jean Dupont</div>
        <div>Lyon</div>
        <div>06 00 00 00 00</div>
        <div>
          <div className="bg-gray-200 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
            JD
          </div>
        </div>
        <div>01/04/2025</div>
        <div className="flex space-x-2">
          <button title="Voir le PDF">👁️</button>
          <button title="Modifier">✏️</button>
          <button title="Supprimer">🗑️</button>
        </div>
      </Card>

      {/* Légende en bas */}
      <div className="mt-6 text-sm text-gray-500">
        <p>Légende :
          <span className="inline-block bg-yellow-400 w-3 h-3 rounded-full mx-1" /> En cours |
          <span className="inline-block bg-green-500 w-3 h-3 rounded-full mx-1" /> Validé |
          <span className="inline-block bg-red-500 w-3 h-3 rounded-full mx-1" /> Abandonné |
          <span className="inline-block bg-gray-300 w-3 h-3 rounded-full mx-1" /> Test
        </p>
      </div>
    </main>
  )
}
