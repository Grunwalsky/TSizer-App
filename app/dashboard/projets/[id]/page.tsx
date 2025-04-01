// ✅ FICHIER : app/dashboard/projets/[id]/page.tsx

'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function ProjetHome() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const projetId = pathname.split('/')[3] // Récupère l’ID du projet
    if (projetId) {
      router.replace(`/dashboard/projets/${projetId}/infos-client`)
    }
  }, [pathname, router])

  return null
}
