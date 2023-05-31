import { getFireListings } from '$lib/firestore.js';

export async function load({ params }) {
    return {
        listings: await getFireListings()
    }
}