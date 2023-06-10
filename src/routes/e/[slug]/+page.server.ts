import { admin_auth } from '$lib/firebase_admin.js';
import { error } from '@sveltejs/kit';
import { getFireListing } from '$lib/firestore.js';

export const load = async ({ params, cookies }) => {
    const listing_id = params.slug;

    const listing = await getFireListing(listing_id)
    if (!listing) throw error(404, "Listing not found")

    const sessionCookie = cookies.get("session")

    if (!sessionCookie) throw error(401, "Unauthorized")

    try {
        const decodedClaims = await admin_auth.verifySessionCookie(sessionCookie, true)

        if (listing.author_uid === decodedClaims.user_id)
            return {
                listing: listing
            }
    } catch (e) {
        console.error(e)
    }

    throw error(401, "You are not the author")
}