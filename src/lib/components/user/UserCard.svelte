<script lang="ts">
	import Icon from '$comp/widgets/Icon.svelte';
	import { userStore } from '$lib/store';
	import { getProfile } from '$supa/profiles';
	import { Avatar, Ratings } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	export let uid: string;
	export let anonymous = true;
	export let showAnonymous = true;
	export let asCard = true;

	let profile;

	onMount(async () => {
		profile = await getProfile({ uid });
	});

	let rating = { current: profile?.rating, max: 5.0 };

	function iconClick(event: CustomEvent<{ index: number }>): void {
		if (rating.current === event.detail.index) return;
		rating.current = event.detail.index;
		fetch(`/api/user/${uid}/rate/${rating.current}`);
	}
</script>

{#if uid}
	<div
		class="group card flex h-fit w-full flex-row items-center justify-between gap-4 border-0 md:w-fit"
		class:card={asCard}
		class:p-5={asCard}
	>
		<div class="flex flex-row gap-4">
			<Avatar initials={profile.username[0]} />
			<div>
				<a
					href="/u/{profile.username}"
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
		{#if !anonymous && showAnonymous && $userStore?.id === uid}
			<span class="md:mx-8" />
			<a href="?ano" class="btn variant-ghost-primary">See my public profile</a>
		{/if}
	</div>
{:else}
	<p class="text-error-500">Cannot find user</p>
{/if}
