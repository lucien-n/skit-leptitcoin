import { query, collection, getDoc, doc } from 'firebase/firestore';
import { auth, fs } from '$lib/firebase'
import type { FireListing } from '$lib/types/fire_listing.js';

export const load = async ({ params }) => {
    const listing_id = params.slug;

    const q = doc(fs, "listings", listing_id)
    const data = (await getDoc(q)).data() as FireListing

    if (data.author_id === auth.currentUser?.uid) {
        return {
            listing: data
        }
    }

    return {
        message: 'You are not the author of this listing'
    }
}