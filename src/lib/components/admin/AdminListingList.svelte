<script lang="ts">
	import ListingRow from '$comp/listing/ListingRow.svelte';
	import { profileStore } from '$lib/store';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';
	import ValidateListingButton from '../listing/ValidateListingButton.svelte';

	export let listings: SupaListing[] | null;

	$: filtered_listings = listings;

	type Search = {
		search: string;
		toggleValids: boolean;
		author: string;
	};

	let search: Writable<Search> = writable({
		search: '',
		toggleValids: false,
		author: ''
	});

	search.subscribe(({ search, toggleValids, author }: Search) => {
		const search_regex = new RegExp(`${search || ''}`, 'i');
		const author_regex = new RegExp(`${author || ''}`, 'i');

		if (listings)
			filtered_listings = listings.filter((listing) => {
				return (
					listing.title.match(search_regex) &&
					listing.author_username?.match(author_regex) &&
					toggleValids == listing.is_validated
				);
			});
	});
</script>

<section class="flex flex-col gap-4">
	<input type="text" class="input" placeholder="Search" bind:value={$search.search} />
	<section class="flex items-center gap-3">
		<SlideToggle bind:checked={$search.toggleValids} name="toggleShowValids"
			>Toggle Show Valids</SlideToggle
		>
		<input
			type="text"
			id="filterAuthorUsername"
			placeholder="Author"
			class="input w-fit"
			bind:value={$search.author}
		/>
	</section>
	<section id="listings" class="flex flex-col gap-2">
		{#if filtered_listings}
			{#each filtered_listings as listing}
				<div class="flex w-full gap-2 transition-all duration-200 ease-in-out">
					<ListingRow {listing} />
					{#if !listing.is_validated && $profileStore && $profileStore?.role >= 8}
						<ValidateListingButton
							listing_uid={listing.uid}
							on:success={() => (listing.is_validated = true)}
						/>
					{/if}
				</div>
			{/each}
		{/if}
	</section>
</section>
