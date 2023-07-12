<script lang="ts">
	import ListingCard from '$lib/components/listing/ListingCard.svelte';
	import ListingCardGhost from '$lib/components/listing/ListingCardGhost.svelte';
	import { TITLE } from '$lib/helper.js';
	import { searchStore } from '$lib/store';
	import type { SearchParams, SupaListing } from '$lib/types';

	export let data: { listings: Promise<SupaListing[]> };

	let { listings } = data;
	$: ({ listings } = data);

	let getListings: any;

	async function filterListings(params: SearchParams) {
		let filtered_listings: SupaListing[] = [];

		const search_regex = new RegExp(`${params.search || ''}`, 'i');

		filtered_listings = (await listings)
			.filter((listing) => {
				return (
					search_regex.test(listing.title) &&
					(params.price_min ? listing.price > params.price_min : true) &&
					(params.price_max ? listing.price < params.price_max : true) &&
					(params.category ? listing.category === params.category : true)
				);
			})
			.sort((a: SupaListing, b: SupaListing) => {
				if (a.createdAt && b.createdAt) {
					return b.createdAt.getTime() - a.createdAt.getTime();
				}
				return 0;
			});

		return filtered_listings;
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

<svelte:head>
	<title>{TITLE}</title>
	<meta
		name="description"
		content="Find and sell your goods. Vehicles, housing, recreational, multimedia, find anything you need, sell everything you don't."
	/>
</svelte:head>

<main id="main" class="container mx-auto mt-10 flex h-full w-full">
	<section id="listings" class="mx-auto flex h-fit w-full flex-col gap-8 lg:w-[70%]">
		{#await getListings}
			{#each { length: 5 } as _}
				<ListingCardGhost />
			{/each}
		{:then listings}
			{#each listings as listing}
				<ListingCard {listing} />
			{/each}
		{/await}
	</section>
</main>
