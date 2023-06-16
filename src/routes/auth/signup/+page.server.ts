import { error, fail, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData()

        const email: string = formData.get('email')?.toString() || ""
        const password: string = formData.get('password')?.toString() || ""
        const username: string = formData.get('username')?.toString() || ""

        if (!email || email === "") {
            console.log("Missing email")
            return fail(400, { email, missing: true })
        }

        if (!password || password === "") {
            console.log("Missing password")
            return fail(400, { password, missing: true })
        }

        if (!username || username === "") {
            console.log("Missing username")
            return fail(400, { username, missing: true })
        }

        try {
            const res = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        username: username
                    }
                }
            })
            console.log(res)
        } catch (e) {
            throw error(500, { message: "Internal server error" })
        }

        throw redirect(303, '/')
    }
} 