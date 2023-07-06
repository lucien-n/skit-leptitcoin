<script lang="ts">
	import EditButton from '$lib/components/widgets/EditButton.svelte';
	import LikeButton from '$lib/components/widgets/LikeButton.svelte';
	import { formatDate } from '$lib/helper';
	import { userStore } from '$lib/store';
	import type { SupaListing } from '$lib/types/supa_listing';
	import { fade } from 'svelte/transition';

	export let listing: SupaListing;
	export let tab_index: number;
	tab_index += 1;
</script>

<div in:fade={{ duration: 100, delay: 100 }} class="card relative flex h-full w-full flex-col">
	<header class="relative z-30 h-2/3">
		<img
			src={listing.picture
				? listing.picture
				: 'https://placehold.co/30x20/000000/FFFFFF?text=' + listing.title.split(' ')[0]}
			alt="listing"
			class="h-full w-full rounded-t-[4px] object-cover"
		/>
		<div class="absolute bottom-3 right-3 z-20 flex items-center gap-3">
			{#if listing.author_uid === $userStore?.id}
				<EditButton listing_uid={listing.uid} index={tab_index + 0.1} />
			{/if}
			{#if $userStore && listing.author_uid !== $userStore.id}
				<LikeButton listing_uid={listing.uid} index={tab_index + 0.2} />
			{/if}
		</div>
	</header>
	<a
		href="/l/{listing.uid}"
		id="listing-{listing.uid}"
		tabindex={tab_index}
		class="group/listing-card flex h-full flex-col justify-between"
		aria-label="title: {listing.title} category: {listing.category} price: {listing.price}€"
	>
		<div class="card-header">
			<div class="flex w-full justify-between">
				<h3 class="h3 group-hover/listing-card:underline">
					{listing.title}
				</h3>
				<p class="badge variant-ghost text-base italic">
					{listing.price} €
				</p>
			</div>
			<p>
				{listing.description}
			</p>
		</div>

		<div class="card-footer">
			<div class="flex flex-row justify-between italic opacity-70">
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
