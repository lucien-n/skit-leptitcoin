<script lang="ts">
	import { formatDate } from '$lib/helper';
	import type { SupaListing } from '$lib/types/supa_listing';
	import { Avatar } from '@skeletonlabs/skeleton';
	import LikeButton from './LikeButton.svelte';

	export let listing: SupaListing;

	function buy() {
		console.log('buy ', listing.uid);
	}
</script>

<div
	class="card flex-col gap-2 m-2 lg:w-[80%] xl:w-[70%] lg:mx-auto hidden md:flex"
>
	<header class="w-full flex overflow-hidden">
		<img
			src={listing.picture
				? listing.picture
				: 'https://placehold.co/600x400/000000/FFFFFF?text=' +
				  listing.title.split(' ')[0]}
			alt="listing"
			class="w-2/3 object-cover"
		/>
		<div class="flex flex-col w-1/3 h-full m-4 gap-3">
			<div class="flex justify-between w-full">
				<a
					href="/u/{listing.author_uid}"
					class="flex gap-3 hover:underline"
					aria-label="{listing.author
						?.username}'s profile - rated {listing.author
						?.rating} out of 5"
				>
					<Avatar
						initials={listing.author
							? listing.author.username[0]
							: 'UN'}
					/>
					<div class="flex flex-col">
						<p class="h3 self-center">
							{listing.author?.username}
						</p>
						<p>{listing.author?.rating}/5</p>
					</div>
				</a>
				<button
					class="btn h-fit self-center variant-ghost-success"
					aria-label="contact {listing.author?.username}"
				>
					Contact
				</button>
			</div>
			<hr />
			<div class="flex w-full gap-3">
				<button
					on:click={buy}
					class="variant-ghost-tertiary btn w-full text-lg"
					aria-label="buy">Buy</button
				>
				<LikeButton listing_uid={listing.uid} />
			</div>
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
		<h4 class="h4">Description</h4>
		<p class="ts-lg">{listing.description}</p>
		<br />
	</div>
</div>
