<script lang="ts">
	import type { SupaListing } from '$lib/types/supa_listing';

	export let data: { listing: SupaListing };

	const listing = data.listing;

	console.log(listing);
</script>

<section
	id="listing-{listing.uid}"
	class=" w-full h-full flex items-center justify-center"
>
	<div class="flex-col items-center flex">
		<h1 class="h1">
			{listing.author}
		</h1>
		<h3 class="h3">
			{listing.uid}
		</h3>
	</div>
</section>
