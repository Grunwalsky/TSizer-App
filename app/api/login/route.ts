// ✅ FICHIER : app/api/login/route.ts

import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const { email, password } = await req.json()

  // 🔍 Vérification de l'existence de l'utilisateur via un SQL (auth.users)
  const { data: users, error: fetchError } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)

  if (fetchError) {
    return NextResponse.json({ error: 'Erreur de vérification.' }, { status: 500 })
  }

  if (!users || users.length === 0) {
    return NextResponse.json({ error: 'Utilisateur non trouvé.' }, { status: 404 })
  }

  // 🔐 Tentative de connexion
  const authSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { error: signInError } = await authSupabase.auth.signInWithPassword({ email, password })

  if (signInError) {
    return NextResponse.json({ error: 'Mot de passe incorrect.' }, { status: 401 })
  }

  return NextResponse.json({ message: 'Connexion réussie.' }, { status: 200 })
}

// ✅ Ajout requis pour que Next.js le reconnaisse comme module (important pour Vercel)
export const dynamic = 'force-dynamic'
