<script lang="ts">
	import { page } from '$app/stores';
	import ValidateListingButton from '$comp/listing/ValidateListingButton.svelte';
	import ListingRow from '$lib/components/listing/ListingRow.svelte';
	import UserCardAdmin from '$lib/components/user/UserCardAdmin.svelte';
	import { TITLE } from '$lib/helper';
	import { profileStore } from '$lib/store';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';

	export let data: { listings: SupaListing[] | null; profiles: SupaProfile[] | null };

	type AdminSearch = { search: string; type: 'profiles' | 'listings' };
	const search: Writable<AdminSearch> = writable({
		search: '',
		type: 'listings'
	});

	$: manageWhat = $page.url.searchParams.get('q') || 'listings';

	let { listings, profiles } = data;
	$: ({ listings, profiles } = data);

	let filtered_listings = listings;
	let filtered_profiles = profiles;

	$: filtered_listings = listings;
	$: filtered_profiles = profiles;

	search.subscribe(({ search, type }: AdminSearch) => {
		const search_regex = new RegExp(`${search || ''}`, 'i');

		if (type === 'listings' && listings) {
			filtered_listings = listings.filter((listing) => listing.title.match(search_regex));
		} else if (type === 'profiles' && profiles) {
			filtered_profiles = profiles.filter((profile) => profile.username.match(search_regex));
		}
	});
</script>

<svelte:head>
	<title>{TITLE} Admin Dashboard</title>
	<meta name="description" content="Monitor and manage profiles and listings." />
</svelte:head>

<section
	id="admin-dashboard"
	class="m-2 mx-auto flex h-full w-full flex-col gap-2 xl:w-[90%] 2xl:w-[70%]"
>
	<h3 class="h3 mx-auto">
		Admin Dashboard - {$profileStore?.username}
	</h3>

	<div class="mx-auto">
		<RadioGroup>
			<RadioItem bind:group={manageWhat} value="listings" name="listings"
				><a href="?q=listings" on:click={() => ($search.type = 'listings')}>Listings</a></RadioItem
			>
			<RadioItem bind:group={manageWhat} value="profiles" name="profiles"
				><a href="?q=profiles" on:click={() => ($search.type = 'profiles')}>Profiles</a></RadioItem
			>
		</RadioGroup>
	</div>

	<div class="flex flex-col gap-2">
		<input type="text" class="input" placeholder="Search" bind:value={$search.search} />
		{#if filtered_listings}
			<section id="listings" class="flex flex-col gap-2">
				{#each filtered_listings as listing}
					<div class="flex w-full gap-2 transition-all duration-200 ease-in-out">
						<ListingRow {listing} />
						{#if !listing.is_validated && $profileStore && $profileStore?.role >= 8}
							<ValidateListingButton
								listing_uid={listing.uid}
								on:validated={(event) => (listing.is_validated = event.detail.success)}
							/>
						{/if}
					</div>
				{/each}
			</section>
		{:else if filtered_profiles}
			<section id="profiles" class="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
				{#each filtered_profiles as profile}
					<UserCardAdmin {profile} />
				{/each}
			</section>
		{/if}
	</div>
</section>
