<script lang="ts">
	import ListingRow from '$lib/components/listing/ListingRow.svelte';
	import UserCard from '$lib/components/user/UserCard.svelte';
	import { TITLE } from '$lib/helper';
	import { userStore } from '$lib/store';
	import type { SupaListing } from '$lib/types/supa_listing';
	import type { SupaUser } from '$lib/types/supa_user';

	export let data: {
		user: SupaUser;
		anonymous: boolean;
		listings: SupaListing[];
	};

	let { user, anonymous, listings } = data;
	$: ({ user, anonymous, listings } = data);
</script>

<svelte:head>
	<title>{TITLE} User - {user.username}</title>
</svelte:head>

<section
	id="user-profile-{user.uid}"
	class="md:w-[70%] h-full flex flex-col md:m-4 md:mx-auto gap-4"
>
	<UserCard {user} {anonymous} />
	<section id="user-listings">
		{#each listings as listing}
			<ListingRow {listing} />
		{/each}
	</section>
</section>
