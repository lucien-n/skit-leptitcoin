<script lang="ts">
	import { page } from '$app/stores';
	import { TITLE } from '$lib/helper';
	import { supaUserStore } from '$lib/store';
	import type { SupaListing, SupaUser } from '$lib/types';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';
	import ListingRow from '$lib/components/listing/ListingRow.svelte';
	import UserCardAdmin from '$lib/components/user/UserCardAdmin.svelte';

	export let data: { listings: SupaListing[] | null; users: SupaUser[] | null };

	type AdminSearch = { search: string; type: 'users' | 'listings' };
	const search: Writable<AdminSearch> = writable({
		search: '',
		type: 'listings'
	});

	$: manageWhat = $page.url.searchParams.get('q') || 'listings';

	let { listings, users } = data;
	$: ({ listings, users } = data);

	let filtered_listings = listings;
	let filtered_users = users;
	$: filtered_listings = listings;
	$: filtered_users = users;

	search.subscribe(({ search, type }: AdminSearch) => {
		const search_regex = new RegExp(`${search || ''}`, 'i');

		if (type === 'listings' && listings) {
			filtered_listings = listings.filter((listing) => listing.title.match(search_regex));
		} else if (type === 'users' && users) {
			filtered_users = users.filter((user) => user.username.match(search_regex));
		}
	});
</script>

<svelte:head>
	<title>{TITLE} Admin Dashboard</title>
	<meta name="description" content="Monitor and manage users and listings." />
</svelte:head>

<section
	id="admin-dashboard"
	class="m-2 mx-auto flex h-full w-full flex-col gap-2 xl:w-[90%] 2xl:w-[70%]"
>
	<h3 class="h3 mx-auto">
		Admin Dashboard - {$supaUserStore?.username}
	</h3>

	<div class="mx-auto">
		<RadioGroup>
			<RadioItem bind:group={manageWhat} value="listings" name="listings"
				><a
					href="?q=listings"
					data-sveltekit-preload-data
					on:click={() => ($search.type = 'listings')}>Listings</a
				></RadioItem
			>
			<RadioItem bind:group={manageWhat} value="users" name="users"
				><a href="?q=users" data-sveltekit-preload-data on:click={() => ($search.type = 'users')}
					>Users</a
				></RadioItem
			>
		</RadioGroup>
	</div>

	<div class="flex flex-col gap-2">
		<input type="text" class="input" placeholder="Search" bind:value={$search.search} />
		{#if filtered_listings}
			<section id="listings" class="flex flex-col gap-2">
				{#each filtered_listings as listing}
					<ListingRow {listing} />
				{/each}
			</section>
		{:else if filtered_users}
			<section id="users" class="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
				{#each filtered_users as user}
					<UserCardAdmin {user} />
				{/each}
			</section>
		{/if}
	</div>
</section>
