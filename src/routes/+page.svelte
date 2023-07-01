<script lang="ts">
	import ListingCard from '$lib/components/listing/ListingCard.svelte';
	import ListingCardGhost from '$lib/components/listing/ListingCardGhost.svelte';
	import { TITLE } from '$lib/helper.js';
	import { searchStore } from '$lib/store';
	import type { SupaListing } from '$lib/types/supa_listing';

	export let data: { listings: Promise<SupaListing[]> };

	let { listings } = data;
	$: ({ listings } = data);

	let getListings: any;

	async function filterListings(params: SearchParams) {
		let filteredListings: SupaListing[] = [];

		const searchRegex = new RegExp(`${params.search || ''}`, 'i');

		filteredListings = (await listings).filter((listing) => {
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

	const testPromise: Promise<SupaListing[]> = new Promise((resolve) => {
		setTimeout(() => {
			resolve([]);
		}, 300000);
	});
</script>

<svelte:head><title>{TITLE}</title></svelte:head>
<main id="main" class="container h-full mx-auto flex mt-10">
	<section id="listings" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-8 h-fit">
		{#await getListings}
			{#each { length: 6 } as _}
				<ListingCardGhost />
			{/each}
		{:then listings}
			{#each listings as listing, index}
				<ListingCard {listing} {index} />
			{/each}
		{/await}
	</section>
</main>
