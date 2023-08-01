import { isListingValid } from '$lib/server/helper';
import type { Session } from '@supabase/supabase-js';
import { json } from '@sveltejs/kit';

export const PUT = async ({ request, locals: { getSession, supabase } }) => {
	const listing_data = await request.json();

	const [listing, message] = isListingValid(listing_data);

	if (message) return json({ status: 422, statusText: message });

	const session: Session | null = await getSession();
	if (!session?.user) return json({ status: 401, statusText: 'Unauthorized' });

	try {
		const {
			data: [{ uid: listing_uid }],
			error: err
		} = await supabase
			.from('listings')
			.update({ ...listing, is_validated: false, validated_by: null, validated_at: null })
			.eq('uid', listing.uid)
			.select('uid');
		if (err) console.warn(err);
		else json({ status: 200, statusText: listing_uid });
	} catch (e) {
		console.warn(e);
	}

	return json({ status: 500 });
};
