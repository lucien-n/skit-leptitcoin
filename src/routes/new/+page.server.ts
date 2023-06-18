import type { SupaListing } from '$lib/types/supa_listing';
import { error, redirect, type Actions } from "@sveltejs/kit";
import { v4 as uuid } from 'uuid';

export const actions: Actions = {
    new: async ({ request, locals: { supabase, getSession } }) => {
        const session = await getSession()
        if (!session) throw error(401, { message: "Unauthorized" })

        const formData = await request.formData()

        const listing: SupaListing = {
            uid: uuid(),
            author_uid: session.user.id,
            title: formData.get('title')?.toString() || "",
            description: formData.get('description')?.toString() || "",
            price: parseFloat(formData.get('price')?.toString() || "0"),
            category: formData.get('category')?.toString() || "misc",
            picture: "https://placehold.co/300x200/orange/white"
        };

        try {
            await supabase.from('listings').insert(listing)
        } catch (e) {
            console.error(e)
        }

        throw redirect(303, '/')
    }
};