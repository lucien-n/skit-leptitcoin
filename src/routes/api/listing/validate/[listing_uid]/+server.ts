export const GET = async ({
	params,
	locals: { supabase, isUserAllowed, roles, getProfile: getUser }
}) => {
	const listing_uid = params.listing_uid;
	if (!listing_uid) return new Response(null, { status: 422, statusText: 'Missing listing_uid' });

	const is_allowed = await isUserAllowed(roles.ADMIN);
	if (!is_allowed) return new Response(null, { status: 401, statusText: 'Unauthorized' });

	const current_user_uid = (await getUser())?.uid;

	try {
		const { error: err } = await supabase
			.from('listings')
			.update({
				is_validated: true,
				validated_at: new Date().toUTCString(),
				validated_by: current_user_uid ?? 'unknown'
			})
			.match({ uid: listing_uid });
		if (err) return new Response(null, { status: 400, statusText: JSON.stringify(err) });
		else return new Response(JSON.stringify(true), { status: 200, statusText: 'Success' });
	} catch (e) {
		console.warn(e);
		return new Response(null, { status: 500, statusText: 'Internal Server Error' });
	}
};
