import type { SupabaseClient } from '@supabase/supabase-js';

import { supabase } from '$supa/supabase';

export async function getListings({
	sb = supabase,
	limit = 10,
	offset = 0,
	match = {},
	price_min = 0,
	price_max = 999999
}: {
	sb?: SupabaseClient;
	limit?: number;
	offset?: number;
	match?: any;
	price_min?: number;
	price_max?: number;
}): Promise<SupaListing[] | void> {
	try {
		const { data } = await sb
			.from('listings')
			.select('*')
			.match(match || {})
			.gte('price', price_min)
			.lte('price', price_max)
			.range(offset, offset + limit);
		return data as SupaListing[];
	} catch (e) {
		console.warn(e);
	}
}

export async function getListing({
	sb = supabase,
	match = {}
}: {
	sb?: SupabaseClient;
	match?: any;
}): Promise<SupaListing | void> {
	try {
		const { data } = await sb
			.from('listings')
			.select('*')
			.match(match ?? {});
		const listing = data![0];

		return listing as SupaListing;
	} catch (e) {
		console.warn(e);
	}
}

export async function getListingPicture({
	sb = supabase,
	listing_uid,
	author_uid
}: {
	sb: SupabaseClient;
	listing_uid: string;
	author_uid: string;
}) {
	try {
		const { data, error } = await sb.storage
			.from('listings_pictures')
			.download(`${author_uid}/${listing_uid}.jpg`);
		if (error) console.warn(error);
		else return data;
	} catch (e) {
		console.warn(e);
	}
}
