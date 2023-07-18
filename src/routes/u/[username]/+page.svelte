<script lang="ts">
	import { page } from '$app/stores';
	import ListingRow from '$comp/listing/ListingRow.svelte';
	import UserCard from '$comp/user/UserCard.svelte';
	import { TITLE } from '$lib/helper';
	import type { SupaListing, SupaUser } from '$lib/types';

	export let data: {
		user: SupaUser;
		anonymous: boolean;
		listings: SupaListing[];
	};

	let { user, anonymous, listings } = data;
	$: ({ user, anonymous, listings } = data);

	$: anonymous = $page.url.searchParams.has('ano');
</script>

<svelte:head>
	<title>{TITLE} User - {user.username}</title>
	<meta
		name="description"
		content="{user.username}'s profile, listings, rating, profile picture."
	/>
</svelte:head>

<section
	id="user-profile-{user.uid}"
	class="flex h-full flex-col gap-4 md:m-4 md:mx-auto md:w-[70%]"
>
	<UserCard {user} {anonymous} />
	<section id="user-listings">
		{#each listings as listing}
			<ListingRow {listing} />
		{/each}
	</section>
</section>
