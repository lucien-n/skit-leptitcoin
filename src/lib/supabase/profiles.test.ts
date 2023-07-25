import { getProfile } from '$supa/profiles';
import { supabase } from '$supa/supabase';
import { assert, describe, it } from 'vitest';

describe('profiles', () => {
	it('fetches admin user by uid', async () => {
		const resp = await getProfile(supabase, { uid: 'ae86c595-e879-4125-8d13-a3734122e2bc' });

		assert.exists(resp);
		if (!resp) return;
		assert.equal(resp.username, 'Admin');
	});
});
