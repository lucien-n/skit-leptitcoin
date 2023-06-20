import { createClient } from '@supabase/supabase-js';
import type { SupaListing } from './types/supa_listing';
import type { SupaUser } from './types/supa_user';

export const supabase = createClient('https://zcxdsoyihrxxudqdnvwu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjeGRzb3lpaHJ4eHVkcWRudnd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY1MDE1MjksImV4cCI6MjAwMjA3NzUyOX0.MkivgwBMLXu1kMDDGTOeDjHPtIFT3J2XyZG89libt8k')

export async function getListings(limit = 10) {
    try {
        const supaListings: SupaListing[] = [];
        const { data: listings } = await supabase.from('listings').select('*').limit(limit)

        if (!listings) return []

        await Promise.all(
            listings?.map(async (listing) => {
                const parsedListing = await parseListing(listing);
                supaListings.push(parsedListing)
            })
        )

        return supaListings
    } catch (e) {
        console.warn(e)
    }
}

export async function getListing(listing_uid: string) {
    try {
        const { data: listings } = await supabase.from('listings').select('*').eq("uid", listing_uid).limit(1)
        if (!listings) return

        const listing = await parseListing(listings[0])

        return listing
    } catch (e) {
        console.warn(e)
    }
}

export async function getSupaUser(user_uid: string) {
    try {
        const { data: [{ uid, created_at: createdAt, username, rating, picture }] } = await supabase.from('profiles').select('*').eq('uid', user_uid)
        return { uid: user_uid, username: username, rating: rating, picture: picture, createdAt: createdAt } satisfies SupaUser
    } catch (e) {
        console.warn(e)
    }
}

async function likeListing(listing_uid: string, user_uid: string) {
    try {
        await supabase.from('likes').insert({ user_uid: user_uid, listing_uid: listing_uid })
    } catch (e) {
        console.warn(e)
    }
}

async function dislikeListing(listing_uid: string, user_uid: string) {
    try {
        await supabase.from('likes').delete().match({ user_uid: user_uid, listing_uid: listing_uid })
    } catch (e) {
        console.warn(e)
    }
}

export async function isListingLikedByUser(listing_uid: string, user_uid: string) {
    try {
        const { data: res } = await supabase.from('likes').select('id').match({ user_uid: user_uid, listing_uid: listing_uid })
        return res?.length !== 0
    } catch (e) {
        console.warn(e)
    }
}

export async function toggleListingLike(listing_uid: string, user_uid: string) {
    try {
        if (await isListingLikedByUser(listing_uid, user_uid))
            await dislikeListing(listing_uid, user_uid)
        else
            await likeListing(listing_uid, user_uid)
    } catch (e) {
        console.warn(e)
    }
}



async function parseListing(listingData) {
    return {
        uid: listingData.uid,
        author_uid: listingData.author_uid,
        title: listingData.title,
        description: listingData.description,
        price: listingData.price,
        category: listingData.category,
        picture: listingData.picture,
        state: listingData.state,
        created_at: listingData.created_at,
        author: await getSupaUser(listingData.author_uid),
    } satisfies SupaListing
}