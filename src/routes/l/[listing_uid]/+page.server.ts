import { getListing } from '$lib/supabase.js'

export const load = async (event: { params: { listing_uid: string } }) => {
    const listing_uid = event.params.listing_uid
    return {
        listing: await getListing(listing_uid)
    }
}