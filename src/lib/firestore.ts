import type { ListingProp } from '$lib/types/listing';
import { auth, fs } from '$lib/firebase';
import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
} from 'firebase/firestore';


export async function getFireListings(): Promise<ListingProp[]> {
    const listings: ListingProp[] = [];

    const q = query(collection(fs, 'listings'));
    const querySnap = await getDocs(q);

    const author_name = "";

    querySnap.forEach((doc) => {
        const listing: ListingProp = {
            id: doc.get('id'),
            author_id: doc.get('author_id'),
            author_name: author_name,
            category: doc.get('category'),
            title: doc.get('title'),
            price: doc.get('price'),
            description: doc.get('description'),
            images: doc.get('images'),
            created_at: doc.get('created_at'),
        };
        listings.push(listing);
    });

    return listings;
}

export async function postFireListing(listing: ListingProp): Promise<void> {
    await setDoc(doc(fs, 'listings', listing.id), listing)
}