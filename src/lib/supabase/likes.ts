import type { SupabaseClient } from '@supabase/supabase-js';

import { supabase } from '$supa/supabase';

export async function isLikedByUser({
	sb = supabase,
	listing_uid,
	user_uid
}: {
	sb?: SupabaseClient;
	listing_uid: string;
	user_uid: string;
}): Promise<boolean> {
	try {
		const {
			data
		} = await sb.from('likes').select('listing_uid').match({ listing_uid, user_uid });
		if (!data || !data[0]) return false
		const { listing_uid: fetched_uid } = data[0]
		return listing_uid === fetched_uid;
	} catch (e) {
		console.warn(e);
	}

	return false;
}

export async function dislikeListing({
	sb = supabase,
	listing_uid,
	user_uid
}: {
	sb?: SupabaseClient;
	listing_uid: string;
	user_uid: string;
}): Promise<boolean> {
	try {
		const { error: err } = await sb.from('likes').delete().match({ listing_uid, user_uid });
		if (err) console.warn(err);
		else return true;
	} catch (e) {
		console.warn(e);
	}

	return false;
}

export async function likeListing({
	sb = supabase,
	listing_uid,
	user_uid
}: {
	sb?: SupabaseClient;
	listing_uid: string;
	user_uid: string;
}): Promise<boolean> {
	try {
		const { error: err } = await sb.from('likes').insert({ listing_uid, user_uid });
		if (err) console.warn(err);
		else return true;
	} catch (e) {
		console.warn(e);
	}

	return false;
}
