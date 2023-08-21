import { getListings } from '$supa/supabase';
import type { PageLoad } from './$types';

export const load = (async ({ url: { searchParams } }) => {
	let param_price_min = searchParams.get('price_min');
	let param_price_max = searchParams.get('price_max');
	let param_category = searchParams.get('category');

	const match: any = {
		is_validated: true
	};

	let price_min;
	let price_max;

	if (param_price_min) price_min = parseInt(param_price_min) || 0;
	if (param_price_max) price_max = parseInt(param_price_max) || 0;
	if (param_category) match.category = param_category;

	const listings = getListings({ match, price_min, price_max });

	return {
		listings: listings
	};
}) satisfies PageLoad;
