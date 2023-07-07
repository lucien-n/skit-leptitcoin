import { error, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({
	params,
	locals: { supabase, isUserAllowed, roles }
}) => {
	const user_uid = params.user_uid;
	if (!user_uid) throw error(422, { message: 'Missing user_uid' });

	const is_allowed = await isUserAllowed(roles.ADMIN);
	if (!is_allowed) throw error(422, { message: 'Insuficient permission' });

	try {
		const { error: err } = await supabase
			.from('profiles')
			.delete()
			.eq('uid', user_uid + 'i');
		if (err) throw error(404, { message: err.message });
	} catch (e) {
		console.warn(e);
	}

	return new Response();
};
