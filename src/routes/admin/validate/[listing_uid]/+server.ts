import { error, fail, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({
	params,
	locals: { supabase, getSession, getRole, roles }
}) => {
	const listing_uid = params.listing_uid;
	if (!listing_uid) throw error(422, { message: 'missing-listing-uuid' });

	const currentUser = (await getSession())?.user;
	if (!currentUser) throw error(401, { message: 'Unauthorized' });

	const currentUserRole = await getRole(currentUser.id);
	if (currentUserRole < roles.ADMIN) throw error(401, { message: 'Unauthorized' });

	try {
		const { error } = await supabase
			.from('listings')
			.update({
				is_validated: true,
				validated_at: new Date(),
				validated_by: currentUser.id
			})
			.match({ uid: listing_uid });
		if (error) console.error('Error while validating "', listing_uid, '": ', error)
	} catch (e) {
		console.log(e);
	}

	return new Response();
};
