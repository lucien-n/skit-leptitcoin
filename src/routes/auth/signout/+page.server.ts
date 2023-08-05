import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase } }) => {
	try {
		await supabase.auth.signOut();
	} catch (e) {
		console.warn(e);
	}

	throw redirect(303, '/');
}) satisfies PageServerLoad;
