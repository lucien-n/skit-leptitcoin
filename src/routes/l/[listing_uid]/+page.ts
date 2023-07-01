import { getListing, getListings } from "$lib/supabase.js";

export const load = async (event: { params: { listing_uid: string } }) => {
  const listing_uid = event.params.listing_uid;
  return {
    listing: new Promise((resolve) => setTimeout(() => { resolve(getListing(listing_uid)) }, 2000)),
  };
};
