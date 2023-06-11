import { fs } from '$lib/firebase';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
} from 'firebase/firestore';
import type { FireListing } from './types/fire_listing';


export async function getFireListings(): Promise<FireListing[]> {
    const listings: FireListing[] = [];

    const querySnap = await getDocs(query(collection(fs, 'listings')));

    querySnap.forEach(async (listing) => {
        const fireListing = listing.data() as FireListing
        const author = await getDoc(doc(fs, "uusers", listing.get("author_uid")))
        fireListing.author_username = author.get("username")
        if (fireListing)
            listings.push(fireListing);
    });

    return listings;
}

export async function getFireListing(listing_id: string): Promise<FireListing | void> {
    const listing = await getDoc(doc(fs, "listings", listing_id))

    const data = (await getDoc(doc(fs, "users", listing.get("author_uid"))))
    if (!data) return

    const fireListing = (listing.data() as FireListing) || null
    fireListing.author_username = data.get("username")

    return fireListing
}

export async function postFireListing(listing: FireListing): Promise<void> {
    await setDoc(doc(fs, 'listings', listing.id), listing)
}