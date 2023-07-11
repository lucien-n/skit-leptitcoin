import { writable, type Writable } from 'svelte/store';
import type { SupaListing } from '$lib/types/supa_listing';
import type { User } from '@supabase/supabase-js';
import type { SupaUser } from '$lib/types/supa_user';
import type { Settings } from './types/settings';

export const searchStore: Writable<SearchParams> = writable({});
export const listingsStore: Writable<SupaListing[]> = writable([]);
export const userStore: Writable<User | null> = writable();
export const supaUserStore: Writable<SupaUser | undefined | null> = writable();
export const settingsStore: Writable<Settings> = writable({ high_contrast: false });
