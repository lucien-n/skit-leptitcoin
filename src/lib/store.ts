import type { SearchParams, Settings } from '$lib/types';
import { getProfile } from '$supa/profiles';
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Session } from '@supabase/supabase-js';
import { writable, type Writable } from 'svelte/store';

export const searchStore: Writable<SearchParams> = writable({});
export const listingsStore: Writable<SupaListing[]> = writable([]);
export const settingsStore: Writable<Settings> = localStorageStore('settings', {
	high_contrast: false
});
export const sessionStore: Writable<Session> = writable();
export const acknowledgedInDevStore: Writable<boolean> = localStorageStore(
	'acknowledgeInDev',
	false
);

function createCounterStore() {
	const { subscribe, set, update } = writable(0);

	return {
		subscribe,
		incr: (value?: number) =>
			update((current_value: number) => {
				const new_value = (current_value += value ?? 1);
				console.log(new_value);
				return new_value;
			}),
		decr: (value?: number) =>
			update((current_value: number) => {
				const new_value = (current_value -= value ?? 1);
				console.log(new_value);
				return new_value;
			}),
		clear: () =>
			update((_) => {
				return 0;
			})
	};
}
export const counter = createCounterStore();

function createProfileStore() {
	const { subscribe, set, update }: Writable<SupaProfile> = writable({});

	return {
		subscribe,
		refresh: (uid?: string) =>
			update(async (profile: SupaProfile) => {
				const new_profile = await getProfile({ uid: uid ?? profile.id });
				set(new_profile);
				counter.incr();
			})
	};
}
export const profileStore = createProfileStore();
