<script lang="ts">
	import EditButton from '$comp/listing/EditListingButton.svelte';
	import LikeButton from '$comp/listing/LikeListingButton.svelte';
	import { formatDate } from '$lib/helper';
	import { profileStore, searchStore } from '$lib/store';
	import { fade } from 'svelte/transition';

	export let listing: SupaListing;
</script>

<div in:fade={{ duration: 100, delay: 100 }} class="relative flex h-64 w-full rounded-md md:hidden">
	<header class="flex w-full">
		<img
			src={listing.picture
				? listing.picture
				: 'https://placehold.co/600x400/000000/FFFFFF?text=' + listing.title.split(' ')[0]}
			alt="listing"
			class="w-full rounded-md object-cover"
		/>
		<div
			class="card-body absolute bottom-0 mb-auto flex h-1/2 w-full flex-col justify-center rounded-b-md bg-gradient-to-t from-surface-900 to-transparent px-5 text-white"
		>
			<h4 class="h4">{listing.title}</h4>
			<p>{listing.description}</p>
		</div>
		<footer class="card-footer absolute -bottom-5 left-2 rounded-md">
			<span class="rounded-md border-4 border-surface-500 bg-secondary-500 px-2 py-1 font-semibold">
				{listing.price} €
			</span>
		</footer>
	</header>
</div>
