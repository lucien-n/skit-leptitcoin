import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params, locals: { supabase } }) => {
    const profile_uid = params.user_uid
    if (!profile_uid) return new Response(null, { status: 422, statusText: 'Missing user_uid' })

    try {
        const { data } = await supabase.from('profiles').select('*').eq('uid', profile_uid)
        const profile = data![0] as SupaProfile

        return new Response(JSON.stringify(profile), { status: 200, statusText: 'Success' })
    } catch (e) {
        console.warn(e)
    }

    return new Response();
};