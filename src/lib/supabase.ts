import { createClient } from '@supabase/supabase-js'
import type { SupaListing } from './types/supa_listing'

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

export async function getUsername(user_uid: string): Promise<string> {
    const { data: res } = await supabase.from('profiles').select('username').eq('uid', user_uid)
    if (!res) return "Unknown"
    return res[0].username || "unknown"
}

async function parseListing(listingData) {
    return {
        uid: listingData.uid,
        author_uid: listingData.author_uid,
        title: listingData.title,
        description: listingData.description,
        price: listingData.price,
        category: listingData.category,
        created_at: listingData.created_at,
        author: await getUsername(listingData.author_uid)
    } satisfies SupaListing
}