<script lang="ts">
	import ConditionBadge from '$comp/listing/ConditionBadge.svelte';
	import DeleteListingButton from '$comp/listing/DeleteListingButton.svelte';
	import EditListingButton from '$comp/listing/EditListingButton.svelte';
	import { formatDate } from '$lib/helper';
	import { profileStore } from '$lib/store';

	export let listing: SupaListing;

	const MAX_DESCRIPTION_LENGTH = 30;
</script>

<div class="card flex h-fit w-full p-1 md:p-2">
	<a
		href="/listing/{listing.uid}"
		class="group/listing-row flex w-full items-center justify-between"
	>
		<div class="flex items-end gap-1 group-hover/listing-row:underline">
			<h4 class="h4">
				{listing.title}
			</h4>
			<p class="hidden font-normal md:visible">
				{listing.description.length > MAX_DESCRIPTION_LENGTH
					? listing.description.slice(0, MAX_DESCRIPTION_LENGTH) + '...'
					: listing.description}
			</p>
		</div>
		<div class="hidden gap-2 md:flex">
			<ConditionBadge condition={listing.condition} />
		</div>
		<div class="flex items-center gap-2">
			<p class="italic opacity-70">
				{listing.author_username}
				-
				{formatDate(new Date(listing.created_at ?? 0).getTime() || 0)}
			</p>
			<div class="badge variant-ghost text-base italic">
				{listing.price} €
			</div>
		</div>
	</a>
	<div
		class="flex gap-2 self-end"
		class:hidden={$profileStore &&
			$profileStore.uid !== listing.author_uid &&
			$profileStore.role < 8}
	>
		<EditListingButton listing_uid={listing.uid} />
		<DeleteListingButton listing_uid={listing.uid} />
	</div>
</div>
