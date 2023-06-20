<script lang="ts">
	import { formatDate } from '$lib/helper';
	import { userStore } from '$lib/store';
	import type { SupaListing } from '$lib/types/supa_listing';
	import LikeButton from './LikeButton.svelte';

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
					<svg
						class="with-icon_icon__aLCKg"
						data-testid="geist-icon"
						fill="none"
						height="24"
						shape-rendering="geometricPrecision"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						width="24"
						style="color:var(--geist-foreground);width:24px;height:24px"
						><path
							d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
						/><path
							d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
						/></svg
					></a
				>
			{/if}
			<LikeButton listing_uid={listing.uid} />
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
					{formatDate(listing.created_at || new Date().getTime())}
				</p>
			</div>
		</div>
	</a>
</div>
