<script lang="ts">
	import { formatDate } from '$lib/helper';
	import { userStore } from '$lib/store';
	import type { SupaListing } from '$lib/types/supa_listing';
	import LikeButton from '$lib/components/LikeButton.svelte';
	import EditSvg from '$lib/assets/edit.svg?raw';

	export let listing: SupaListing;
	export let index: number;
	index += 1;

	let hovered: boolean = false;
</script>

<div
	class="card relative w-full h-full flex flex-col"
	on:mouseenter={() => (hovered = true)}
	on:mouseleave={() => (hovered = false)}
>
	<header class="relative z-30">
		<img
			src={listing.picture
				? listing.picture[0]
				: 'https://placehold.co/600x400/000000/FFFFFF?text=' +
				  listing.title.split(' ')[0]}
			alt="listing"
			class="w-full h-full object-cover"
		/>
		<div class="absolute right-3 bottom-3 flex items-center gap-3 z-20">
			{#if listing.author_uid === $userStore?.id}
				<a
					href="/e/{listing.uid}"
					class="btn btn-sm variant-glass-tertiary aspect-square p-2"
					aria-label="edit"
					tabindex={index + 0.1}
				>
					{@html EditSvg}
				</a>
			{/if}
			{#if $userStore}
				<LikeButton listing_uid={listing.uid} />
			{/if}
		</div>
	</header>
	<a
		href="/l/{listing.uid}"
		id="listing-{listing.uid}"
		tabindex={index}
		class="h-full flex flex-col justify-between"
		aria-label="title: {listing.title} category: {listing.category} price: {listing.price}€"
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
