import { error, type Cookies } from '@sveltejs/kit';

export const GET = async ({ params, locals: { supabase, getSession, getRole, roles } }) => {
	const listingUid = params.listing_uid;

	const user = (await getSession())?.user;
	if (!user) throw error(401, { message: 'Unauthorized' });

	const {
		data: [{ authorUid }]
	} = await supabase.from('listings').select('authorUid').eq('uid', listingUid);

	const userUid = (await getSession())?.user.id;

	const userRole = await getRole(user.id);
	if (userUid !== authorUid && userRole < roles.ADMIN)
		throw error(401, { message: 'Unauthorized' });

	try {
		await supabase.from('listings').delete().eq('uid', listingUid);
	} catch (e) {
		console.warn(e);
	}

	return new Response();
};
