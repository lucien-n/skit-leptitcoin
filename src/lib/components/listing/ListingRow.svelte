<script lang="ts">
	import { formatDate } from '$lib/helper';
	import { supaUserStore, userStore } from '$lib/store';
	import type { SupaListing } from '$lib/types/supa_listing';
	import DeleteButton from '$lib/components/widgets/DeleteButton.svelte';
	import EditButton from '$lib/components/widgets/EditButton.svelte';
	import ConditionBadge from '$lib/components/listing/ConditionBadge.svelte';
	import ValidateButton from '../widgets/ValidateButton.svelte';

	export let listing: SupaListing;

	const MAX_DESCRIPTION_LENGTH: number = 30;
</script>

<div class="card flex h-fit break-words p-1 md:p-2">
	<a href="/l/{listing.uid}" class="group/listing-row flex w-full items-center justify-between">
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
				{formatDate(listing.createdAt || new Date().getTime())}
			</p>
			<div class="badge variant-ghost text-base italic">
				{listing.price} €
			</div>
			<!-- edit & delete - only visible to author & admins -->
			<div
				class:hidden={listing.author_uid !== $userStore?.id &&
					$supaUserStore &&
					$supaUserStore.role % 8 !== 0}
			/>
		</div>
	</a>
	<div
		class="flex gap-2 self-end"
		class:hidden={$supaUserStore &&
			$supaUserStore.uid !== listing.author_uid &&
			$supaUserStore?.role < 8}
	>
		<EditButton listing_uid={listing.uid} />
		<DeleteButton
			listing_uid={listing.uid}
			on:click={() => {
				// window.location.href = window.location.href;
			}}
		/>
		{#if !listing.isValidated && $supaUserStore && $supaUserStore?.role >= 8}
			<ValidateButton listing_uid={listing.uid} />
		{/if}
	</div>
</div>
