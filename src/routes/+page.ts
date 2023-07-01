import { getListings } from "$lib/supabase";

export const load = async () => {
  const listings = getListings();
  return {
    listings: listings,
  };
};
