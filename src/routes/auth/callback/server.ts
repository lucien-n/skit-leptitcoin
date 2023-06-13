// src/routes/auth/callback/+server.ts
import { redirect } from '@sveltejs/kit'

export const GET = async ({ url, locals: { supabase } }): Promise<never> => {
    const code = url.searchParams.get('code')

    if (code) {
        await supabase.auth.exchangeCodeForSession(code)
    }

    throw redirect(303, '/')
}
