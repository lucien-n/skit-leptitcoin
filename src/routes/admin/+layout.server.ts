import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './dashboard/$types';

export const load = (async ({ locals: { getSession, getRole, roles } }) => {
	const user = (await getSession())?.user;
	if (!user) throw error(401, { message: 'Unauthorized' });

	const user_role = await getRole(user.id);
	if (user_role < roles.ADMIN) throw error(401, { message: 'Unauthorized' });
}) satisfies PageServerLoad;
