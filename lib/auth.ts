// ✅ FICHIER : lib/auth.ts (mise à jour sécurisée avec vérif majuscule+minuscule)!!

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
  // Étape 1 : Vérifier si un utilisateur avec cet email existe déjà dans la table "users"
  const { data: existingUser, error: userError } = await supabase
    .from('users')
    .select('id')
    .eq('email', data.email)
    .maybeSingle()

  if (userError) {
    throw new Error('Erreur lors de la vérification de l’email : ' + userError.message)
  }

  if (existingUser) {
    throw new Error('Un compte avec cette adresse e-mail existe déjà.')
  }

  // Étape 2 : Vérification du mot de passe (min 8 caractères, 1 majuscule et 1 minuscule)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  if (!passwordRegex.test(data.password)) {
    throw new Error('Le mot de passe doit contenir au moins 8 caractères, une majuscule et une minuscule.')
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
