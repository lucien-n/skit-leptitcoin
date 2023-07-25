import { getListings } from '$supa/supabase';

export const load = async () => {
	const listings = getListings({});

	return {
		listings: listings
	};
};
