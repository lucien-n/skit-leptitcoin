import type { SupabaseClient } from '@supabase/supabase-js';

import { supabase } from '$supa/supabase';

export async function getProfiles({
	sb = supabase,
	limit = 10,
	offset = 0,
	match = {}
}: {
	sb?: SupabaseClient;
	limit?: number;
	offset?: number;
	match?: any;
}): Promise<SupaProfile[] | void> {
	try {
		const { data } = await sb
			.from('profiles')
			.select('*')
			.match(match ?? {})
			.range(offset, offset + limit);
		return data as SupaProfile[];
	} catch (e) {
		console.warn(e);
	}
}

export async function getProfile({
	sb = supabase,
	uid,
	match
}: {
	sb?: SupabaseClient;
	uid?: string;
	match?: any;
}): Promise<SupaProfile | null> {
	try {
		const {
			data: [profile]
		} = await sb
			.from('profiles')
			.select('*')
			.match(match ?? { uid } ?? {});
		return profile as SupaProfile;
	} catch (e) {
		console.warn(e);
	}

	return null;
}
