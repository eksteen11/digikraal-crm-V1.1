import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'admin' | 'agent' | 'user'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'agent' | 'user'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'agent' | 'user'
          created_at?: string
          updated_at?: string
        }
      }
      integrations: {
        Row: {
          id: string
          user_id: string
          service: 'airtable' | 'whatsapp' | 'gmail' | 'google_contacts' | 'sql'
          status: 'connected' | 'disconnected' | 'error'
          config: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          service: 'airtable' | 'whatsapp' | 'gmail' | 'google_contacts' | 'sql'
          status?: 'connected' | 'disconnected' | 'error'
          config?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          service?: 'airtable' | 'whatsapp' | 'gmail' | 'google_contacts' | 'sql'
          status?: 'connected' | 'disconnected' | 'error'
          config?: any
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
