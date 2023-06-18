<script lang="ts">
	import ListingDesktop from '$lib/components/ListingDesktop.svelte';
	import ListingMobile from '$lib/components/ListingMobile.svelte';
	import type { SupaListing } from '$lib/types/supa_listing';

	export let data: { listing: SupaListing };

	const listing = data.listing;
</script>

<section id="listing-{listing.uid}" class="w-full h-full">
	<ListingMobile {listing} />
	<ListingDesktop {listing} />
</section>
