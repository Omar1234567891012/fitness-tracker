import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
 throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getSession() {
 const {
 data: { session },
 } = await supabase.auth.getSession()
 return session
}

export async function getCurrentUser() {
 const session = await getSession()
 if (!session) return null
 
 const { data: user } = await supabase
 .from('profiles')
 .select('*')
 .eq('id', session.user.id)
 .single()
 
 return user
}
