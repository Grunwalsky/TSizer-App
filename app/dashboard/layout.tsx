// ✅ FICHIER : app/dashboard/layout.tsx

import '@/app/globals.css'
import { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createBrowserClient } from '@supabase/ssr'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { supabase } from '@/lib/supabase'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <div className="flex min-h-screen">
        {/* ✅ Colonne de navigation */}
        <aside className="w-64 bg-[#1E4763] text-white flex flex-col p-4">
          <Image
            src="/logo-tsizer.png"
            alt="Logo TSizer"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto mb-4 px-4"
          />

          {/* CHIFFRAGE */}
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase text-[#95C11F] mb-2">CHIFFRAGE</p>
            <Link
              href="/dashboard/projets"
              className="block py-2 px-4 rounded hover:bg-[#95C11F] hover:text-[#1E4763]"
            >
              Projets
            </Link>
          </div>

          {/* MON COMPTE */}
          <div className="mt-auto">
            <p className="text-sm font-semibold uppercase text-[#95C11F] mb-2">MON COMPTE</p>
            <Link
              href="/dashboard/profil"
              className="block py-2 px-4 rounded hover:bg-[#95C11F] hover:text-[#1E4763]"
            >
              Profil
            </Link>
            <Link
              href="/dashboard/equipe"
              className="block py-2 px-4 rounded hover:bg-[#95C11F] hover:text-[#1E4763]"
            >
              Équipe
            </Link>
            <Link
              href="/auth"
              className="block py-2 px-4 rounded hover:bg-red-600 hover:text-white mt-4"
            >
              Se déconnecter
            </Link>
          </div>
        </aside>

        {/* ✅ Zone de contenu principale */}
        <main className="flex-1 bg-[#F9FAFB] p-6">{children}</main>
      </div>
    </SessionContextProvider>
  )
}
