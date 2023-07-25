import { getProfiles } from '$supa/listings';
import { getProfile } from '$supa/profiles';

export const load = async ({
	params: { username },
	url: { search }
}: {
	params: { username: string };
	url: { search: string };
}) => {
	const user = await getProfile({ match: { username } });

	const user_listings = await getProfiles({ match: { author_uid: user?.uid } });

	return {
		user: user,
		anonymous: search === '?ano',
		listings: user_listings
	};
};
