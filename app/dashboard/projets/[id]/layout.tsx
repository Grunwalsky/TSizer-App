'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import logo from '@/public/logo-tsizer.png'

const menuItems = [
  { label: 'Détails projet', path: 'details' },
  { label: 'Infos client', path: 'infos-client' },
  { label: 'Infos logement', path: 'infos-logement' },
  { label: 'Pièces', path: 'pieces' },
  { label: 'Dimensionnement', path: 'dimensionnement' },
  { label: 'Devis', path: 'devis' },
  { label: 'Synthèse', path: 'synthese' },
]

export default function ProjetLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const projectId = pathname?.split('/')[3]

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      {/* ✅ Barre horizontale de navigation en haut */}
      <header className="bg-[#1E4763] text-white px-6 py-4 shadow-md flex items-center space-x-6">
        <Image src={logo} alt="Logo TSizer" className="w-32 -rotate-12" />
        {menuItems.map((item) => {
          const isActive = pathname?.includes(item.path)
          return (
            <Link
              key={item.path}
              href={`/dashboard/projets/${projectId}/${item.path}`}
              className={`px-4 py-2 rounded ${
                isActive
                  ? 'bg-white text-[#1E4763] font-semibold'
                  : 'hover:bg-[#95C11F] hover:text-[#1E4763]'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </header>

      {/* ✅ Contenu principal */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
