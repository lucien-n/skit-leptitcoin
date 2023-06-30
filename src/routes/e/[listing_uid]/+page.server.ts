import { getListing } from "$lib/supabase";
import type { Cookies } from "@sveltejs/kit";

export const load = async (event: { params: { listing_uid: string }, cookies: Cookies }) => {
    const listing_uid = event.params.listing_uid;

    const listing = await getListing(listing_uid);

    return {
        listing: listing
    }
}