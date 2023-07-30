import { getListings } from '$supa/supabase';

export const load = async () => {
	const listings = getListings({ match: { is_validated: true } });

	return {
		listings: listings
	};
};
