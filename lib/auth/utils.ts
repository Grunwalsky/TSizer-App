// ✅ FICHIER : lib/auth/utils.ts

import { supabase } from '@/lib/supabase'

export async function getUserFullName(): Promise<string> {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return 'Utilisateur inconnu'

  const { data, error } = await supabase
    .from('users')
    .select('prenom, nom')
    .eq('id', user.id)
    .single()

  if (error || !data) return 'Utilisateur inconnu'

  return `${data.prenom} ${data.nom}`
}
