import { getListing } from '$lib/supabase.js'

export const load = async ({ params }) => {
    const listing_uid = params.slug
    return {
        listing: await getListing(listing_uid)
    }
}