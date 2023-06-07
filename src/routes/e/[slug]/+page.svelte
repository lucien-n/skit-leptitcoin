<script lang="ts">
	import type { FireListing } from '$lib/types/fire_listing';

	export let data: { listing: FireListing | null; message: string | null };

	const listing = data.listing;
	const message = data.message;

	console.group('+page.svelte');
	console.log(listing);
	console.log(message);
	console.groupEnd();
</script>

<div class="w-full h-full flex items-center justify-center">
	<h1>
		{listing?.id}
	</h1>
</div>
