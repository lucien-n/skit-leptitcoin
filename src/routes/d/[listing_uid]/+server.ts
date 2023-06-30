import { error, type Cookies } from "@sveltejs/kit";

export const GET = async ({ params, locals: { supabase, getSession, getRole, roles } }) => {
    const listing_uid = params.listing_uid;

    const user = (await getSession())?.user
    if (!user)
        throw error(401, { message: 'Unauthorized' })

    const { data: [{ author_uid }] } = await supabase.from('listings').select('author_uid').eq('uid', listing_uid)

    const user_uid = (await getSession())?.user.id

    const user_role = await getRole(user.id)
    if (user_uid !== author_uid && user_role < roles.ADMIN)
        throw error(401, { message: 'Unauthorized' })

    try {
        await supabase.from('listings').delete().eq('uid', listing_uid)
    } catch (e) {
        console.warn(e)
    }

    return new Response()
};