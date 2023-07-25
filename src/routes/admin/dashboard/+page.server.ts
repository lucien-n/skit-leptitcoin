import { getListings, getProfiles } from '$supa/supabase';

export const load = async ({ url: { searchParams } }) => {
	const manage = searchParams.get('q') || 'listings';

	if (manage === 'profiles') {
		const profiles = await getProfiles({ limit: 20 });
		return { profiles };
	}

	const listings = await getListings({ limit: 15, offset: 0 });
	return { listings };
};
