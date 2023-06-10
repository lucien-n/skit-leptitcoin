import { getFireListings } from '$lib/firestore.js';

export const load = async () => {
    return {
        listings: await getFireListings()
    }
}