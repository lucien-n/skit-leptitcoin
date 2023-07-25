<script lang="ts">
	import { page } from '$app/stores';
	import ListingRow from '$comp/listing/ListingRow.svelte';
	import UserCard from '$comp/user/UserCard.svelte';
	import { TITLE } from '$lib/helper';

	export let data: {
		user_profile: SupaProfile;
		user_listings: SupaListing[];
		anonymous: boolean;
	};

	let { user_profile, user_listings, anonymous } = data;
	$: ({ user_profile, user_listings, anonymous } = data);

	$: anonymous = $page.url.searchParams.has('ano');
</script>

<svelte:head>
	<title>{TITLE} User - {user_profile.username}</title>
	<meta
		name="description"
		content="{user_profile.username}'s profile, listings, rating, profile picture."
	/>
</svelte:head>

<section
	id="user-profile-{user_profile.uid}"
	class="flex h-full flex-col gap-4 md:m-4 md:mx-auto md:w-[70%]"
>
	<UserCard uid={user_profile.uid} {anonymous} />
	<section id="user-listings">
		{#each user_listings as listing}
			<ListingRow {listing} />
		{/each}
	</section>
</section>
