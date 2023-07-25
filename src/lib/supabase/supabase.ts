import type { Database } from '$supa/database.types';
import { createClient } from '@supabase/supabase-js';

import { dislikeListing, isLikedByUser, likeListing } from '$supa/likes';
import { getListing, getListings } from '$supa/listings';
import { getProfile } from '$supa/profiles';

export const supabase = createClient<Database>(
	'https://zcxdsoyihrxxudqdnvwu.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjeGRzb3lpaHJ4eHVkcWRudnd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY1MDE1MjksImV4cCI6MjAwMjA3NzUyOX0.MkivgwBMLXu1kMDDGTOeDjHPtIFT3J2XyZG89libt8k'
);

export { dislikeListing, getListing, getListings, getProfile, isLikedByUser, likeListing };
