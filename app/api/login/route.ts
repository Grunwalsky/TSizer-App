// ✅ FICHIER : app/api/login/route.ts

import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    // Vérifier si l'utilisateur existe dans la table "users"
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

    // Connexion avec une instance publique
    const publicClient = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    )

    const { data, error: loginError } = await publicClient.auth.signInWithPassword({ email, password })

    if (loginError) {
      return NextResponse.json({ error: 'Mot de passe incorrect.' }, { status: 401 })
    }

    return NextResponse.json({ message: 'Connexion réussie.' }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ error: 'Erreur inconnue.' }, { status: 500 })
  }
}
