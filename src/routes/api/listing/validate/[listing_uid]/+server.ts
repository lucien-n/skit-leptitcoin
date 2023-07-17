import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({
	params,
	locals: { supabase, isUserAllowed, roles, getUser }
}) => {
	const listing_uid = params.listing_uid;
	if (!listing_uid) throw error(422, { message: 'Missing listing_uid' });

	const is_allowed = await isUserAllowed(roles.ADMIN);
	if (!is_allowed) throw error(422, { message: 'Insuficient permission' });

	const current_user_uid = (await getUser())?.id;

	try {
		const { error } = await supabase
			.from('listings')
			.upsert({
				uid: listing_uid,
				is_validated: 1,
				validated_at: new Date(),
				validated_by: current_user_uid
			})
			.match({ uid: listing_uid });
		if (error) console.error('Error while validating "', listing_uid, '": ', error);
		else return json(true);
	} catch (e) {
		console.warn(e);
	}

	return new Response();
};
