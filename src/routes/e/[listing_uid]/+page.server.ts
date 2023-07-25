import { getListing } from '$supa/supabase';

export const load = async ({ locals: { supabase }, params }) => {
	const listing_uid = params.listing_uid;

	const listing = await getListing({ sb: supabase, match: { uid: listing_uid } });

	return {
		listing: listing
	};
};
