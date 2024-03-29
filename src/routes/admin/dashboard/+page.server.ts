import { getListings, getProfiles } from '$supa/supabase';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase } }) => {
	const profiles = await getProfiles({ sb: supabase, limit: 15 });
	const listings = await getListings({ sb: supabase, limit: 15, offset: 0 });
	return { listings, profiles };
}) satisfies PageServerLoad;
