import type { Actions } from "@sveltejs/kit";
import { v4 as uuid } from 'uuid';
import type { SupaListing } from '$lib/types/supa_listing';

export const actions: Actions = {
    new: async ({ request, locals }) => {
        const formData = await request.formData()

        console.log(await locals.supabase.auth.getSession())

        const { data: { session: { user: { id } } } } = await locals.getSession();

        const listing: SupaListing = {
            uid: uuid(),
            author_uid: id,
            title: formData.get('title')?.toString() || "",
            description: formData.get('description')?.toString() || "",
            price: parseFloat(formData.get('price')?.toString() || "0"),
            category: formData.get('category')?.toString() || "misc",
        };

        locals.supabase.from('listings').insert(listing)
    }
};