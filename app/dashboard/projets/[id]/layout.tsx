// ✅ FICHIER : app/dashboard/projets/[id]/layout.tsx

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

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1E4763] text-white flex flex-col">
        <div className="h-24 flex items-center justify-center">
          <Image src={logo} alt="Logo TSizer" className="w-40 -rotate-12" />
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname?.includes(item.path)
            return (
              <Link
                key={item.path}
                href={`/dashboard/projets/${pathname?.split('/')[3]}/${item.path}`}
                className={`block px-4 py-2 rounded-md transition-all ${
                  isActive ? 'bg-white text-[#1E4763] font-semibold' : 'hover:bg-[#4A4441] hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  )
}
