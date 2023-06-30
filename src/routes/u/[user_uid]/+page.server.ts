import { getSupaUser, getUserListings } from "$lib/supabase";

export const load = async (event: {
  params: { user_uid: string };
  url: { search: string };
}) => {
  const user = await getSupaUser(event.params.user_uid);

  const user_listings = await getUserListings(user?.uid);

  return {
    user: user,
    anonymous: event.url.search === "?ano",
    listings: user_listings,
  };
};
