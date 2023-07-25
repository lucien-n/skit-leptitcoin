import type { SupabaseClient } from '@supabase/supabase-js';

export async function getListings(
	sb: SupabaseClient,
	limit = 10,
	offset = 0,
	match: any = { is_validated: true }
): Promise<SupaListing[] | void> {
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

export async function getListing(
	sb: SupabaseClient,
	match: any = { is_validated: true }
): Promise<SupaListing | void> {
	try {
		const {
			data: [listing]
		} = await sb.from('listings').select('*').match(match);
		return listing as SupaListing;
	} catch (e) {
		console.warn(e);
	}
}
