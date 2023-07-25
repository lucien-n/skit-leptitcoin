import { getListings } from '$supa/supabase';

export const load = async () => {
	const listings = getListings({});
	console.log(listings);
	return {
		listings: listings
	};
};
