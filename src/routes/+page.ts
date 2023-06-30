import { getListings } from "$lib/supabase";

export const load = async () => {
  const listings = await getListings();
  return {
    listings: listings,
  };
};
