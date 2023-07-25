<script lang="ts">
	import { page } from '$app/stores';
	import ListingRow from '$comp/listing/ListingRow.svelte';
	import UserCard from '$comp/user/UserCard.svelte';
	import { TITLE } from '$lib/helper';

	export let data: {
		profile: SupaProfile;
		anonymous: boolean;
		listings: SupaListing[];
	};

	let { profile, anonymous, listings } = data;
	$: ({ profile, anonymous, listings } = data);

	$: anonymous = $page.url.searchParams.has('ano');
</script>

<svelte:head>
	<title>{TITLE} User - {profile.username}</title>
	<meta
		name="description"
		content="{profile.username}'s profile, listings, rating, profile picture."
	/>
</svelte:head>

<section
	id="user-profile-{profile.uid}"
	class="flex h-full flex-col gap-4 md:m-4 md:mx-auto md:w-[70%]"
>
	<UserCard uid={profile.uid} {anonymous} />
	<section id="user-listings">
		{#each listings as listing}
			<ListingRow {listing} />
		{/each}
	</section>
</section>
