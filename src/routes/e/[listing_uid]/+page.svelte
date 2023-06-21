<script lang="ts">
	import { TITLE } from '$lib/helper';
	import type { SupaListing } from '$lib/types/supa_listing';

	export let data: { listing: SupaListing; message: string | null };

	const listing = data.listing;
	const message = data.message;

	console.group('+page.svelte');
	console.log(listing);
	console.log(message);
	console.groupEnd();
</script>

<svelte:head>
	<title>{TITLE} Edit - {listing.title}</title>
</svelte:head>

<div class="w-full h-full flex items-center justify-center">
	<h1>
		{listing ? listing.title : data.message}
	</h1>
</div>
