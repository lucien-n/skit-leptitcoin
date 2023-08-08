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

	const { data } = await supabase.from('profiles').select('uid').eq('uid', rated_user_uid);
	const user_uid = data![0].uid;

	if (user_uid !== rated_user_uid)
		new Response(null, { status: 404, statusText: 'User Not Found' });

	try {
		const { data, error: err } = await supabase
			.from('ratings')
			.upsert(
				{ rated: rated_user_uid, rater: user.id, value: rating },
				{ onConflict: 'rated, rater' }
			)
			.select('uid');
		if (err) return new Response(null, { status: 400, statusText: JSON.stringify(err) });

		const rating_uid = data![0].uid;
		if (!rating_uid) return new Response(null, { status: 500, statusText: 'Internal Error' });

		const { error: err2 } = await supabase
			.from('ratings')
			.update({ rated: rated_user_uid, rater: user.id, value: rating })
			.eq('uid', rating_uid);
		if (err2) return new Response(null, { status: 400, statusText: JSON.stringify(err) });

		return new Response(null, { status: 200, statusText: 'Success' });
	} catch (e) {
		console.warn(e);
		new Response(null, { status: 500, statusText: 'Internal Server Error' });
	}

	return new Response();
};
