<script lang="ts">
	import ListingDesktop from '$lib/components/listing/ListingDesktop.svelte';
	import ListingDesktopGhost from '$lib/components/listing/ListingDesktopGhost.svelte';
	import ListingMobile from '$lib/components/listing/ListingMobile.svelte';
	import { TITLE } from '$lib/helper';
	import type { SupaListing } from '$lib/types/supa_listing';

	export let data: { listing: Promise<SupaListing> };

	let { listing } = data;
	$: ({ listing } = data);

	const testPromise: Promise<SupaListing> = new Promise((resolve) => {
		setTimeout(() => {
			resolve({} as SupaListing);
		}, 2_000_000);
	});
</script>

<svelte:head>
	<title>{TITLE} Listing</title>
</svelte:head>

{#await listing}
	<ListingDesktopGhost />
{:then listing}
	<section id="listing-{listing.uid}" class="h-full w-full">
		<ListingMobile {listing} />
		<ListingDesktop {listing} />
	</section>
{/await}
