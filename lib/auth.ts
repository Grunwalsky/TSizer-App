import { supabase } from './supabase'

export async function signUpUser(data: {
  prenom: string
  nom: string
  email: string
  password: string
  telephone?: string
  role: 'responsable' | 'commercial'
  franchise_id: string
}) {
  // Étape 1 : Création du compte dans Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password
  })

  if (authError) {
    throw new Error('Erreur lors de la création du compte : ' + authError.message)
  }

  // Étape 2 : Ajout des infos dans la table users
  const { error: insertError } = await supabase.from('users').insert({
    id: authData.user?.id,
    prenom: data.prenom,
    nom: data.nom,
    email: data.email,
    telephone: data.telephone || '',
    role: data.role,
    franchise_id: data.franchise_id
  })

  if (insertError) {
    throw new Error('Erreur lors de l’enregistrement dans la base : ' + insertError.message)
  }

  return authData.user
}

