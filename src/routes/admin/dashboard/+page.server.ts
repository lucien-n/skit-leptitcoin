import { getListings, getSupaUsers } from '$lib/supabase';
import { error } from '@sveltejs/kit';

export const load = async ({ locals: { getSession, roles, getRole }, url: { searchParams } }) => {
	const user = (await getSession())?.user;
	if (!user) throw error(401, { message: 'Unauthorized' });

	const userRole = await getRole(user.id);
	if (userRole < roles.ADMIN) throw error(401, { message: 'Unauthorized' });

	const manage = searchParams.get('q') || 'listings';

	if (manage === 'users') {
		const users = await getSupaUsers();
		return { users };
	}

	const listings = await getListings(15, 0, {});
	return { listings };
};
