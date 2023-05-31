import { postFireListing } from '$lib/firestore.js';
import type { ListingProp } from '$lib/types/listing.js';
import { redirect } from '@sveltejs/kit';
import { to_number } from 'svelte/internal';

export function load({ locals }) {
    if (!locals.user) {
        throw redirect(307, '/auth/signin')
    }
}

export const actions = {
    new: async ({ cookies, request }) => {
        const data = await request.formData();

        const title = data.get('title')?.toString()
        const description = data.get('description')?.toString()
        const price = to_number(data.get('price'))
        const category = data.get('category')?.toString()

        if (title === undefined || category === undefined || price === undefined) return;

        const listing: ListingProp = {
            id: new Date().getTime().toString(),
            author_id: 'test_user',
            title: title,
            description: description,
            price: price,
            category: category,
            created_at: new Date().getTime()
        }

        postFireListing(listing)
    }
}