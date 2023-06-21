<script lang="ts">
	import { formatDate } from '$lib/helper';
	import { userStore } from '$lib/store';
	import type { SupaListing } from '$lib/types/supa_listing';
	import LikeButton from '$lib/components/button/LikeButton.svelte';
	import EditButton from '$lib/components/button/EditButton.svelte';

	export let listing: SupaListing;
	export let index: number;
	index += 1;

	let hovered: boolean = false;
</script>

<div class="card relative w-full h-full flex flex-col">
	<header class="relative z-30">
		<img
			src={listing.picture
				? listing.picture[0]
				: 'https://placehold.co/600x400/000000/FFFFFF?text=' +
				  listing.title.split(' ')[0]}
			alt="listing"
			class="w-full h-full object-cover rounded-t-[4px]"
		/>
		<div class="absolute right-3 bottom-3 flex items-center gap-3 z-20">
			{#if listing.author_uid === $userStore?.id}
				<EditButton listing_uid={listing.uid} index={index + 0.1} />
			{/if}
			{#if $userStore && listing.author_uid !== $userStore.id}
				<LikeButton listing_uid={listing.uid} index={index + 0.2} />
			{/if}
		</div>
	</header>
	<a
		href="/l/{listing.uid}"
		id="listing-{listing.uid}"
		tabindex={index}
		class="h-full flex flex-col justify-between"
		aria-label="title: {listing.title} category: {listing.category} price: {listing.price}€"
		on:mouseenter={() => (hovered = true)}
		on:mouseleave={() => (hovered = false)}
	>
		<div class="card-header">
			<div class="flex justify-between w-full">
				<h3 class="h3" class:underline={hovered}>{listing.title}</h3>
				<p class="text-base italic badge variant-ghost">
					{listing.price} €
				</p>
			</div>
			<p>
				{listing.description}
			</p>
		</div>

		<div class="card-footer">
			<div class="flex flex-row justify-between opacity-70 italic">
				<p class="">
					{listing.category}
				</p>
				<p>
					{listing.author?.username}
					{formatDate(listing.createdAt || new Date().getTime())}
				</p>
			</div>
		</div>
	</a>
</div>
