import { getListing, getListings } from '$supa/listings';
import { assert, describe, it } from 'vitest';

describe('listings', () => {
	it('fetches 2 non-validated listings where category', async () => {
		const resp = await getListings({
			limit: 1,
			offset: 0,
			match: { is_validated: false, category: 'misc' }
		});

		assert.exists(resp);
		assert.isArray(resp);
		if (!resp) return;
		assert.equal(resp.length, 2);
	});

	it('fetch validated listing where author_uid', async () => {
		const resp = await getListing({
			match: { author_uid: 'ae86c595-e879-4125-8d13-a3734122e2bc' }
		});

		assert.exists(resp);
		assert.isNotArray(resp);
		if (!resp) return;
	});
});
