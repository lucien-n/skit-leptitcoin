<script lang="ts">
	import ListingDesktop from '$lib/components/listing/ListingDesktop.svelte';
	import ListingDesktopGhost from '$lib/components/listing/ListingDesktopGhost.svelte';
	import ListingMobile from '$lib/components/listing/ListingMobile.svelte';
	import { TITLE } from '$lib/helper';
	import { onMount } from 'svelte';

	export let data: { listing };

	let { listing } = data;
	$: ({ listing } = data);

	let loading = true;

	onMount(() => (loading = false));

	console.log(listing);
</script>

<svelte:head>
	<title>{TITLE} Listing</title>
</svelte:head>

{#if !listing}
	<ListingDesktopGhost />
{:else}
	<section id="listing-{listing.uid}" class="h-full w-full">
		<ListingMobile {listing} />
		<ListingDesktop {listing} />
	</section>
{/if}
