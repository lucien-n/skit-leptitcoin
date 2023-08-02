import { isListingValid } from '$lib/server/helper';
import type { Session } from '@supabase/supabase-js';

export const PUT = async ({ request, locals: { getSession, supabase } }) => {
	const listing_data = await request.json();

	const [listing, message] = isListingValid(listing_data);

	if (message) return new Response(null, { status: 422, statusText: message });

	const session: Session | null = await getSession();
	if (!session?.user) return new Response(null, { status: 401, statusText: 'Unauthorized' });

	try {
		const {
			data: [{ uid: listing_uid }],
			error: err
		} = await supabase
			.from('listings')
			.update({ ...listing, is_validated: false, validated_by: null, validated_at: null })
			.eq('uid', listing.uid)
			.select('uid');
		if (err) return new Response(null, { status: 400, statusText: JSON.stringify(err) });
		else
			return new Response(JSON.stringify({ listing_uid }), { status: 200, statusText: 'Success' });
	} catch (e) {
		console.warn(e);
		return new Response(null, { status: 500, statusText: 'Internal Server Error' });
	}
};
