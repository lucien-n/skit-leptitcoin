<script lang="ts">
	import Rating from '$lib/components/Rating.svelte';
	import type { SupaUser } from '$lib/types/supa_user';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let user: SupaUser;
	export let anonymous: boolean = true;
	export let showAnonymous: boolean = false;
</script>

<div class="card p-5 gap-4 flex w-fit h-fit items-center">
	<div class="flex flex-row gap-4">
		<Avatar initials={user.username[0]} />
		<div>
			<h3 class="h3">{user.username}</h3>
			<Rating rating={user.rating} ratingCount={user.ratingCount} ratedUserUid={user.uid} />
		</div>
	</div>
	{#if !anonymous && showAnonymous}
		<span class="mx-8" />
		<button
			on:click={() => {
				window.location.href = `/u/${user.uid}?ano`;
			}}
			class="btn variant-ghost-primary">See my public profile</button
		>
	{/if}
</div>
