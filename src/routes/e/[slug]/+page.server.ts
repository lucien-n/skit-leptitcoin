import { getDoc, doc } from 'firebase/firestore';
import { fs } from '$lib/firebase';
import type { FireListing } from '$lib/types/fire_listing.js';
import { admin_auth } from '$lib/firebase_admin.js';
import { error } from '@sveltejs/kit';

export const load = async ({ params, cookies }) => {
    const listing_id = params.slug;

    const q = doc(fs, "listings", listing_id)
    const data = (await getDoc(q)).data() as FireListing

    const sessionCookie = cookies.get("session")

    if (!sessionCookie) throw error(401, "Unauthorized")

    try {
        const decodedClaims = await admin_auth.verifySessionCookie(sessionCookie, true)

        if (data.author_id === decodedClaims.user_id) {
            return {
                listing: data
            }
        }
    } catch (e) {
        console.error(e)
    }

    throw error(401, "You are not the author")
}