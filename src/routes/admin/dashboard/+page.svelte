<script lang="ts">
	import ListingRow from '$lib/components/listing/ListingRow.svelte';
	import { supaUserStore, userStore } from '$lib/store';
	import type { SupaListing } from '$lib/types/supa_listing';

	export let data: { listings: SupaListing[] };

	let { listings } = data;
	$: ({ listings } = data);
</script>

<section id="admin-dashboard" class="w-full md:w-[70%] mt-4 h-full flex flex-col mx-auto">
	<h3 class="h3 mx-auto">
		Admin Dashboard - {$supaUserStore?.username}
	</h3>

	<div class="flex flex-col gap-2 mt-5">
		{#if listings}
			{#each listings as listing}
				<ListingRow {listing} />
			{/each}
		{/if}
	</div>
</section>
