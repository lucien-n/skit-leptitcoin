import type { Session } from '@supabase/supabase-js';
import { json } from '@sveltejs/kit';

export const PUT = async ({ request, locals: { getSession, supabase } }) => {
	const listing_data = await request.json();

	const [listing, message] = isListingValid(listing_data);

	if (message) return json({ status: 422, statusText: message });

	const session: Session | null = await getSession();
	if (!session?.user) return json({ status: 401, statusText: 'Unauthorized' });

	try {
		const { data, error: err } = await supabase
			.from('listings')
			.update(listing)
			.eq('uid', listing.uid);
		if (err) console.warn(err);
		else json({ status: 200 });
	} catch (e) {
		console.warn(e);
	}

	return json({ status: 500 });
};
