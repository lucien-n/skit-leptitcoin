import type { SupabaseClient } from '@supabase/supabase-js';

import { supabase } from '$supa/supabase';

export async function getProfile({
	sb = supabase,
	uid
}: {
	sb?: SupabaseClient;
	uid: string;
}): Promise<SupaProfile | void> {
	try {
		const {
			data: [profile]
		} = await sb.from('profiles').select('*').match(match);
		return profile as SupaProfile;
	} catch (e) {
		console.warn(e);
	}
}
