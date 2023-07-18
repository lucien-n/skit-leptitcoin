<script lang="ts">
	import ConditionBadge from '$comp/listing/ConditionBadge.svelte';
	import LikeButton from '$comp/listing/LikeListingButton.svelte';
	import UserCard from '$comp/user/UserCard.svelte';
	import { formatDate } from '$lib/helper';
	import { userStore } from '$lib/store';
	import type { SupaListing } from '$lib/types';

	export let listing: SupaListing;

	function buy() {
		console.log('buy ', listing.uid);
	}
</script>

<div class="card m-2 mx-auto hidden w-full flex-col gap-2 md:flex xl:w-[70%]">
	<header class="flex w-full overflow-hidden rounded-tl-[4px]">
		<img
			src={listing.picture
				? listing.picture
				: 'https://placehold.co/600x400/000000/FFFFFF?text=' + listing.title.split(' ')[0]}
			alt="listing"
			class="w-2/3 object-cover"
		/>
		<div class="m-4 flex h-full w-1/3 flex-col gap-3">
			<div class="flex w-full flex-col justify-between gap-2">
				<UserCard user={listing.author} asCard={false} showAnonymous={false} />
				<button
					class="btn variant-ghost-success h-fit w-full self-center"
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
	</header>

	<div class="card-header flex flex-col gap-3">
		<div class="flex gap-4">
			<h2 class="h2">{listing.title}</h2>
			<h3 class="badge variant-ghost text-lg">
				{listing.price}€
			</h3>
		</div>
		<p>{formatDate(listing.createdAt?.getTime() || 0)}</p>
		<hr />
		<h4 class="h4">Description</h4>
		<p class="ts-lg">{listing.description}</p>
		<hr />
		<ConditionBadge condition={listing.condition} />
		<br />
	</div>
</div>
