// ✅ FICHIER : app/api/signup/route.ts

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { prenom, nom, email, password, telephone, role, franchise_id } = body

    // 1. Vérifier si un utilisateur avec cet email existe déjà dans Supabase Auth
    const { data: users, error: listError } = await supabaseAdmin.auth.admin.listUsers()
    if (listError) throw new Error('Erreur vérification email : ' + listError.message)

    const exists = users.users.find(user => user.email === email)
    if (exists) {
      return NextResponse.json(
        { error: 'Un compte avec cette adresse e-mail existe déjà.' },
        { status: 400 }
      )
    }

    // 2. Créer l'utilisateur dans Supabase Auth (validation admin supabase))
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: false, // ← n'envoie pas de mail
      user_metadata: {
        active: false, // ← on l’utilise pour savoir si tu as activé le compte manuellement
      },
    })
    

    if (authError) throw new Error(authError.message)

    // 3. Ajouter dans la table "users" uniquement si le compte a bien été créé dans Auth
    if (!authData.user?.id) {
      throw new Error("Impossible de créer l'utilisateur dans la base.")
    }

    const { error: insertError } = await supabaseAdmin.from('users').insert({
      id: authData.user?.id,
      prenom,
      nom,
      email,
      telephone: telephone || '',
      role,
      franchise_id,
      active: false, // Ajouté ici
    })

    if (insertError) throw new Error('Erreur lors de l’enregistrement dans la base : ' + insertError.message)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
