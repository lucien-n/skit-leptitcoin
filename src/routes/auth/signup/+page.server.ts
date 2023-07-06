import { error, fail, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ request, locals: { supabase } }) => {
    const form_data = await request.formData();

    const email: string = form_data.get("email")?.toString() || "";
    const password: string = form_data.get("password")?.toString() || "";
    const username: string = form_data.get("username")?.toString() || "";

    if (!email || email === "") {
      return fail(400, { username, password, message: "Missing email" });
    }

    if (!password || password === "") {
      return fail(400, { email, username, message: "Missing password" });
    }

    if (!username || username === "") {
      return fail(400, { email, password, message: "Missing username" });
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            username: username,
          },
        },
      });
      if (error)
        return fail(400, { username, email, password, message: error.message })
    } catch (e) {
      throw error(500, { message: "Internal server error" });
    }

    throw redirect(303, "/");
  },
};
