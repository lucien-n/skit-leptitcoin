// src/routes/+layout.ts
import { userStore } from '$lib/store.js'
import { supabase } from '$lib/supabase.js'
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'

export const load = async ({ fetch, data, depends }) => {
    depends('supabase:auth')

    const supabase = createSupabaseLoadClient({
        supabaseUrl: "https://zcxdsoyihrxxudqdnvwu.supabase.co",
        supabaseKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjeGRzb3lpaHJ4eHVkcWRudnd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY1MDE1MjksImV4cCI6MjAwMjA3NzUyOX0.MkivgwBMLXu1kMDDGTOeDjHPtIFT3J2XyZG89libt8k",
        event: { fetch },
        serverSession: data.session,
    })

    const { data: { session } } = await supabase.auth.getSession()

    return { supabase, session }
}

supabase.auth.onAuthStateChange((event, _session) => {
    userStore.set(_session ? _session.user : null)
})