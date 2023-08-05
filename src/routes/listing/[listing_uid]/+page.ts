import type { PageLoad } from './$types';

export const load = (({ params }) => {
	const listing_uid = params.listing_uid;

	return { listing_uid };
}) satisfies PageLoad;
