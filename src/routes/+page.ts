import { getListings } from '$supa/supabase';
import type { PageLoad } from './$types';

export const load = (async () => {
	const listings = getListings({ match: { is_validated: true } });

	return {
		listings: listings
	};
}) satisfies PageLoad;
