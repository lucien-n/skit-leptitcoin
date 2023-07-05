import { getListing } from "$lib/supabase";

export async function load({ fetch, params, locals: { supabase } }) {
    const listing_uid = params.listing_uid;

    const listing = await getListing(listing_uid);

    return {
        props: {
            listing
        }
    };
}