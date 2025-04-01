// ✅ FICHIER : app/api/login/route.ts

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    // Vérifie si l'utilisateur existe
    const { data: users, error: userCheckError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)

    if (userCheckError) throw new Error('Erreur de vérification : ' + userCheckError.message)

    if (!users || users.length === 0) {
      return NextResponse.json({ error: 'Utilisateur non trouvé.' }, { status: 404 })
    }

    const publicClient = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!
      )
      

    const { error: loginError } = await publicClient.auth.signInWithPassword({ email, password })

    if (loginError) {
      return NextResponse.json({ error: 'Mot de passe incorrect.' }, { status: 401 })
    }

    return NextResponse.json({ message: 'Connexion réussie.' }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erreur inconnue.' }, { status: 500 })
  }
}
