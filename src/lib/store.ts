import type { SearchParams, Settings, SupaListing, SupaUser } from '$lib/types';
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { User } from '@supabase/supabase-js';
import { writable, type Writable } from 'svelte/store';

export const searchStore: Writable<SearchParams> = writable({});
export const listingsStore: Writable<SupaListing[]> = writable([]);
export const userStore: Writable<User | null> = writable();
export const supaUserStore: Writable<SupaUser | undefined | null> = writable();
export const settingsStore: Writable<Settings> = localStorageStore('settings', {
	high_contrast: false
});
