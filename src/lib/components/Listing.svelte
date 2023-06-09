<script lang="ts">
	import { formatDate } from '$lib/helper';
	import { isLoggedIn, userStore } from '$lib/store';
	import type { FireListing } from '$lib/types/fire_listing';

	export let listing: FireListing;
	export let index: number;
	index += 1;
</script>

<a
	href="/l/{listing.id}"
	id="listing-{listing.id}"
	class="card relative w-full h-full flex flex-col"
	tabindex={index}
	aria-label="title: {listing.title} category: {listing.category} price: {listing.price}€"
>
	{#if $isLoggedIn && listing.author.uid == $userStore.uid}
		<div class="absolute -right-2 -top-2 flex flex-col gap-2">
			<a
				href="/e/{listing.id}"
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
		</div>
	{/if}
	<header>
		<img
			src={listing.images
				? listing.images[0]
				: 'https://placehold.co/600x400/000000/FFFFFF?text=' +
				  listing.title.split(' ')[0]}
			alt="listing"
		/>
	</header>
	<div class="card-header">
		<div class="flex gap-2">
			<h1>{listing.title}</h1>
			<p class="opacity-80 italic">
				{listing.price} €
			</p>
		</div>
		<p>
			{listing.description}
		</p>
	</div>

	<div class="card-footer mt-auto">
		<div class="flex flex-row justify-between opacity-70 italic">
			<p>
				{listing.category}
			</p>
			<p>
				{listing.author.username}
				{formatDate(listing.created_at)}
			</p>
		</div>
	</div>
</a>
