import { fail, redirect } from "@sveltejs/kit";

export const load = async ({ locals: { supabase, getSession } }) => {
  const session = await getSession();

  if (!session) {
    throw redirect(303, "/");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select(`username, full_name, website, avatar_url`)
    .eq("id", session.user.id)
    .single();

  return { session, profile };
};

export const actions = {
  update: async ({ request, locals: { supabase, getSession } }) => {
    const form_data = await request.formData();
    const full_name = form_data.get("fullName") as string;
    const username = form_data.get("username") as string;
    const website = form_data.get("website") as string;
    const avatar_url = form_data.get("avatarUrl") as string;

    const session = await getSession();

    const { error } = await supabase.from("profiles").upsert({
      id: session?.user.id,
      full_name: full_name,
      username,
      website,
      avatar_url: avatar_url,
      updated_at: new Date(),
    });

    if (error) {
      return fail(500, {
        fullName: full_name,
        username,
        website,
        avatarUrl: avatar_url,
      });
    }

    return {
      fullName: full_name,
      username,
      website,
      avatarUrl: avatar_url,
    };
  },
  signout: async ({ locals: { supabase, getSession } }) => {
    const session = await getSession();
    if (session) {
      await supabase.auth.signOut();
      throw redirect(303, "/");
    }
  },
};
