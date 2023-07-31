<script lang="ts">
	import UserCardAdmin from '$comp/user/UserCardAdmin.svelte';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';

	export let profiles: SupaProfile[] | null;

	type Search = {
		search: string;
		profile: string;
		toggleRestricted: boolean;
	};

	let search: Writable<Search> = writable({ search: '', profile: '', toggleRestricted: false });

	$: filtered_profiles = profiles;

	search.subscribe(({ search, toggleRestricted, profile }: Search) => {
		const search_regex = new RegExp(`${search || ''}`, 'i');
		const profile_regex = new RegExp(`${profile || ''}`, 'i');

		if (profiles)
			filtered_profiles = profiles.filter(
				(profile) => profile.username.match(search_regex) && profile.restricted == toggleRestricted
			);
	});
</script>

<section class="flex flex-col gap-4">
	<input type="text" class="input" placeholder="Search" bind:value={$search.search} />
	<section class="flex items-center gap-3">
		<SlideToggle bind:checked={$search.toggleRestricted} name="toggleShowRestricted"
			>Toggle Show Restricted</SlideToggle
		>
		<input
			type="text"
			id="filterProfile"
			placeholder="Profile"
			class="input w-fit"
			bind:value={$search.profile}
		/>
	</section>
	<section id="profiles" class="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
		{#if filtered_profiles}
			{#each filtered_profiles as profile}
				<UserCardAdmin {profile} />
			{/each}
		{/if}
	</section>
</section>
