<script lang="ts">
	import { listingsStore, searchStore } from '$lib/store';
	import type { ListingProp } from '$lib/types/listing';
	import Listing from '$lib/components/Listing.svelte';

	export let data;
	listingsStore.set(data.listings);

	let getListings: Promise<ListingProp[]>;

	async function filterListings(
		params: SearchParams
	): Promise<ListingProp[]> {
		let filteredListings: ListingProp[] = [];
		const regex = new RegExp(`${params.search || ''}`, 'i');

		let _ = listingsStore.subscribe((listings) => {
			filteredListings = listings.filter((listing) => {
				return (
					regex.test(listing.title) &&
					(params.price_min
						? listing.price > params.price_min
						: true) &&
					(params.price_max ? listing.price < params.price_max : true)
				);
			});
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
		{#await getListings}
			<h1>Searching listings</h1>
		{:then listings}
			{#each listings as listing, index}
				<Listing {listing} {index} />
			{/each}
		{/await}
	</section>
</main>
