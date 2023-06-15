import { supabase } from "$lib/supabase"

export const load = async () => {
    const { data: listings } = await supabase.from('listings').select('*').limit(10)

    return {
        listings: listings
    }
}