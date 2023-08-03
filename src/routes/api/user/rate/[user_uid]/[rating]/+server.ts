export const GET = async ({ params, locals: { supabase, getSession } }) => {
	const rating_str = params.rating;
	if (Number.isNaN(parseFloat(rating_str)))
		return new Response(null, { status: 422, statusText: 'NaN' });

	const rating = parseInt(rating_str);
	if (rating > 5 || rating < 0)
		new Response(null, { status: 422, statusText: 'Out Of Bounds (0 <= rating <= 5)' });

	const user = (await getSession())?.user;
	if (!user) return new Response(null, { status: 401, statusText: 'Unauthorized' });

	const rated_user_uid = params.user_uid;
	if (rated_user_uid === user.id)
		return new Response(null, { status: 401, statusText: 'Unauthorized' });

	const {
		data: [{ uid: user_uid }]
	} = await supabase.from('profiles').select('uid').eq('uid', rated_user_uid);
	if (user_uid !== rated_user_uid)
		new Response(null, { status: 404, statusText: 'User Not Found' });

	try {
		const { error: err } = await supabase
			.from('ratings')
			.insert({ rated: rated_user_uid, rater: user.id, value: rating });
		if (err) return new Response(null, { status: 400, statusText: JSON.stringify(err) });
		else return new Response(null, { status: 200, statusText: 'Success' });
	} catch (e) {
		console.warn(e);
		new Response(null, { status: 500, statusText: 'Internal Server Error' });
	}

	return new Response();
};
