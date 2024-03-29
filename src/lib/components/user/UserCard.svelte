<script lang="ts">
	import Icon from '$comp/widgets/Icon.svelte';
	import { profileStore } from '$lib/store';
	import { getProfile } from '$supa/profiles';
	import { Avatar, Ratings } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import UserCardGhost from './UserCardGhost.svelte';

	export let uid: string;
	export let anonymous = true;
	export let showAnonymous = true;
	export let asCard = true;

	let profile: SupaProfile;
	$: profile;
	let rating;

	onMount(async () => {
		if (profile) return;
		const fetched_profile = await getProfile({ uid });
		if (!fetched_profile) return;
		profile = fetched_profile;
		rating = { current: profile?.rating, max: 5.0 };
	});

	function iconClick(event: CustomEvent<{ index: number }>): void {
		if (rating.current === event.detail.index) return;
		rating.current = event.detail.index;
		fetch(`/api/profile/rate/${uid}/${rating.current}`);
	}
</script>

{#if profile}
	<div
		class="group card flex h-fit w-full flex-row items-center justify-between gap-4 border-0 md:w-fit"
		class:card={asCard}
		class:p-5={asCard}
	>
		<div class="flex flex-row gap-4">
			<Avatar initials={profile.username[0]} />
			<div>
				<a
					href="/profile/{profile.username}"
					class="flex gap-3"
					aria-label="{profile.username}'s profile - rated {profile.rating} out of 5"
				>
					<h3 class="h3 hover:underline">{profile.username}</h3>
				</a>
				<div class="flex gap-2">
					<Ratings bind:value={rating.current} max={rating.max} interactive on:icon={iconClick}>
						<svelte:fragment slot="empty"><Icon name="star" /></svelte:fragment>
						<svelte:fragment slot="half"><Icon name="star_half" /></svelte:fragment>
						<svelte:fragment slot="full"><Icon name="star_filled" /></svelte:fragment>
					</Ratings>
				</div>
			</div>
		</div>
		{#if $profileStore}
			{#if !anonymous && showAnonymous && $profileStore.uid === uid}
				<span class="md:mx-8" />
				<a href="?ano" class="btn variant-ghost-primary">See my public profile</a>
			{/if}
		{/if}
	</div>
{:else}
	<UserCardGhost />
{/if}
