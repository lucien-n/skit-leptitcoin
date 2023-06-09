import { fs } from '$lib/firebase';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
} from 'firebase/firestore';
import type { FireUser } from './types/fire_user';
import type { FireListing } from './types/fire_listing';
import type { User } from 'firebase/auth';


export async function getFireListings(): Promise<FireListing[]> {
    const listings: FireListing[] = [];

    const q = query(collection(fs, 'listings'));
    const querySnap = await getDocs(q);

    querySnap.forEach(async (doc) => {
        console.log(doc.get("id"))
        const fireListing = await getFireListing(doc.get("id"))
        console.log(fireListing)
        if (fireListing)
            listings.push(fireListing);
    });

    return listings;
}

export async function getFireListing(listing_id: string): Promise<FireListing | void> {
    const listing = await getDoc(doc(fs, "listings", listing_id))

    const author = await getFireUser(listing.get('author_id'))
    if (!author) return

    const fireListing = (listing.data() as FireListing) || null
    fireListing.author = author

    return fireListing
}

export async function postFireListing(listing: FireListing): Promise<void> {
    await setDoc(doc(fs, 'listings', listing.id), listing)
}


export async function getFireUser(user_id: string): Promise<FireUser> {
    const q = doc(fs, "users", user_id)
    const querySnap = await getDoc(q)
    const data = querySnap.data()
    const user = (data as FireUser)
    if (!user) return {
        fake: true,
        uid: "unknown",
        username: "unknown"
    } as FireUser
    return user
}