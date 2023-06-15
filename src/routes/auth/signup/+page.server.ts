import { error, fail, redirect, type Actions, type RequestHandler } from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData()

        const email: string = formData.get('email')?.toString() || ""
        const password: string = formData.get('password')?.toString() || ""
        const username: string = formData.get('username')?.toString() || ""

        // if (!email || !password || !username) throw error(400, { message: "Missing fields" });

        if (!email) {
            throw fail(400, { email, missing: true })
        }

        if (!password) {
            throw fail(400, { password, missing: true })
        }

        if (!username) {
            throw fail(400, { username, missing: true })
        }

        try {
            const authToken = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        username: username,
                    },
                },
            })
            console.log(authToken)
        } catch (e) {
            console.error(e)
            throw error(500, { message: "Internal server error" })
        }

        throw redirect(303, '/')
    }
} 