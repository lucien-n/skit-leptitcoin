import { dislikeListing, isLikedByUser, likeListing } from '$supa/likes';
import { supabase } from '$supa/supabase';
import { assert, describe, it } from 'vitest';

describe('likes', () => {
	it('check if listing is liked by user', async () => {
		const resp = await isLikedByUser(
			supabase,
			'f3541a94-cf9b-4096-935c-165363be8d89',
			'ae86c595-e879-4125-8d13-a3734122e2bc'
		);

		assert.isTrue(resp);
	});

	it('like listing', async () => {
		const resp = await likeListing(
			supabase,
			'f3541a94-cf9b-4096-935c-165363be8d89',
			'ae86c595-e879-4125-8d13-a3734122e2bc'
		);

		assert.isTrue(resp);
	});

	it('dislike listing', async () => {
		const resp = await dislikeListing(
			supabase,
			'f3541a94-cf9b-4096-935c-165363be8d89',
			'ae86c595-e879-4125-8d13-a3734122e2bc'
		);

		assert.isTrue(resp);
	});
});
