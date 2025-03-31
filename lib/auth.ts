// ✅ FICHIER : lib/auth.ts

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
  // Étape 1 : Vérifier si l'email existe déjà dans la table "users"
  const { data: existing, error: checkError } = await supabase
    .from('users')
    .select('id')
    .eq('email', data.email)
    .single()

  if (checkError && checkError.code !== 'PGRST116') {
    throw new Error('Erreur lors de la vérification de l’email : ' + checkError.message)
  }

  if (existing) {
    throw new Error('Un compte avec cette adresse e-mail existe déjà.')
  }

  // Étape 2 : Vérification du mot de passe (min 8 caractères, majuscule/minuscule)
  const passwordRegex = /^(?=.*[a-zA-Z]).{8,}$/
  if (!passwordRegex.test(data.password)) {
    throw new Error('Le mot de passe doit contenir au moins 8 caractères, avec une majuscule ou minuscule.')
  }

  // Étape 3 : Création du compte Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  })

  if (authError) {
    throw new Error('Erreur lors de la création du compte : ' + authError.message)
  }

  // Étape 4 : Insertion dans la base "users"
  const { error: insertError } = await supabase.from('users').insert({
    id: authData.user?.id,
    prenom: data.prenom,
    nom: data.nom,
    email: data.email,
    telephone: data.telephone || '',
    role: data.role,
    franchise_id: data.franchise_id,
  })

  if (insertError) {
    throw new Error('Erreur lors de l’enregistrement dans la base : ' + insertError.message)
  }

  return authData.user
}
