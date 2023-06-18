import { getSupaUser } from "$lib/supabase";

export const load = async (event: { params: { user_uid: string } }) => {
    const user = await getSupaUser(event.params.user_uid)
    return {
        user: user
    }
};