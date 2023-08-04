export const GET = async ({
	params,
	locals: { supabase, isUserAllowed, roles, getProfile: getUser }
}) => {
	const user_uid = params.user_uid;
	if (!user_uid) return new Response(null, { status: 422, statusText: 'Missing user_uid' });

	const is_allowed = await isUserAllowed(roles.ADMIN);
	if (!is_allowed) return new Response(null, { status: 401, statusText: 'Unauthorized' });

	const current_user_uid = (await getUser())?.id;
	if (!current_user_uid)
		return new Response(null, { status: 500, statusText: 'Internal Server Error' });

	try {
		const { error: err } = await supabase
			.from('profiles')
			.update({ restricted: false, restricted_by: null, restricted_at: null })
			.eq('uid', user_uid);
		if (err) return new Response(null, { status: 400, statusText: JSON.stringify(err) });
		else return new Response(null, { status: 200, statusText: 'Success' });
	} catch (e) {
		console.warn(e);
		new Response(null, { status: 500, statusText: 'Internal Server Error' });
	}

	return new Response();
};
