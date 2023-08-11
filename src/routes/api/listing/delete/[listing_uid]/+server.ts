import type { RequestHandler } from '@sveltejs/kit';

export const GET = (async ({ params, locals: { supabase, getSession, getRole, roles } }) => {
	const listing_uid = params.listing_uid;

	const user = (await getSession())?.user;
	if (!user) return new Response(null, { status: 401, statusText: 'Unauthorized' });

	const { data } = await supabase.from('listings').select('author_uid').eq('uid', listing_uid);
	const author_uid = data![0].author_uid;

	const user_uid = (await getSession())?.user.id;

	const user_role = await getRole(user.id);
	if (user_uid !== author_uid && user_role < roles.ADMIN)
		return new Response(null, { status: 401, statusText: 'Unauthorized' });

	try {
		const { data, error: err } = await supabase.from('listings').delete().eq('uid', listing_uid);
		if (err) return new Response(null, { status: 400, statusText: JSON.stringify(err) });
		else return new Response(null, { status: 200, statusText: 'Success' });
	} catch (e) {
		console.warn(e);
		return new Response(null, { status: 500, statusText: 'Internal Server Error' });
	}
}) satisfies RequestHandler;
