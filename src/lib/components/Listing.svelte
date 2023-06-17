<script lang="ts">
	import { formatDate } from '$lib/helper';
	import type { SupaListing } from '$lib/types/supa_listing';

	import { isListingLikedByUser, toggleListingLike } from '$lib/supabase';
	import { userStore } from '$lib/store';
	import { toastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import LikeButton from './LikeButton.svelte';

	export let listing: SupaListing;

	function buy() {
		console.log('buy ', listing.uid);
	}
</script>

<div class="card flex flex-col gap-2 m-2">
	<header class="relative w-full h-2/3 overflow-hidden">
		<img
			src={listing.picture
				? listing.picture
				: 'https://placehold.co/600x400/000000/FFFFFF?text=' +
				  listing.title.split(' ')[0]}
			alt="listing"
			class="h-full w-full object-cover"
		/>
		<div class="absolute right-5 bottom-5 flex items-center gap-3">
			<button on:click={buy} class="variant-ghost-tertiary btn text-lg"
				>Buy</button
			>
			<LikeButton listing_uid={listing.uid} />
		</div>
	</header>
	<div class="card-header flex flex-col gap-3">
		<div class="flex justify-between">
			<h2 class="h2">{listing.title}</h2>
			<h3 class="text-lg badge variant-ghost">
				{listing.price}€
			</h3>
		</div>
		<p>{formatDate(listing.created_at || 0)}</p>
		<hr />
		<h5 class="h5">Description</h5>
		<p>{listing.description}</p>
		<br />
	</div>
</div>
