import { getSupaUser, getUserListings } from '$lib/supabase';

export const load = async ({
	params: { username },
	url: { search }
}: {
	params: { username: string };
	url: { search: string };
}) => {
	const user = await getSupaUser({ username });

	const user_listings = await getUserListings(user?.uid);

	return {
		user: user,
		anonymous: search === '?ano',
		listings: user_listings
	};
};
