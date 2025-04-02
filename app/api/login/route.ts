// ✅ FICHIER : app/api/login/route.ts

import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

const supabasePublic = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

export async function POST(req: Request) {
  const { email, password } = await req.json()

  // Étape 1 – Vérifier si l'utilisateur existe dans la table users
  const { data: user, error: userError } = await supabaseAdmin
    .from('users')
    .select('id, active')
    .eq('email', email)
    .single()

  if (userError) {
    return NextResponse.json({ error: 'Utilisateur non trouvé.' }, { status: 404 })
  }

  if (!user.active) {
    return NextResponse.json({ error: 'Votre compte n\'a pas été activé.' }, { status: 403 })
  }

  // Étape 2 – Tentative de connexion
  const { error: loginError } = await supabasePublic.auth.signInWithPassword({
    email,
    password
  })

  if (loginError) {
    return NextResponse.json({ error: 'Mot de passe incorrect.' }, { status: 401 })
  }

  return NextResponse.json({ message: 'Connexion réussie.' }, { status: 200 })
}
