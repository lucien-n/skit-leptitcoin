import { getSupaUser } from "$lib/supabase";

export const load = async (event: { params: { user_uid: string }, url: { search: string } }) => {
    const user = await getSupaUser(event.params.user_uid)

    return {
        user: user,
        anonymous: event.url.search === "?ano"
    }
};