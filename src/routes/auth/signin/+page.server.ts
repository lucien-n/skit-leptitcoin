import { error, fail, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();

        const email: string = formData.get('email')?.toString() || "";
        const password: string = formData.get('password')?.toString() || "";

        if (!email) {
            throw fail(400, { email, missing: true });
        }

        if (!password) {
            throw fail(400, { password, missing: true });
        }

        try {
            await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
        } catch (e) {
            console.error(e);
            throw error(500, { message: "Internal server error" });
        }

        throw redirect(303, '/');
    },
};