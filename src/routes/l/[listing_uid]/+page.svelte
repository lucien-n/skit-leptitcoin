<script lang="ts">
	import ListingDesktop from '$lib/components/listing/ListingDesktop.svelte';
	import ListingDesktopGhost from '$lib/components/listing/ListingDesktopGhost.svelte';
	import ListingMobile from '$lib/components/listing/ListingMobile.svelte';
	import { TITLE } from '$lib/helper';
	import { getListing } from '$lib/supabase';
	import type { SupaListing } from '$lib/types/supa_listing';
	import { onMount } from 'svelte';

	export let data: { listing_uid: string };

	let { listing_uid } = data;
	$: ({ listing_uid } = data);

	let get_listing = getListing(listing_uid);
</script>

<svelte:head>
	<title>{TITLE} Listing</title>
</svelte:head>

{#await get_listing}
	<ListingDesktopGhost />
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
