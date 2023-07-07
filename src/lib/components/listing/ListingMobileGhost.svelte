<script>
	import LikeButton from '$lib/components/widgets/LikeListingButton.svelte';
	import UserCard from '../user/UserCard.svelte';
	import UserCardGhost from '../user/UserCardGhost.svelte';
</script>

<div class="card flex flex-col gap-2 md:hidden">
	<header class="flex w-full overflow-hidden">
		<div class="h-full w-full animate-pulse bg-surface-600">
			<div class="aspect-[3/2] object-cover" />
		</div>
	</header>
	<div class="card-header flex flex-col gap-3">
		<div class="flex animate-pulse gap-4">
			<div class="placeholder h-9 w-48" />
			<div class="badge variant-ghost h-7 w-16 self-center" />
		</div>
		<div class="placeholder h-6 w-32 animate-pulse" />
		<hr />
		<h4 class="h4">Description</h4>
		<div class="placeholder w-full animate-pulse" />
		<div class="placeholder w-1/3 animate-pulse" />
		<hr />
		<div class="badge variant-ghost-secondary h-6 w-20 animate-pulse" />
		<hr />
		<div class="flex w-full flex-col gap-3">
			<div class="flex w-full justify-between">
				<UserCardGhost />
				<button class="btn variant-ghost-success h-9 w-32 self-center">
					<div class="placeholder variant-glass w-4/5 animate-pulse" />
				</button>
			</div>
		</div>
		<hr />
		<div class="flex w-full gap-3">
			<button class="btn variant-ghost-tertiary h-10 w-full">
				<div class="placeholder variant-glass w-4/5 animate-pulse" />
			</button>
			<LikeButton listing_uid="none" />
		</div>
	</div>
	<br />
</div>

<!-- 
<div class="card flex flex-col gap-2 md:hidden">
	<div class="card-header flex flex-col gap-3">
		<div class="flex w-full flex-col gap-3 p-4">
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
</div> -->
