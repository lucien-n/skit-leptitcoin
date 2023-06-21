import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.supabase = createSupabaseServerClient({
        supabaseUrl: "https://zcxdsoyihrxxudqdnvwu.supabase.co",
        supabaseKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjeGRzb3lpaHJ4eHVkcWRudnd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY1MDE1MjksImV4cCI6MjAwMjA3NzUyOX0.MkivgwBMLXu1kMDDGTOeDjHPtIFT3J2XyZG89libt8k",
        event,
    })

    event.locals.getSession = async () => {
        const { data: { session } } = await event.locals.supabase.auth.getSession()
        return session
    }

    event.locals.getRole = async (user_uid: string): Promise<number> => {
        try {
            const { data: [{ role }] } = await event.locals.supabase.from('profiles').select('role').eq('uid', user_uid)
            return parseInt(role)
        } catch (e) {
            console.warn(e)
        }
        return 0
    }

    event.locals.roles = {
        ADMIN: 8
    }

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === "content-range"
        }
    })
}