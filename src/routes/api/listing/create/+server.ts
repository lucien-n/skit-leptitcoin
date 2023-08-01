import { isListingValid } from '$lib/server/helper';
import type { Session } from '@supabase/supabase-js';

export const POST = async ({ request, locals: { getSession, supabase } }) => {
	const listing_data = await request.json();

	const [listing, message] = isListingValid(listing_data);

	if (message) return new Response(null, { status: 422, statusText: message });

	const session: Session | null = await getSession();
	if (!session?.user) return new Response(null, { status: 401, statusText: 'Unauthorized' });

	try {
		const { data, error: err } = await supabase.from('listings').insert(listing);
		if (err) console.warn(err);
		else return new Response(null, { status: 200, statusText: 'Sucess' });
	} catch (e) {
		console.warn(e);
		return new Response(null, { status: 500, statusText: 'Internal Server Error' });
	}

	return new Response();
};
