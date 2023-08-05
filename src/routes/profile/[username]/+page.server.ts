import { getListings, getProfile } from '$supa/supabase';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase }, params: { username }, url: { search } }) => {
	const user_profile = await getProfile({ sb: supabase, match: { username } });

	const user_listings = await getListings({
		sb: supabase,
		match: { author_uid: user_profile?.uid }
	});

	return {
		user_profile,
		user_listings,
		anonymous: search === '?ano'
	};
}) satisfies PageServerLoad;
