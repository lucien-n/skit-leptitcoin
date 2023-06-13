<script lang="ts">
	import { searchStore } from '$lib/store';
	import Listing from '$lib/components/Listing.svelte';
	import { onMount } from 'svelte';
	import type { SupaListing } from '$lib/types/supa_listing';

	let getListings: any;
	let listings: SupaListing[] = [];

	function filterListings(params: SearchParams) {
		let filteredListings: SupaListing[] = [];

		const searchRegex = new RegExp(`${params.search || ''}`, 'i');

		filteredListings = listings.filter((listing) => {
			return (
				searchRegex.test(listing.title) &&
				(params.price_min ? listing.price > params.price_min : true) &&
				(params.price_max ? listing.price < params.price_max : true)
			);
		});

		return filteredListings;
	}

	const _ = searchStore.subscribe((params: SearchParams) => {
		getListings = filterListings(params);
	});
</script>

<main id="main" class="container h-full mx-auto flex mt-10">
	<section
		id="listings"
		class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-8 h-fit"
	>
		{#await getListings then listings}
			{#each listings as listing, index}
				<Listing {listing} {index} />
			{/each}
		{/await}
	</section>
</main>
