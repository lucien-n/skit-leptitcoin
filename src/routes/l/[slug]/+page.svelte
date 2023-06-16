<script lang="ts">
	import Listing from '$lib/components/Listing.svelte';
	import type { SupaListing } from '$lib/types/supa_listing';

	export let data: { listing: SupaListing };

	const listing = data.listing;
</script>

<div class="w-3/5 h-full flex items-center justify-center">
	<Listing {listing} />
</div>
