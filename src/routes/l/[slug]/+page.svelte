<script lang="ts">
	import Listing from '$lib/components/Listing.svelte';
	import type { SupaListing } from '$lib/types/supa_listing';

	export let data: { listing: SupaListing };

	const listing = data.listing;
</script>

<section id="listing-{listing.uid}" class="w-full h-full">
	<Listing {listing} />
</section>
