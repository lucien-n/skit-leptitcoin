import { getFireListing } from '$lib/firestore.js';

export const load = async ({ params }) => {
    const listing_id = params.slug;
    return {
        listing_id: await getFireListing(listing_id)
    }
}