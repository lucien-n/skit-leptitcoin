<script lang="ts">
	import Rating from '$lib/components/Rating.svelte';
	import type { SupaUser } from '$lib/types/supa_user';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let data: { user: SupaUser; anonymous: boolean };

	let { user, anonymous } = data;
	$: ({ user, anonymous } = data);

	let userRating = user.rating;
</script>

<section id="user-profile-{user.uid}" class="w-[70%] h-full flex m-4 mx-auto">
	<div class="card p-5 gap-4 flex w-fit h-fit items-center">
		<div class="flex flex-row gap-4">
			<Avatar initials={user.username[0]} />
			<div>
				<h3 class="h3">{user.username}</h3>
				<Rating rating={userRating} ratedUserUid={user.uid} />
			</div>
		</div>
		{#if !anonymous}
			<span class="mx-8" />
			<a
				href="/u/${user.uid}?ano"
				on:click={() => {
					window.location.href = `/u/${user.uid}?ano`;
				}}
				class="btn variant-ghost-primary">See my public profile</a
			>
		{/if}
	</div>
</section>
