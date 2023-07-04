<script lang="ts">
	import { page } from '$app/stores';
	import ListingRow from '$lib/components/listing/ListingRow.svelte';
	import UserCard from '$lib/components/user/UserCard.svelte';
	import { supaUserStore, userStore } from '$lib/store';
	import type { SupaListing } from '$lib/types/supa_listing';
	import type { SupaUser } from '$lib/types/supa_user';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	export let data: { listings: SupaListing[] | null; users: SupaUser[] | null };

	$: manageWhat = $page.url.searchParams.get('q') || 'listings';

	let { listings, users } = data;
	$: ({ listings, users } = data);
</script>

<section
	id="admin-dashboard"
	class="w-full xl:w-[90%] 2xl:w-[70%] h-full flex flex-col mx-auto m-2 gap-2"
>
	<h3 class="h3 mx-auto">
		Admin Dashboard - {$supaUserStore?.username}
	</h3>

	<div class="mx-auto">
		<RadioGroup>
			<RadioItem bind:group={manageWhat} value="listings" name="listings"
				><a href="?q=listings">Listings</a></RadioItem
			>
			<RadioItem bind:group={manageWhat} value="users" name="users"
				><a href="?q=users">Users</a></RadioItem
			>
		</RadioGroup>
	</div>

	<div class="flex flex-col">
		{#if listings}
			<section id="listings" class="flex flex-col gap-2">
				{#each listings as listing}
					<ListingRow {listing} />
				{/each}
			</section>
		{:else if users}
			<section id="users" class="grid md:grid-cols-3 xl:grid-cols-4 gap-4">
				{#each users as user}
					<UserCard {user} />
				{/each}
			</section>
		{/if}
	</div>
</section>
