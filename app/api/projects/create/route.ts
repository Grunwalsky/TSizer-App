// ✅ FICHIER : app/api/projects/create/route.ts

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

export async function POST() {
  const newId = uuidv4()
  const creationDate = new Date().toISOString()

  const { error } = await supabase.from('projects').insert({
    id: newId,
    etat: 'en cours',
    created_at: creationDate,
  })

  if (error) {
    console.error('Erreur création projet :', error)
    return NextResponse.json({ error: 'Erreur lors de la création du projet' }, { status: 500 })
  }

  return NextResponse.json({ id: newId }, { status: 200 })
}
