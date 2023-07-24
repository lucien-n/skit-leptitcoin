import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

export const supabase = createClient<Database>(
	'https://zcxdsoyihrxxudqdnvwu.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjeGRzb3lpaHJ4eHVkcWRudnd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY1MDE1MjksImV4cCI6MjAwMjA3NzUyOX0.MkivgwBMLXu1kMDDGTOeDjHPtIFT3J2XyZG89libt8k'
);

export async function getListings(
	limit = 10,
	offset = 0,
	match: any = { is_validated: true }
): Promise<SupaListing[] | void> {
	try {
		const { data } = await supabase
			.from('listings')
			.select('*')
			.match(match)
			.range(offset, offset + limit);
		return data as SupaListing[];
	} catch (e) {
		console.warn(e);
	}
}

export async function getListing(match: any = { is_validated: true }): Promise<SupaListing | void> {
	try {
		const {
			data: [listing]
		} = await supabase.from('listings').select('*').match(match);
		return listing as SupaListing;
	} catch (e) {
		console.warn(e);
	}
}

export async function getProfile(match: any): Promise<SupaProfile | void> {
	try {
		const {
			data: [profile]
		} = await supabase.from('profiles').select('*').match(match);
		return profile as SupaProfile;
	} catch (e) {
		console.warn(e);
	}
}

export async function isLikedByUser(listing_uid: string, user_uid: string): Promise<boolean> {
	try {
		const {
			data: [{ listing_uid: fetched_uid }]
		} = await supabase.from('likes').select('listing_uid').match({ listing_uid, user_uid });
		return listing_uid === fetched_uid;
	} catch (e) {
		console.warn(e);
	}

	return false;
}
