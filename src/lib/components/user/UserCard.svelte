<script lang="ts">
	import { userStore } from '$lib/store';
	import type { SupaUser } from '$lib/types/supa_user';
	import { Avatar, Ratings } from '@skeletonlabs/skeleton';
	import Icon from '../widgets/Icon.svelte';

	export let user: SupaUser | undefined;
	export let anonymous = true;
	export let showAnonymous = true;
	export let asCard = true;

	let rating = { current: user?.rating, max: 5.0 };

	function iconClick(event: CustomEvent<{ index: number }>): void {
		if (rating.current === event.detail.index) return;
		rating.current = event.detail.index;
		fetch(`/u/${user?.uid}/rate/${rating.current}`);
	}
</script>

{#if user}
	<div
		class="group card flex h-fit w-full flex-row items-center justify-between gap-4 border-0 md:w-fit"
		class:card={asCard}
		class:p-5={asCard}
	>
		<div class="flex flex-row gap-4">
			<Avatar initials={user.username[0]} />
			<div>
				<a
					href="/u/{user.uid}"
					class="flex gap-3"
					aria-label="{user.username}'s profile - rated {user.rating} out of 5"
				>
					<h3 class="h3 hover:underline">{user.username}</h3>
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
		{#if !anonymous && showAnonymous && $userStore?.id === user.uid}
			<span class="md:mx-8" />
			<a href="?ano" class="btn variant-ghost-primary">See my public profile</a>
		{/if}
	</div>
{:else}
	<p class="text-error-500">Cannot find user</p>
{/if}
