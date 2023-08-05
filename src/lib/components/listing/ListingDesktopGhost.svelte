<script>
	import LikeButton from '$comp/listing/LikeListingButton.svelte';
	import UserCardGhost from '$comp/user/UserCardGhost.svelte';
</script>

<div class="card m-2 hidden flex-col gap-2 md:flex lg:mx-auto lg:w-[80%] xl:w-[70%]">
	<header class="flex w-full overflow-hidden">
		<div class="h-full w-2/3 animate-pulse bg-surface-600">
			<div class="aspect-[3/2] object-cover" />
		</div>
		<div class="m-4 flex h-full w-1/3 flex-col gap-3">
			<div class="flex w-full flex-col justify-between gap-2">
				<UserCardGhost />
				<button class="btn variant-ghost-success h-12 w-full self-center"
					><div class="placeholder variant-glass w-24 animate-pulse" /></button
				>
			</div>
			<hr />
			<div class="flex w-full gap-3">
				<button class="btn variant-ghost-tertiary w-full text-lg" aria-label="buy"
					><div class="placeholder variant-glass h-7 w-16 animate-pulse" /></button
				>
				<LikeButton listing_uid="none" />
			</div>
		</div>
	</header>

	<div class="card-header flex animate-pulse flex-col gap-3">
		<div class="flex gap-4">
			<div class="placeholder h-6 w-32" />
			<div class="badge placeholder variant-ghost h-6 w-16 text-lg" />
		</div>
		<div class="placeholder w-28" />
		<hr />
		<h4 class="h4">Description</h4>
		<div class="placeholder w-80" />
		<div class="placeholder w-36" />
		<hr />
		<div class="badge-glass placeholder variant-glass-secondary h-6 w-28" />
		<br />
	</div>
</div>
