import type { SupabaseClient } from '@supabase/supabase-js';

export async function getProfile(sb: SupabaseClient, match: any): Promise<SupaProfile | void> {
	try {
		const {
			data: [profile]
		} = await sb.from('profiles').select('*').match(match);
		return profile as SupaProfile;
	} catch (e) {
		console.warn(e);
	}
}
