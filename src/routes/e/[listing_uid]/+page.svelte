<script lang="ts">
	import { TITLE } from '$lib/helper';
	import type { SupaListing } from '$lib/types';

	export let data: { listing: SupaListing };

	let { listing } = data;
	$: ({ listing } = data);
</script>

<svelte:head>
	<title>{TITLE} Edit "{listing.title}"</title>
	<meta name="description" content="Edit a listing, only for the listing author." />
</svelte:head>

<div class="flex h-full w-full items-center justify-center">
	<h1>
		{listing.title}
	</h1>
</div>
