import { redirect, type Actions, error } from "@sveltejs/kit";
import { v4 as uuid } from 'uuid';
import type { SupaListing } from '$lib/types/supa_listing';

export const load = async ({ locals: { supabase, getSession } }) => {
    console.log("load", await supabase.auth.getSession())
}

export const actions: Actions = {
    new: async ({ request, locals: { supabase, getSession } }) => {
        const session = await getSession()
        console.log(session)
        if (!session) throw error(401, { message: "Unauthorized" })

        const formData = await request.formData()

        const listing: SupaListing = {
            uid: uuid(),
            author_uid: session.user.id,
            title: formData.get('title')?.toString() || "",
            description: formData.get('description')?.toString() || "",
            price: parseFloat(formData.get('price')?.toString() || "0"),
            category: formData.get('category')?.toString() || "misc",
        };

        supabase.from('listings').insert(listing)

        throw redirect(303, '/')
    }
};