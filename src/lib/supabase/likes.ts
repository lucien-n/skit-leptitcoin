import type { SupabaseClient } from '@supabase/supabase-js';

export async function isLikedByUser(
	sb: SupabaseClient,
	listing_uid: string,
	user_uid: string
): Promise<boolean> {
	try {
		const {
			data: [{ listing_uid: fetched_uid }]
		} = await sb.from('likes').select('listing_uid').match({ listing_uid, user_uid });
		return listing_uid === fetched_uid;
	} catch (e) {
		console.warn(e);
	}

	return false;
}

export async function dislikeListing(
	sb: SupabaseClient,
	listing_uid: string,
	user_uid: string
): Promise<boolean> {
	try {
		const { error: err } = await sb.from('likes').delete().match({ listing_uid, user_uid });
		if (err) console.warn(err);
		else return true;
	} catch (e) {
		console.warn(e);
	}

	return false;
}

export async function likeListing(
	sb: SupabaseClient,
	listing_uid: string,
	user_uid: string
): Promise<boolean> {
	try {
		const { error: err } = await sb.from('likes').insert({ listing_uid, user_uid });
		if (err) console.warn(err);
		else return true;
	} catch (e) {
		console.warn(e);
	}

	return false;
}
