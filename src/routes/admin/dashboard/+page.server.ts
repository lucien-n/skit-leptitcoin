import { getListings, getSupaUsers } from '$lib/supabase';
import { error } from '@sveltejs/kit';

export const load = async ({ locals: { getSession, roles, getRole }, url: { searchParams } }) => {
	const user = (await getSession())?.user;
	if (!user) throw error(401, { message: 'Unauthorized' });

	const user_role = await getRole(user.id);
	if (user_role < roles.ADMIN) throw error(401, { message: 'Unauthorized' });

	const manage = searchParams.get('q') || 'listings';

	if (manage === 'users') {
		const users = await getSupaUsers({ limit: 20 });
		return { users };
	}

	const listings = await getListings(15, 0, {});
	return { listings };
};
