import type { SearchParams, Settings } from '$lib/types';
import { getProfile } from '$supa/profiles';
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Session } from '@supabase/supabase-js';
import { writable, type Subscriber, type Writable, type Invalidator } from 'svelte/store';

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

type ProfileStore = {
	subscribe: (this: void, run: Subscriber<SupaProfile | null>, invalidate?: Invalidator<SupaProfile | null>) => () => void;
	set: (value: SupaProfile | null) => void;
	update: (updater: (value: SupaProfile | null) => SupaProfile | null) => void;
	refresh: (uid?: string) => void;
};

function createProfileStore(): ProfileStore {
	const { subscribe, set, update } = writable<SupaProfile | null>(null);

	const refresh = async (uid?: string) => {
		update((profile: SupaProfile | null) => {
			if (!profile && !uid) return null;

			const func = async () => {
				try {
					const response = await fetch(`/api/profile/${uid || profile?.uid}`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						},
					});

					if (!response.ok) {
						throw new Error('Failed to fetch profile data.')
					}

					const data = await response.json()
					const profile_data = data as SupaProfile

					authCounterStore.incr();

					if (profile_data) set(profile_data);
				} catch (e) {
					console.warn(e)
				}
			};
			func();

			return profile;
		});
	};

	return {
		subscribe,
		set,
		update,
		refresh,
	};
}

export const profileStore: ProfileStore = createProfileStore();
