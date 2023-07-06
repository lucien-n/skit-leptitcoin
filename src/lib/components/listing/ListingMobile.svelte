<script lang="ts">
	import { formatDate, LISTING_CONDITIONS } from '$lib/helper';
	import type { SupaListing } from '$lib/types/supa_listing';
	import type { SupaUser } from '$lib/types/supa_user';
	import LikeButton from '$lib/components/widgets/LikeButton.svelte';
	import { userStore } from '$lib/store';
	import UserCard from '../user/UserCard.svelte';

	export let listing: SupaListing;

	function buy() {
		console.log('buy ', listing.uid);
	}
</script>

<div class="card flex flex-col gap-2 md:hidden">
	<header class="relative w-full">
		<img
			src={listing.picture
				? listing.picture
				: 'https://placehold.co/600x400/000000/FFFFFF?text=' + listing.title.split(' ')[0]}
			alt="listing"
			class="w-full object-cover"
		/>
		{#if $userStore?.id !== listing.author_uid}
			<div class="absolute bottom-3 right-3">
				<LikeButton listing_uid={listing.uid} />
			</div>
		{/if}
	</header>
	<div class="card-header flex flex-col gap-3">
		<div class="flex gap-4">
			<h2 class="h2">{listing.title}</h2>
			<h3 class="badge variant-ghost text-lg">
				{listing.price}€
			</h3>
		</div>
		<p>{formatDate(listing.createdAt || 0)}</p>
		<hr />
		<h4 class="h4">Description</h4>
		<p class="ts-lg">{listing.description}</p>
		<hr />
		<div class="badge variant-ghost-secondary w-fit text-sm">
			{LISTING_CONDITIONS[listing.condition]}
		</div>
		<hr />
		<div class="flex w-full flex-col gap-3 p-4">
			<div class="flex w-full justify-between">
				<a
					href="/u/{listing.author_uid}"
					class="flex gap-3 hover:underline"
					aria-label="{listing.author?.username}'s profile - rated {listing.author
						?.rating} out of 5"
				>
					<UserCard user={listing.author} showAnonymous={false} />
				</a>
				<button
					class="btn variant-ghost-success h-fit self-center"
					aria-label="contact {listing.author?.username}"
				>
					Contact
				</button>
			</div>
			<hr />
			{#if $userStore?.id === listing.author_uid}
				<h3 class="h3 text-center">You are the author of this listing</h3>
			{:else}
				<div class="flex w-full gap-3">
					<button on:click={buy} class="btn variant-ghost-tertiary w-full text-lg" aria-label="buy"
						>Buy</button
					>
					<LikeButton listing_uid={listing.uid} />
				</div>
			{/if}
		</div>
		<br />
	</div>
</div>
