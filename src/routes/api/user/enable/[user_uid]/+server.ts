import { error, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({
	params,
	locals: { supabase, isUserAllowed, roles, getUser }
}) => {
	const user_uid = params.user_uid;
	if (!user_uid) throw error(422, { message: 'Missing user_uid' });

	const is_allowed = await isUserAllowed(roles.ADMIN);
	if (!is_allowed) throw error(422, { message: 'Insuficient permission' });

	const current_user_uid = (await getUser())?.id;
	if (!current_user_uid) throw error(500, { message: 'Internal server error' });

	try {
		const { error: err } = await supabase
			.from('profiles')
			.update({ restricted: false, restricted_by: null, restricted_at: null })
			.eq('uid', user_uid);
		if (err) throw error(404, { message: err.message });
	} catch (e) {
		console.warn(e);
		throw error(500);
	}

	return new Response();
};
