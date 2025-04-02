// ✅ FICHIER : lib/types/supabase.ts

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          prenom: string
          nom: string
          email: string
          telephone: string | null
          role: string
          franchise_id: string
          active: boolean
        }
        Insert: {
          id?: string
          prenom: string
          nom: string
          email: string
          telephone?: string | null
          role: string
          franchise_id: string
          active?: boolean
        }
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      projects: {
        Row: {
          id: string
          nom: string
          prenom: string
          adresse: string
          code_postal: string
          ville: string
          telephone: string | null
          email: string | null
          etat: string
          created_at: string
        }
        Insert: {
          id?: string
          nom: string
          prenom: string
          adresse: string
          code_postal: string
          ville: string
          telephone?: string | null
          email?: string | null
          etat?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['projects']['Insert']>
      }      
    }
  }
}
