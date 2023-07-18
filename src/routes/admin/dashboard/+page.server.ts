import { getListings, getSupaUsers } from '$lib/supabase';

export const load = async ({ locals: { getSession, roles, getRole }, url: { searchParams } }) => {
	const manage = searchParams.get('q') || 'listings';

	if (manage === 'users') {
		const users = await getSupaUsers({ limit: 20 });
		return { users };
	}

	const listings = await getListings(15, 0, {});
	return { listings };
};
