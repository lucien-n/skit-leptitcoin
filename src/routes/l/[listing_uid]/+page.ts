import { getListing } from '$lib/supabase';

export async function load({ params }) {
	const listing_uid = params.listing_uid;

	return { listing_uid };
}
