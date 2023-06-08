import type { ListingProp } from '$lib/types/listing';
import { auth, fs } from '$lib/firebase';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    type DocumentData,
} from 'firebase/firestore';
import type { FireUser } from './types/fire_user';


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

export async function getUser(user_id: string): Promise<FireUser | null> {
    const q = doc(fs, "users", user_id)
    const querySnap = await getDoc(q)
    const data = querySnap.data()
    const user = (data as FireUser) || null
    return user
}