import type { SupabaseClient } from '@supabase/supabase-js';

import { supabase } from '$supa/supabase';

export async function getListings({
	sb = supabase,
	limit = 10,
	offset = 0,
	match = {}
}: {
	sb?: SupabaseClient;
	limit?: number;
	offset?: number;
	match?: any;
}): Promise<SupaListing[] | void> {
	try {
		const { data } = await sb
			.from('listings')
			.select('*')
			.match(match)
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
		const {
			data: [listing]
		} = await sb.from('listings').select('*').match(match);
		return listing as SupaListing;
	} catch (e) {
		console.warn(e);
	}
}
