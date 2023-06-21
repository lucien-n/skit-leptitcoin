<script lang="ts">
	import ListingDesktop from '$lib/components/listing/ListingDesktop.svelte';
	import ListingMobile from '$lib/components/listing/ListingMobile.svelte';
	import { TITLE } from '$lib/helper';
	import type { SupaListing } from '$lib/types/supa_listing';

	export let data: { listing: SupaListing };

	const listing = data.listing;
</script>

<svelte:head>
	<title>{TITLE} Listing - {listing.title}</title>
</svelte:head>

<section id="listing-{listing.uid}" class="w-full h-full">
	<ListingMobile {listing} />
	<ListingDesktop {listing} />
</section>
