// ✅ FICHIER : app/api/login/route.ts

import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const { email, password } = await req.json()

  // 🔍 Étape 1 : Vérifier si l'utilisateur existe dans la table "users"
  const { data: users, error: fetchError } = await supabaseAdmin
    .from('users')
    .select('id')
    .eq('email', email)

  if (fetchError) {
    return NextResponse.json({ error: 'Erreur de vérification.' }, { status: 500 })
  }

  if (!users || users.length === 0) {
    return NextResponse.json({ error: 'Utilisateur non trouvé.' }, { status: 404 })
  }

  // 🔐 Étape 2 : Tentative de connexion avec Supabase Auth
  const publicClient = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  )

  const {
    data: { user },
    error: loginError,
  } = await publicClient.auth.signInWithPassword({ email, password })

  if (loginError) {
    return NextResponse.json({ error: 'Mot de passe incorrect.' }, { status: 401 })
  }

  // 🚫 Étape 3 : Vérifier si le compte est activé manuellement
  if (!user?.user_metadata?.active) {
    return NextResponse.json(
      { error: 'Votre compte n’a pas encore été activé.' },
      { status: 403 }
    )
  }

  // ✅ Connexion réussie
  return NextResponse.json({ message: 'Connexion réussie.' }, { status: 200 })
}
