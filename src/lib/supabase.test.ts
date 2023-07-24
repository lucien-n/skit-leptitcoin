import {
	dislikeListing,
	getListing,
	getListings,
	getProfile,
	isLikedByUser,
	likeListing
} from '$lib/supabase';
import { assert, describe, it } from 'vitest';

describe('listings', () => {
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

describe('profiles', () => {
	it('fetches admin user by uid', async () => {
		const resp = await getProfile({ uid: 'ae86c595-e879-4125-8d13-a3734122e2bc' });

		assert.exists(resp);
		if (!resp) return;
		assert.equal(resp.username, 'Admin');
	});
});

describe('likes', () => {
	it('check if listing is liked by user', async () => {
		const resp = await isLikedByUser(
			'f3541a94-cf9b-4096-935c-165363be8d89',
			'ae86c595-e879-4125-8d13-a3734122e2bc'
		);

		assert.isTrue(resp);
	});

	it('like listing', async () => {
		const resp = await likeListing(
			'f3541a94-cf9b-4096-935c-165363be8d89',
			'ae86c595-e879-4125-8d13-a3734122e2bc'
		);

		assert.isTrue(resp);
	});

	it('dislike listing', async () => {
		const resp = await dislikeListing(
			'f3541a94-cf9b-4096-935c-165363be8d89',
			'ae86c595-e879-4125-8d13-a3734122e2bc'
		);

		assert.isTrue(resp);
	});
});
