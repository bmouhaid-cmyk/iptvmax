import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/supabase'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  console.log('Creating Supabase Client:', { url, key: key ? '***' : 'missing' })

  if (!url || !key) {
    console.error('Missing Supabase env vars in client!')
  }

  return createBrowserClient<Database>(
    url!,
    key!
  )
}
