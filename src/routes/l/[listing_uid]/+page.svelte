<script lang="ts">
	import ListingDesktop from '$comp/listing/ListingDesktop.svelte';
	import ListingDesktopGhost from '$comp/listing/ListingDesktopGhost.svelte';
	import ListingMobile from '$comp/listing/ListingMobile.svelte';
	import ListingMobileGhost from '$comp/listing/ListingMobileGhost.svelte';
	import { TITLE } from '$lib/helper';
	import { getListing } from '$lib/supabase';

	export let data: { listing_uid: string };

	let { listing_uid } = data;
	$: ({ listing_uid } = data);
</script>

<svelte:head>
	<title>{TITLE} Listing</title>
	<meta
		name="description"
		content="See a particular listing. More information about it and it's author."
	/>
</svelte:head>

{#await getListing(listing_uid)}
	<ListingDesktopGhost />
	<ListingMobileGhost />
{:then listing}
	{#if listing}
		<section id="listing-{listing.uid}" class="h-full w-full">
			<ListingMobile {listing} />
			<ListingDesktop {listing} />
		</section>
	{:else}
		<h2 class="h2 flex h-full w-full items-center justify-center">Listing not found</h2>
	{/if}
{/await}
