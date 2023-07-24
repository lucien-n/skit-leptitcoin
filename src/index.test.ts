import { getListing, getListings } from '$lib/supabase';
import { assert, describe, it } from 'vitest';

describe('get listings', () => {
	it('fetches 2 non-validated listings where category', async () => {
		const resp = await getListings(1, 0, { is_validated: false, category: 'misc' });

		assert.exists(resp);
		assert.isArray(resp);
		if (!resp) return;
		assert.equal(resp.length, 2);
	});

	it('fetch validated listing where author_uid', async () => {
		const resp = await getListing({ author_uid: 'ae86c595-e879-4125-8d13-a3734122e2bc' });

		assert.exists(resp);
		assert.isNotArray(resp);
		if (!resp) return;
	});
});
