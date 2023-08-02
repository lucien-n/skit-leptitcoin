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
export const acknowledgedInDevStore = localStorageStore('acknowledgeInDev', false);

function createCounterStore(name: string, log_on_update: boolean) {
	const { subscribe, set, update }: Writable<{ name: string; value: number }> = writable({
		name,
		value: 0
	});

	return {
		subscribe,
		incr: (value?: number) =>
			update((curr) => {
				curr.value += value ?? 1;
				log_on_update && console.log(`${curr.name}-Counter:`, curr.value);
				return curr;
			}),
		decr: (value?: number) =>
			update((curr) => {
				curr.value -= value ?? 1;
				log_on_update && console.log(`${curr.name}-Counter:`, curr.value);
				return curr;
			}),
		clear: () =>
			update((curr) => {
				log_on_update && console.log(`${curr.name}-Counter: reset`);
				return { name: curr.name, value: 0 };
			})
	};
}

const authCounterStore = createCounterStore('Auth', true);

function createProfileStore() {
	const { subscribe, set, update }: Writable<SupaProfile> = writable();

	return {
		subscribe,
		refresh: (uid?: string) =>
			update((profile: SupaProfile) => {
				const func = async () => {
					const new_profile = await getProfile({ uid: uid ?? profile.uid });
					authCounterStore.incr();
					if (new_profile) set(new_profile);
				};
				func();
				return profile;
			})
	};
}
export const profileStore = createProfileStore();
