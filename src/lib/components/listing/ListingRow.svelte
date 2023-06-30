<script lang="ts">
	import { formatDate } from '$lib/helper';
	import { supaUserStore, userStore } from '$lib/store';
	import type { SupaListing } from '$lib/types/supa_listing';
	import DeleteButton from '$lib/components/widgets/DeleteButton.svelte';
	import EditButton from '$lib/components/widgets/EditButton.svelte';
	import ConditionBadge from '$lib/components/listing/ConditionBadge.svelte';
	import ValidateButton from '../widgets/ValidateButton.svelte';

	export let listing: SupaListing;

	const maxDescriptionLength: number = 30;
</script>

<div class="card p-2 h-14 flex">
	<a href="/l/{listing.uid}" class="flex items-center w-full justify-between group/listing-row">
		<div class="flex items-end gap-1 group-hover/listing-row:underline">
			<h4 class="h4">
				{listing.title}
			</h4>
			<p class="font-normal">
				{listing.description.length > maxDescriptionLength
					? listing.description.slice(0, maxDescriptionLength) + '...'
					: listing.description}
			</p>
		</div>
		<div class="flex gap-2">
			<ConditionBadge condition={listing.condition} />
		</div>
		<div class="flex items-center gap-2">
			<p class="italic opacity-70">
				{formatDate(listing.createdAt || new Date().getTime())}
			</p>
			<div class="badge italic variant-ghost text-base">
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
		class="flex self-end gap-2"
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
