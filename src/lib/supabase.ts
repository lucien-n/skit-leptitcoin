import { createClient } from '@supabase/supabase-js'
import type { SupaListing } from './types/supa_listing'

export const supabase = createClient('https://zcxdsoyihrxxudqdnvwu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjeGRzb3lpaHJ4eHVkcWRudnd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY1MDE1MjksImV4cCI6MjAwMjA3NzUyOX0.MkivgwBMLXu1kMDDGTOeDjHPtIFT3J2XyZG89libt8k')

export async function getListing(listing_uid: string) {
    try {
        const { data: listings } = await supabase.from('listings').select('*').eq("uid", listing_uid).limit(1)
        if (!listings) return

        const listing = listings[0]

        const { data: author } = await supabase.auth.admin.getUserById(listing.author_uid)
        if (!author) return

        console.log(author)

        return {
            uid: listing.uid,
            author_uid: listing.author_uid,
            title: listing.title,
            description: listing.description,
            price: listing.price,
            category: listing.category,
            created_at: listing.created_at,
            author: author.user?.user_metadata.name
        } satisfies SupaListing
    } catch (e) {
        console.warn(e)
    }
}